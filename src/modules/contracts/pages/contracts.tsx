import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchContractsInput } from "../components";
import { useLazyContracts } from "../hooks";

export const Contracts: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [search, { data, loading, fetchMore }] = useLazyContracts();

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

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.contracts?.results?.length === 0) {
      return <EmptyList text="Aucun Contrat" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="  padding-table font-medium text-left">Site</th>
            <th className="  padding-table font-medium text-center">Client</th>
            <th className="  padding-table font-medium text-center">
              Commercial
            </th>
            <th className="  padding-table font-medium text-center">Etat</th>
            <th className="  padding-table font-medium text-center">
              Date Signature
            </th>
            <th className="  padding-table font-medium text-center">
              Date Fin
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.contracts?.results?.map((contract, index) => (
            <tr
              onClick={() => navigate(`/contract/${contract.id}`)}
              key={`contract-${contract.id}`}
              className={`text-xs  cursor-pointer ${
                index % 2 ? "" : "bg-gray-50"
              } `}
            >
              <td className="  padding-table  text-left ">
                {contract?.site?.name ?? "-"}
              </td>
              <td className="   padding-table  text-center ">
                {" "}
                {contract.customer.name}{" "}
              </td>
              <td className="  padding-table  text-center ">
                {contract?.madeBy.firstname} {contract?.madeBy.lastname}
              </td>
              <td className="  padding-table  text-center ">
                {contract.status}
              </td>
              <td className="  padding-table  text-center ">01/01/2022</td>
              <td className="  padding-table  text-center">01/01/2022</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
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
        <SearchContractsInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.contracts?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.contracts?.results?.length,
                  limit,
                  where: parseSearchParams(searchParams),
                },
              });
            }}
          />
        )}
      </div>
    </>
  );
};
