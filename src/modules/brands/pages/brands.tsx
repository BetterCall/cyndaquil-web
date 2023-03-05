import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { parseSearchParams } from "../../../helpers/clean-object";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { SearchBrands } from "../components";
import { useLazyBrands } from "../hooks";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";

export const Brands = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyBrands();
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
    if (data?.brands?.results?.length === 0) {
      return <EmptyList text="Aucune Marque" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table   font-medium">Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.brands?.results?.map((brand, index) => (
            <tr
              key={`brand-${brand.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex py-3 padding-table  ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/brand/${brand.id}`)}
                  >
                    {brand?.name || "-"}
                  </p>
                  <p className="text-gray-500">
                    {brand.referencesCount} références{" "}
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
            link: `/brand/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchBrands />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.brands?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.brands?.results?.length,
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
