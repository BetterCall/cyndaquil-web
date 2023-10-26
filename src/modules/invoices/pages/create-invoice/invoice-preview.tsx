import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../../../../components";
import {
  InvoiceRowInput,
  InvoiceRowType,
} from "../../../../__generated__/globalTypes";
import { useLazyWorkOrdersByIds } from "../../../work-orders/hooks";
import { useCreateInvoice } from "../../hooks";
import { InvoicePreviewRow } from "./invoice-preview-row";

interface IProps {
  ids: number[];
}

export const InvoicePreview: React.FC<IProps> = ({ ids }) => {
  const [, updateState] = React.useState();
  // @ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const [fetchWorkOrders, { loading, data, error }] = useLazyWorkOrdersByIds();
  const [rows, setRows] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    quantity: 0,
    taxAmount: 0,
    totalWithoutTax: 0,
    totalWithTax: 0,
    discount: 0,
  });

  useEffect(() => {
    fetchWorkOrders({ variables: { ids } });
    console.log("elle");
  }, [ids]);

  useEffect(() => {
    console.log(data);
    if (data?.workOrdersByIds?.results) {
      let r = {};

      data?.workOrdersByIds?.results?.map((workOrder) => {
        workOrder.rows?.map((row) => {
          let line = r[row.benefit.id] || null;
          let unitPrice = line?.unitPrice || row.benefit?.price;
          let quantity = line?.quantity + 1 || 1;
          let taxPercentage = line?.taxPercentage || 20;
          let taxAmount = (unitPrice * quantity * taxPercentage) / 100;
          let totalWithoutTax = unitPrice * quantity;
          let totalWithTax = totalWithoutTax + taxAmount;
          let discount = line?.discount || 0;

          r[row.benefit.id] = {
            benefitId: row.benefit.id,
            equipmentCategoryId: row.benefit.categoryId,
            customerId: workOrder.customerId,
            type: InvoiceRowType.Due,
            // customerCategoryId: workOrder.customer?.categoryId,

            line: `${row.benefit?.category?.name} : ${row.benefit.name}`,

            taxPercentage,
            defaultPrice: row.benefit?.price || 0,
            unitPrice,
            quantity,
            taxAmount,
            totalWithoutTax,
            totalWithTax,
            discount,
          };
        });
      });

      setRows(Object.values(r));
    }
  }, [data]);

  const onChange = (benefitId, changes) => {
    console.log(benefitId, changes);
    let r = rows;
    let objIndex = r.findIndex((obj) => obj.benefitId == benefitId);
    r[objIndex] = { ...r[objIndex], ...changes };
    setRows([...r]);
    console.log(rows);
  };

  useEffect(() => {
    try {
      // @ts-ignore
      var val = rows.reduce((previousValue, currentValue) => {
        return {
          quantity: previousValue.quantity + currentValue.quantity,
          taxAmount: previousValue.taxAmount + currentValue.taxAmount,
          totalWithoutTax:
            previousValue.totalWithoutTax + currentValue.totalWithoutTax,
          totalWithTax: previousValue.totalWithTax + currentValue.totalWithTax,
          discount: previousValue.discount + currentValue.discount,
        };
      });
      setTotals(val);
    } catch (error) {
      setTotals({
        quantity: 0,
        taxAmount: 0,
        totalWithoutTax: 0,
        totalWithTax: 0,
        discount: 0,
      });
    } finally {
      forceUpdate();
    }
  }, [rows]);

  const { submit } = useCreateInvoice({
    defaultValues: {},
    onCompleted: () => toast.success("La Facture a bien été créée"),
    onError: () => alert("error"),
  });
  const handleSubmit = async () => {
    try {
      await submit({
        input: {
          workOrderIds: ids,
          // @ts-ignore
          rows: rows.map(({ customerId, customerCategoryId, ...row }) => ({
            ...row,
          })),

          quantity: totals.quantity,
          taxAmount: totals.taxAmount,
          totalWithoutTax: totals.totalWithoutTax,
          totalWithTax: totals.totalWithTax,
          discount: totals.discount,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <>
        <h1>Invoice Preview</h1>
        {data?.workOrdersByIds?.results?.map((workOrder) => {
          return (
            <h1 key={workOrder.id}>
              {workOrder.id} - {workOrder.object}
            </h1>
          );
        })}
      </>

      {rows?.map((row) => (
        <InvoicePreviewRow key={row.benefitId} onChange={onChange} {...row} />
      ))}

      {/* <div className="mb-2 flex justify-between font-medium  text-lg ">
        <span>AJouter une remise Exceptionnelle</span>
        <span className=" font-medium">{totals.quantity}</span>
      </div> */}

      <div className="mt-4 px-5 mb-5 bg-slate-100  py-6 rounded">
        <div className="mb-2 flex justify-between font-medium  text-lg ">
          <span>Nombre d'articles</span>
          <span className=" font-medium">{totals.quantity}</span>
        </div>

        <div className=" flex justify-between font-medium text-lg  mt-2">
          <span className=" font-medium">Total Remise</span>
          <span className=" font-medium">{totals.discount} €</span>
        </div>

        <div className="mb-2 flex justify-between font-medium  text-lg mt-2 ">
          <span>Total HT</span>
          <span className=" font-medium">{totals.totalWithoutTax} €</span>
        </div>

        <div className=" flex justify-between font-medium text-lg  mt-2">
          <span className=" font-medium">Montant de la TVA</span>
          <span className=" font-medium">{totals.taxAmount} €</span>
        </div>

        <div className=" flex justify-between font-medium text-lg mt-2">
          <span className=" font-medium">Montant TTC</span>
          <span className=" font-medium">{totals.totalWithTax} €</span>
        </div>

        <div className=" flex justify-between font-medium text-lg mt-2">
          <span className=" font-medium">Montant TTC</span>
          <span className=" font-medium">{totals.totalWithTax} €</span>
        </div>
      </div>

      <div className="w-full p-3">
        <Button
          canClick={true}
          loading={loading}
          actionText="Valider"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};
