import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { USERS } from "../../queries/user.queries";
import { UserRole } from "../../__generated__/globalTypes";
import {
  UsersQuery,
  UsersQueryVariables,
} from "../../__generated__/UsersQuery";
import { SearchUserInput } from "./components/search";

export const Users = () => {
  const { data: meData } = useMe();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const { data, loading, fetchMore } = useQuery<
    UsersQuery,
    UsersQueryVariables
  >(USERS, {
    variables: {
      limit,
      offset: 0,
    },
  });

  return (
    <div className=" w-full  ">
      <SearchUserInput />

      <div className="flex flex-col max-w-screen-2xl mx-auto mt-8 ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Prénom
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Rôle
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.results?.map((user) => (
                    <tr className="bg-white border-b" key={`user-${user.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.lastname}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.firstname}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {user.role}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <span onClick={() => navigate(`/users/${user.id}`)}>
                          voir
                        </span>{" "}
                        {meData?.me?.role === UserRole.Admin && (
                          <>
                            |{" "}
                            <span
                              onClick={() => navigate(`/users/${user.id}/edit`)}
                            >
                              editer
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {data?.users?.hasMore && (
        <div>
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.users?.results?.length,
                  limit,
                },
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
