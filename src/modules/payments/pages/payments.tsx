import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchPaymentsInput } from "../components";
import { useLazyPayments } from "../hooks";

export const Payments: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [search, { data, loading, fetchMore }] = useLazyPayments();

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
    if (data?.payments?.results?.length === 0) {
      return <EmptyList text="Aucun Contrat" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table font-medium text-left">Site</th>
            <th className="padding-table font-medium text-center">Client</th>
            <th className="padding-table font-medium text-center">
              Commercial
            </th>
            <th className="padding-table font-medium text-center">Etat</th>
          </tr>
        </thead>
        <tbody>
          {data?.payments?.results?.map((payment, index) => (
            <tr
              onClick={() => navigate(`/payment/${payment.id}`)}
              key={`payment-${payment.id}`}
              className={`text-xs cursor-pointer ${
                index % 2 ? "" : "bg-gray-50"
              } `}
            >
              <td className="padding-table text-left">
                {payment?.invoice?.site?.name ?? "-"}
              </td>
              <td className="padding-table text-center">
                {""}
                {payment.customer?.name}
                {""}
              </td>
              <td className="padding-table text-center">
                {payment?.recordedBy?.firstname} {payment?.recordedBy?.lastname}
              </td>
              <td className="padding-table text-center">{payment.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <Header
        title="Liste des Paiment"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/payment/create",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SearchPaymentsInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.payments?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.payments?.results?.length,
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
