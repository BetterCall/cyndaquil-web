import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchInvoicesInput } from "../components";
import { useLazyInvoices } from "../hooks";

export const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [search, { data, loading, fetchMore }] = useLazyInvoices();

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
    if (data?.invoices?.results?.length === 0) {
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
          {data?.invoices?.results?.map((invoice, index) => (
            <tr
              onClick={() => navigate(`/invoice/${invoice.id}`)}
              key={`invoice-${invoice.id}`}
              className={`text-xs  cursor-pointer ${
                index % 2 ? "" : "bg-gray-50"
              } `}
            >
              <td className="  padding-table  text-left ">
                {invoice?.site?.name ?? "-"}
              </td>
              <td className="   padding-table  text-center "> </td>
              <td className="  padding-table  text-center "></td>
              <td className="  padding-table  text-center ">
                {invoice.status}
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
        title="Factures"
        subtitle="Liste des factures"
        buttons={[
          {
            actionText: "Nouvelle Facture",
            bgColor: "indigo",
            textColor: "white",
            link: "/invoice/create",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SearchInvoicesInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.invoices?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.invoices?.results?.length,
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
