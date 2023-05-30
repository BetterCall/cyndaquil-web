import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { parseSearchParams } from "../../../helpers/clean-object";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { useLazyBugs } from "../hooks";
import { Button } from "../../../components/button";
import { SearchBugInput } from "../components";
import { EmptyList, Loading } from "../../../components";

export const Bugs = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyBugs();
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
    if (data?.bugs?.results?.length === 0) {
      return <EmptyList text="Aucun Bug" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table font-medium">Ouvert Par</th>
            <th className="padding-table font-medium  text-center">
              Ouvert Par
            </th>
            <th className="padding-table font-medium text-center">Objet</th>
            <th className="padding-table font-medium text-right">URL</th>
          </tr>
        </thead>
        <tbody>
          {data?.bugs?.results?.map((bug, index) => (
            <tr
              onClick={() => navigate(`/bug/${bug.id}`)}
              key={`bug-${bug.id}`}
              className={`text-xs  ${index % 2 ? "" : "bg-gray-50"} ${
                bug.critical ? "bg-red-200" : ""
              } `}
            >
              <td className="padding-table font-medium ">{bug.status}</td>
              <td className="padding-table font-medium text-center ">
                {bug.user?.firstname} {bug.user?.lastname}
              </td>
              <td className="padding-table font-medium text-center">
                {bug?.object}
              </td>

              <td className="padding-table font-medium text-right">
                {bug?.url}
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
        title={"Bugs"}
        subtitle={"Liste des bugs"}
        buttons={[
          {
            actionText: "Nouveau Bug",
            bgColor: "indigo",
            textColor: "white",
            link: `/bug/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchBugInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.bugs?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.bugs?.results?.length,
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
