import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchReferencesInput } from "../components";
import { useLazyReferences } from "../hooks";

export const References = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyReferences();
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
    if (data?.references?.results?.length === 0) {
      return <EmptyList text="Aucune référence" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="  padding-table font-medium ">Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.references?.results?.map((reference, index) => (
            <tr
              key={`reference-${reference.id}`}
              className={`text-xs  ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex   padding-table ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/reference/${reference.id}`)}
                  >
                    {reference?.name || "-"}
                  </p>
                </div>
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
        title={"Liste des References"}
        subtitle={"Liste des references produits"}
        buttons={[
          {
            actionText: "Nouvelle Référence",
            bgColor: "indigo",
            textColor: "white",
            link: `/reference/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchReferencesInput {...parseSearchParams(searchParams)} />
        <div className="p-4 mb-1 bg-white shadow rounded overflow-x-auto">
          {/* {data?.references?.total} resultats */}
        </div>
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.references?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.references?.results?.length,
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
