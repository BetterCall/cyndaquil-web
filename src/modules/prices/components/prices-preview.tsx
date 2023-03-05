import React from "react";
import { useNavigate } from "react-router-dom";

import { PriceRulesFiltersInput } from "../../../__generated__/globalTypes";
import { usePrices } from "../hooks";
import { EmptyList, Loading } from "../../../components";

export const PricesPreview: React.FC<PriceRulesFiltersInput> = (where) => {
  const navigate = useNavigate();
  const { data, loading } = usePrices({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) return <Loading />;

  if (data?.priceRules?.results?.length === 0) {
    return <EmptyList text="Aucun Tarif Spécial" />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left padding-table ">
          <th className=" font-medium padding-table ">Montant</th>
          <th className=" font-medium padding-table text-center">
            Type Client
          </th>
          <th className=" font-medium padding-table text-center">Equipement</th>
          <th className=" font-medium padding-table text-right ">Email</th>
        </tr>
      </thead>
      <tbody>
        {data?.priceRules?.results?.map((rule, index) => (
          <tr
            key={`rule-${rule.id}`}
            className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="flex padding-table ">
              <div>
                <p
                  className="font-medium cursor-pointer"
                  onClick={() => navigate(`/rules/${rule.id}`)}
                >
                  {rule.amount}
                </p>
              </div>
            </td>
            <td className="font-medium padding-table text-center ">
              {rule.customerCategory?.name ?? "-"}
            </td>

            <td className="font-medium padding-table text-center ">
              {rule.equipmentCategory?.name ?? "-"}
            </td>
            <td className="font-medium padding-table text-right ">
              {rule.benefit?.name ?? "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
