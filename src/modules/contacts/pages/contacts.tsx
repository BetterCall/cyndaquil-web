import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchContactInput } from "../components";
import { useLazyContacts } from "../hooks";

export const Contacts = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyContacts();

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
    if (data?.contacts?.results?.length === 0) {
      return <EmptyList text="Aucun Contact" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table font-medium">Nom Prénom</th>
            <th className="padding-table font-medium text-center">Téléphone</th>
            <th className="padding-table font-medium text-center">Email</th>
            <th className="padding-table font-medium text-center">Client</th>
            <th className="padding-table font-medium text-right">Site</th>
          </tr>
        </thead>
        <tbody>
          {data?.contacts?.results?.map((contact, index) => (
            <tr
              key={`contact-${contact.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="padding-table flex ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/contact/${contact.id}`)}
                  >
                    {contact?.firstname || "-"}
                    {contact?.lastname || "-"}
                  </p>
                  <p className="text-gray-500">
                    {contact?.category?.name || "-"}
                  </p>
                </div>
              </td>
              <td className="padding-table font-medium text-center ">
                {contact?.phone ?? "-"}
              </td>
              <td className="padding-table font-medium text-center ">
                {contact?.email ?? "-"}
              </td>
              <td
                className={`padding-table font-medium text-center ${
                  contact?.customerId ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (contact?.customerId) {
                    navigate(`/customer/${contact?.customerId}`);
                  }
                }}
              >
                {contact?.customer?.name ?? "-"}
              </td>
              <td
                className={`padding-table font-medium text-center ${
                  contact?.siteId ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (contact?.siteId) {
                    navigate(`/site/${contact?.siteId}`);
                  }
                }}
              >
                {contact?.site?.name ?? "-"}
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
        title="Contacts"
        subtitle="Liste des Contacts"
        buttons={[
          {
            actionText: "Nouveau Contact",
            bgColor: "indigo",
            textColor: "white",
            link: "/contact/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchContactInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.contacts?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.contacts?.results?.length,
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
