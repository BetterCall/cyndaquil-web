import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLazyEquipments } from "../hooks";

import { parseSearchParams } from "../../../helpers/clean-object";
import { SearchEquipmentsInput } from "../components";

import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { EmptyList, Loading } from "../../../components";
import { SendIcon } from "../../../components/icons";

export const Equipments: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyEquipments();
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

  const renderRows = () => {
    if (loading) return <Loading />;
    if (data?.equipments.results?.length === 0) {
      return <EmptyList text="Aucun equipement" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Nom</th>
            </tr>
          </thead>
          <tbody>
            {data?.equipments?.results?.map((reference, index) => (
              <tr
                key={`reference-${reference.id}`}
                className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
              >
                <td className="flex padding-table ">
                  <div>
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/equipment/${reference.id}`)}
                    >
                      {reference?.category?.name || "-"}
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <>
      <Header
        title={"Liste des Equipements"}
        subtitle={"Liste des equipments du parc"}
        buttons={[
          {
            actionText: "Nouvel Equipement",
            bgColor: "indigo",
            textColor: "white",
            link: `/equipment/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SearchEquipmentsInput />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderRows()}
        </div>

        {data?.equipments?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.equipments?.results?.length,
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
