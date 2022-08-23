import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { ContractStatusBadge } from "../../components/contracts";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { useMe } from "../../hooks/useMe";
import { DashboardLayout } from "../../layouts/dashboard.layout";
import { CONTRACTS } from "../../queries/contracts.queries";
import {
  ContractsQuery,
  ContractsQueryVariables,
} from "../../__generated__/ContractsQuery";
import { SiteFiltersInput, UserRole } from "../../__generated__/globalTypes";

export const Contracts = () => {
  const { data: meData } = useMe();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyQuery<
    ContractsQuery,
    ContractsQueryVariables
  >(CONTRACTS);

  const [searchParams] = useSearchParams();
  const [where, setParams] = useState<SiteFiltersInput>({});
  useEffect(() => {
    let temp: any = {};
    searchParams.forEach((value: string, key: string) => {
      if (key === "customerId") {
        temp[key] = parseInt(value);
      } else {
        temp[key] = value;
      }
    });
    setParams(temp);
    console.log("temps  ", temp);
    search({
      fetchPolicy: "network-only",
      variables: {
        limit,
        offset: 0,
        where: temp,
      },
    });
  }, [searchParams]);
  return (
    <DashboardLayout>
      <Header
        title="Liste des Contrats"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/contract/create",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="max-w-screen-2xl mx-auto mt-8 px-6">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Client
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Immeuble
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Fait par
                    </th>

                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.contracts?.results?.map((contract) => (
                    <tr
                      className="bg-white border-b"
                      key={`contract-${contract.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contract.customer.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contract.site.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <ContractStatusBadge status={contract?.status} />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {contract.madeBy.firstname} {contract.madeBy.lastname}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span
                          onClick={() => navigate(`/contracts/${contract.id}`)}
                        >
                          voir
                        </span>{" "}
                        {meData?.me?.role === UserRole.Admin && (
                          <>
                            |{" "}
                            <span
                              onClick={() =>
                                navigate(`/contracts/${contract.id}/edit`)
                              }
                            >
                              editer
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {data?.contracts?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.contracts?.results?.length,
                    limit,
                    where: {},
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
