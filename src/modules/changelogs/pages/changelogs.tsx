import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchChangelogInput } from "../components";
import { useLazyChangelogs } from "../hooks";

export const Changelogs: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyChangelogs();
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

  return (
    <>
      <Header
        title="Liste des Changelogs"
        subtitle="Un sous titre un peu long"
      />

      <div className="main-container">
        <SearchChangelogInput />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table font-medium ">Id</th>
                <th className="padding-table font-medium text-center">Table</th>
                <th className="padding-table font-medium text-center">Type</th>
                <th className="padding-table font-medium text-right">
                  Fait par
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.changelogs?.results?.map((changelog, index) => (
                <tr
                  key={`changelog-${changelog.id}`}
                  className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="padding-table flex ">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/changelog/${changelog.id}`)}
                      >
                        {changelog?.id}
                      </p>
                    </div>
                  </td>
                  <td className="padding-table font-medium text-center ">
                    {changelog?.database}
                  </td>
                  <td className="padding-table font-medium text-center ">
                    {changelog?.event}
                  </td>
                  <td className="padding-table font-medium text-right ">
                    {changelog?.user?.firstname} {changelog?.user?.lastname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.changelogs?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.changelogs?.results?.length,
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
