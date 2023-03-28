import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchSiteInput } from "../components";
import { useLazySites } from "../hooks";

export const Sites: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazySites();
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
    if (data?.sites?.results?.length === 0) {
      return <EmptyList text="Aucun Immeuble" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table  font-medium">Nom</th>
            <th className="padding-table  font-medium text-center">Ville</th>
            <th className="padding-table  font-medium text-center">
              Code Postal
            </th>
            <th className="padding-table  font-medium text-center">Rôle</th>
            <th className="padding-table  font-medium text-right">Complet</th>
          </tr>
        </thead>
        <tbody>
          {data?.sites?.results?.map((site, index) => (
            <tr
              key={`site-${site.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/site/${site.id}`)}
                  >
                    {site?.name || "-"}
                  </p>
                  <p className="text-gray-500">
                    {site.streetNumber} {site.street}
                  </p>
                </div>
              </td>
              <td className="padding-table font-medium text-center ">
                {site.city}
              </td>
              <td className="padding-table  font-medium text-center ">
                {site.postal}
              </td>
              <td className="padding-table text-center font-medium">
                {site.customer?.name}
              </td>
              <td className="padding-table font-medium text-right ">
                {site.completed ? "yrs" : "no"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  console.log("data ", data);
  return (
    <>
      <Header
        title="Immeuble"
        subtitle={"Liste des Copropriétés"}
        buttons={[
          {
            actionText: "Nouvelle Copropriété",
            bgColor: "indigo",
            textColor: "white",
            link: `/site/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchSiteInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.sites?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.sites?.results?.length,
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
