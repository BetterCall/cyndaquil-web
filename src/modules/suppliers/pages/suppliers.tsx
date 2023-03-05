import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useLazySuppliers } from "../hooks";

import { parseSearchParams } from "../../../helpers/clean-object";

import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

export const Suppliers: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazySuppliers();
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
        title={"Liste des fournisseurs"}
        subtitle={""}
        buttons={[
          {
            actionText: "Nouveau fournisseur",
            bgColor: "indigo",
            textColor: "white",
            link: `/supplier/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="  padding-table font-medium text-left">Nom</th>
                <th className="  padding-table font-medium text-center">
                  Ville
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.suppliers?.results?.map((supplier, index) => (
                <tr
                  key={`supplier-${supplier.id}`}
                  className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="flex   padding-table ">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/supplier/${supplier.id}`)}
                      >
                        {supplier?.name || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="text-center   padding-table ">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/supplier/${supplier.id}`)}
                      >
                        {supplier?.city ?? "-"}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data?.suppliers?.hasMore && (
          <div>
            <Button
              canClick={!loading}
              loading={loading}
              actionText="Plus"
              onClick={() => {
                fetchMore({
                  variables: {
                    offset: data?.suppliers?.results?.length,
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
