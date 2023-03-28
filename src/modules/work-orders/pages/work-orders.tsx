import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";

import { useLazyWorkOrders } from "../hooks";

import { SearchWorkOrdersInput } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Row } from "../../../components/tables";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";

export const WorkOrders: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, error, loading, fetchMore }] = useLazyWorkOrders();

  console.log(data);
  console.log(error);

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

    if (data?.workOrders?.results?.length === 0) {
      return <EmptyList text="Aucun Bon" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Utilisateur</th>
              <th className="padding-table font-medium text-center">Etat</th>
              <th className="padding-table font-medium text-center">
                Code Postal
              </th>
              <th className="padding-table font-medium text-center">Client</th>
              <th className="padding-table font-medium text-center">Site</th>
            </tr>
          </thead>
          <tbody>
            {data?.workOrders?.results?.length === 0 && (
              <EmptyList text="Aucun Bon" />
            )}
            {data?.workOrders?.results?.map((workOrder, index) => (
              <Row index={index} key={`workOrder-${workOrder.id}`}>
                <td className="padding-table flex">
                  <div>
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/work-order/${workOrder.id}`)}
                    >
                      {workOrder.object}
                    </p>
                    <p className="text-gray-500">
                      {workOrder.streetNumber} {workOrder.street}
                    </p>
                  </div>
                </td>
                <td className="padding-table text-center ">
                  {" "}
                  {workOrder.status}
                </td>
                <td className="padding-table text-center ">
                  {" "}
                  {workOrder.postal}{" "}
                </td>
                <td className="padding-table text-center ">
                  {workOrder?.customer?.name ?? "-"}
                </td>
                <td className="padding-table text-center ">
                  {workOrder?.site?.name ?? "-"}
                </td>
              </Row>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <>
      <Header
        title={"Bon d'intervention"}
        subtitle="Liste des bons d'intervention"
        buttons={[
          {
            actionText: "Nouveau Bon",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-order/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SearchWorkOrdersInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>
        {data?.workOrders?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.workOrders?.results?.length,
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
