import { useQuery } from "@apollo/client";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { cleanObject } from "../../helpers/clean-object";
import { PRICE_RULES } from "../../queries/prices.queries";

import { ContactFiltersInput } from "../../__generated__/globalTypes";
import {
  PriceRulesQuery,
  PriceRulesQueryVariables,
} from "../../__generated__/PriceRulesQuery";
import { Card, CardHeader } from "../cards";
import { SendIcon } from "../icons";

export const PricesList: React.FC<ContactFiltersInput> = (where) => {
  const navigate = useNavigate();
  const { data } = useQuery<PriceRulesQuery, PriceRulesQueryVariables>(
    PRICE_RULES,
    {
      variables: {
        limit: 5,
        offset: 0,
        where,
      },
    }
  );

  return (
    <Card>
      <CardHeader
        title="Contact sur Place"
        button={{
          title: "Nouveau Contact",
          icon: <SendIcon />,
          url:
            Object.keys(where).length > 0
              ? `/prices/create?${createSearchParams(cleanObject(where))}`
              : `/prices/create`,
        }}
      />
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Montant</th>
            <th className=" font-medium padding-table text-center">Category</th>
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
                {rule.category?.name ?? "-"}
              </td>
              <td className="font-medium padding-table text-right ">
                {rule.benefit?.name ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
