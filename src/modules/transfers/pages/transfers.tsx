import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";

import { useLazyTransfers } from "../hooks";

import { SearchTransfersInput } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Row } from "../../../components/tables";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";
import moment from "moment";

export const Transfers: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyTransfers();

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

    if (data?.transfers?.results?.length === 0) {
      return <EmptyList text="Aucun Remboursement" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Utilisateur</th>
              <th className="padding-table font-medium text-center">Client</th>
              <th className="padding-table font-medium text-center">Montant</th>
              <th className="padding-table font-medium text-center">IBAN</th>
              <th className="padding-table font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.transfers?.results?.map((transfer, index) => (
              <Row index={index} key={`transfer-${transfer.id}`}>
                <td className="padding-table flex">
                  <div>
                    <p
                      className="font-medium cursor-pointer"
                      onClick={() => navigate(`/transfer/${transfer.id}`)}
                    >
                      {transfer.recordedBy?.firstname}
                    </p>
                  </div>
                </td>

                <td className="padding-table text-center ">
                  {transfer.customer?.name}
                </td>

                <td className="padding-table text-center ">
                  {transfer.amount}
                </td>
                <td className="padding-table text-center ">{transfer?.iban}</td>
                <td className="padding-table text-right ">
                  {moment(`${transfer?.createdAt}`).format("dddd LL")}
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
        title={"Remboursements"}
        subtitle="Liste de Remboursements"
        buttons={[
          {
            actionText: "Nouveau remboursement",
            bgColor: "indigo",
            textColor: "white",
            link: `/transfer/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SearchTransfersInput {...parseSearchParams(searchParams)} />
        <div className="p-4 mb-1 bg-white shadow rounded overflow-x-auto">
          {/* {data?.transfers?.total} resultats */}
        </div>
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>
        {data?.transfers?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.transfers?.results?.length,
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
