import React, { useEffect, useState } from "react";
import { PriceRuleType } from "../../../../__generated__/globalTypes";
import { usePrices } from "../../../prices/hooks";

interface IProps {
  benefitId: number;
  equipmentCategoryId: number;
  customerId: number;
  customerCategoryId: number;

  line: string;
  defaultPrice: number;

  quantity: number;
  unitPrice: number;

  discount: number;

  taxPercentage: number;
  taxAmount: number;
  totalWithoutTax: number;
  totalWithTax: number;

  onChange: any;
}

export const InvoicePreviewRow: React.FC<IProps> = ({
  benefitId,
  equipmentCategoryId,
  customerId,
  customerCategoryId,
  line,

  quantity,
  defaultPrice,
  unitPrice,

  discount,

  taxPercentage = 20,
  taxAmount,
  totalWithoutTax,
  totalWithTax,

  onChange,
}) => {
  const { data, loading, error } = usePrices({
    where: {
      all: true,
      benefitId,
      equipmentCategoryId,
      customerId,
      customerCategoryId,
    },
  });

  console.log(data);

  return (
    <div className="mt-4 px-4 mb-5">
      <div className="mb-2 flex justify-between font-medium ">
        <span>{line} </span>
        <span className="font-medium"> </span>
      </div>

      <div className="mx-2">
        <div
          className={`mb-2 flex justify-between ${
            discount > 0 ? "line-through " : ""
          } `}
        >
          <span>Prix Public</span>
          <span className="font-medium">{defaultPrice} € HT</span>
        </div>

        <div className="mb-2 flex justify-between">
          <span>Prix Unitaire </span>
          <span className="font-medium">{unitPrice} € HT</span>
        </div>

        {discount > 0 ? (
          <div className="mb-2 flex justify-between">
            <span>Remise</span>
            <span className="font-medium">{discount} €</span>
          </div>
        ) : null}

        <div className="mb-2 flex justify-between">
          <span>Quantité </span>
          <span className="font-medium">{quantity}</span>
        </div>
        <div className="mb-2 flex justify-between">
          <span>Appliquer une tarification </span>
          <div className="relative w-1/3 ">
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 6.1133C11.2084 5.98913 11.0395 5.91943 10.8633 5.91943C10.6872 5.91943 10.5182 5.98913 10.3933 6.1133L8.00001 8.47329L5.64001 6.1133C5.5151 5.98913 5.34613 5.91943 5.17001 5.91943C4.99388 5.91943 4.82491 5.98913 4.70001 6.1133C4.63752 6.17527 4.58792 6.249 4.55408 6.33024C4.52023 6.41148 4.50281 6.49862 4.50281 6.58663C4.50281 6.67464 4.52023 6.76177 4.55408 6.84301C4.58792 6.92425 4.63752 6.99799 4.70001 7.05996L7.52667 9.88663C7.58865 9.94911 7.66238 9.99871 7.74362 10.0326C7.82486 10.0664 7.912 10.0838 8.00001 10.0838C8.08801 10.0838 8.17515 10.0664 8.25639 10.0326C8.33763 9.99871 8.41136 9.94911 8.47334 9.88663L11.3333 7.05996C11.3958 6.99799 11.4454 6.92425 11.4793 6.84301C11.5131 6.76177 11.5305 6.67464 11.5305 6.58663C11.5305 6.49862 11.5131 6.41148 11.4793 6.33024C11.4454 6.249 11.3958 6.17527 11.3333 6.1133Z"
                fill="#8896AB"
              ></path>
            </svg>

            <select
              className="input appearance-none w-full"
              onChange={(value) => {
                console.log(value.target.value);
                let unitPrice = defaultPrice;
                let unitDiscount = 0;
                try {
                  const rule = data?.priceRules?.results?.find(
                    (pr) => pr.id === +value.target.value
                  );
                  if (rule?.type === PriceRuleType.Percent) {
                    unitPrice = parseFloat(
                      (defaultPrice * (1 - rule.amount / 100)).toFixed(2) + ""
                    );
                    unitDiscount = parseFloat(
                      (defaultPrice - unitPrice).toFixed(2) + ""
                    );
                  }

                  console.log({
                    unitPrice,
                    quantity,
                    taxPercentage,
                  });

                  let taxAmount = (unitPrice * quantity * taxPercentage) / 100;

                  console.log({ unitPrice, quantity });
                  let totalWithoutTax = unitPrice * quantity;
                  let totalWithTax = totalWithoutTax + taxAmount;
                  console.log({
                    unitPrice,
                    taxAmount,
                    totalWithoutTax,
                    totalWithTax,
                    discount: unitDiscount * quantity,
                  });

                  onChange(benefitId, {
                    unitPrice,
                    taxAmount,
                    totalWithoutTax,
                    totalWithTax,
                    discount: unitDiscount * quantity,
                  });

                  return;
                } catch (error) {
                  console.log("error , errror", error);
                  onChange(benefitId, {
                    unitPrice: defaultPrice,
                    discount: 0,
                    taxAmount: 2,
                    totalWithoutTax: 2,
                    totalWithTax: 2,
                  });
                }
              }}
            >
              <option value={undefined}>-</option>
              {data?.priceRules?.results?.map((price) => {
                return (
                  <option
                    value={price.id}
                    key={`key-${price.id}`}
                    onSelect={() => console.log(price)}
                  >
                    {price.description} - {price.amount}{" "}
                    {price.type === PriceRuleType.Percent ? "%" : "€"}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="mb-2 flex justify-between ">
          <span>Taux TVA </span>
          <span className="font-medium">{taxPercentage} %</span>
        </div>
      </div>
      <div className="w-full px-2 py-1 bg-slate-100 rounded">
        {discount > 0 ? (
          <div
            className={`flex justify-between font-medium mt-2 line-through `}
          >
            <span className="font-medium">Montant avant remise </span>
            <span className="font-medium">{defaultPrice * quantity} € HT</span>
          </div>
        ) : null}
        <div className="flex justify-between font-medium mt-2">
          <span className="font-medium">
            Montant {discount > 0 ? "apres remise" : ""} HT
          </span>
          <span className="font-medium">{totalWithoutTax} € HT</span>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between font-medium mt-2">
            <span className="font-medium">Montant Remise</span>
            <span className="font-medium">{discount} € HT</span>
          </div>
        ) : null}
        <div className="flex justify-between font-medium mt-2">
          <span className="font-medium">Montant TVA</span>
          <span className="font-medium">{taxAmount} €</span>
        </div>

        <div className="flex justify-between font-medium mt-2 pb-2">
          <span className="font-medium">Montant TTC</span>
          <span className="font-medium">{totalWithTax} € TTC</span>
        </div>
      </div>
    </div>
  );
};
