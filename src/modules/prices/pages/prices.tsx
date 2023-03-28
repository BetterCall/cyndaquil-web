import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { useLazyPrices } from "../hooks";

export const Prices: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyPrices();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        limit,
        offset: 0,
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  console.log(data, error);
  return (
    <>
      <Header
        title="Règles de Tarifications"
        subtitle="Liste des règles Tarifications"
        buttons={[
          {
            actionText: "Nouveau Tarif",
            bgColor: "indigo",
            textColor: "white",
            link: "/price/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table font-medium">Montant</th>
                <th className="padding-table font-medium text-center">Type</th>
                <th className="padding-table font-medium text-center">
                  Client
                </th>
                <th className="padding-table font-medium text-center">
                  Type Client
                </th>
                <th className="padding-table font-medium text-center">
                  Equipement
                </th>
                <th className="padding-table font-medium text-center">
                  Service
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.priceRules?.results?.map((rule, index) => (
                <tr
                  key={`rule-${rule.id}`}
                  className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="padding-table font-medium ">{rule?.amount}</td>
                  <td className="padding-table font-medium text-center ">
                    {rule?.type ?? "-"}
                  </td>
                  <td className="padding-table font-medium text-center ">
                    {rule?.customer?.name || "-"}
                  </td>

                  <td className="padding-table font-medium text-center ">
                    {rule?.customerCategory?.name ?? "-"}
                  </td>

                  <td className="padding-table font-medium text-center ">
                    {rule?.equipmentCategory?.name ?? "-"}
                  </td>

                  <td className="padding-table font-medium text-center ">
                    {rule?.benefit?.name ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.priceRules?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.priceRules?.results?.length,
                    limit,
                    where: parseSearchParams(searchParams),
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
