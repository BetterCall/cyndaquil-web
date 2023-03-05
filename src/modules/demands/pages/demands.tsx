import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { DemandSearchInput } from "../components";
import { parseSearchParams } from "../../../helpers/clean-object";
import { useLazyDemands } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";

export const Demands = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [limit, setLimit] = useState(10);
  const [search, { loading, data, fetchMore, error }] = useLazyDemands();

  console.log("data", data);
  console.log("error", error);
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
    if (data?.demands?.results?.length === 0) {
      return <EmptyList text="Aucune Demande" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className=" padding-table font-medium">Utilisateur</th>
            <th className=" padding-table text-center font-medium">Type</th>
            <th className=" padding-table text-center font-medium">
              Utilisateur
            </th>
            <th className=" padding-table font-medium text-center">Client</th>
            <th className=" padding-table font-medium text-center">Site</th>
          </tr>
        </thead>
        <tbody>
          {data?.demands?.results?.map((demand, index) => (
            <tr
              key={`demand-${demand.id}`}
              className={`text-xs  ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex  padding-table ">
                <div>
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => navigate(`/demand/${demand.id}`)}
                  >
                    {demand?.openedBy?.firstname} {demand?.openedBy?.lastname}
                  </p>
                </div>
              </td>
              <td className=" padding-table text-center ">{demand?.type}</td>
              <td className=" padding-table text-center ">
                {demand?.customer?.name}
              </td>
              <td className=" padding-table text-center ">
                {demand?.targetUser?.firstname}
                {demand?.targetUser?.lastname}
              </td>
              <td className=" padding-table text-center ">
                {demand?.site?.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Header
        title="Liste des Demandes"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouvelle Demande",
            bgColor: "indigo",
            textColor: "white",
            link: "/demand/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <DemandSearchInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.demands?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.demands?.results?.length,
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
