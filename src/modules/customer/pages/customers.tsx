import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { CreateBenefitButton } from "../../benefits/buttons";
import { CreateCustomerButton } from "../buttons";

import { SearchCustomerInput } from "../components";
import { useLazyCustomers } from "../hooks";

export const Customers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [limit, setLimit] = useState(10);
  const [search, { data, loading, fetchMore }] = useLazyCustomers();

  console.log("data", data);

  useEffect(() => {
    search({
      variables: {
        limit,
        offset: 0,
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  console.log(" data", data);
  console.log("  where: parseSearchParams(searchParams), ", {
    where: parseSearchParams(searchParams),
  });

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.customers?.results?.length === 0) {
      return <EmptyList text="Aucun Client" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table   font-medium text-left ">Nom</th>
            <th className="padding-table   font-medium text-center ">
              Téléphone
            </th>
            <th className="padding-table   font-medium text-center ">Email</th>
            <th className="padding-table   font-medium text-center">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {data?.customers?.results?.map((user, index) => (
            <tr
              key={`user-${user.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="padding-table  flex py-3">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/customer/${user.id}`)}
                  >
                    {user.name}
                  </p>
                  <p className="text-gray-500">{user.city}</p>
                </div>
              </td>
              <td className="padding-table  text-center font-medium">
                {user.phone}
              </td>
              <td className="padding-table  text-center  font-medium">
                {user.email}
              </td>
              <td className="padding-table  text-center ">
                <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
                  {user.category?.name}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Header title="Clients" subtitle="Liste des Clients" />

      <div className="main-container">
        <div className="flex">
          <CreateCustomerButton />
        </div>

        <SearchCustomerInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-1 bg-white shadow rounded overflow-x-auto">
          {data?.customers?.total} resultats
        </div>
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.customers?.hasMore && (
          <div className="flex flex-wrap -mx-4 items-center justify-between">
            <div className="w-full lg:w-1/3 px-4 flex items-center mb-4 lg:mb-0"></div>
            <div className="w-full lg:w-auto px-4 flex items-center justify-center">
              <div
                className="  cursor-pointer inline-flex items-center justify-center px-2 h-8 text-xs text-white bg-indigo-500 rounded"
                onClick={() => {
                  fetchMore({
                    variables: {
                      offset: data?.customers?.results?.length,
                      limit,
                      where: parseSearchParams(searchParams),
                    },
                  });
                }}
              >
                Charger Plus
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
