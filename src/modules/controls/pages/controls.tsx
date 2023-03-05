import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { parseSearchParams } from "../../../helpers/clean-object";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { SearchControls } from "../components";
import { useLazyControls } from "../hooks";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";

export const Controls = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyControls();
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
    if (data?.controls?.results?.length === 0) {
      return <EmptyList text="Aucun Controls" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table   font-medium">Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.controls?.results?.map((control, index) => (
            <tr
              key={`control-${control.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex py-3 padding-table  ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/control/${control.id}`)}
                  >
                    {control?.id || "-"}
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
        title={"Liste des Marques"}
        subtitle={""}
        buttons={[
          {
            actionText: "Nouvelle Marque",
            bgColor: "indigo",
            textColor: "white",
            link: `/control/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchControls />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.controls?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.controls?.results?.length,
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
