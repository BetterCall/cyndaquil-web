import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useUsers } from "../hooks";

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const { data, loading, fetchMore } = useUsers({
    where: {},
    limit,
    offset: 0,
  });

  return (
    <>
      <Header
        title="Utilisateurs"
        subtitle="Liste des utilisateurs"
        buttons={[
          {
            actionText: "Nouvel Utilisateur",
            bgColor: "indigo",
            textColor: "white",
            link: "/user/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table   font-medium  ">Nom</th>
                <th className="padding-table  font-medium text-center">Rôle</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.results?.map((user, index) => (
                <tr
                  key={`user-${user.id}`}
                  className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="padding-table  flex ">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="padding-table  text-center">
                    <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  where: {},
                },
              });
            }}
          />
        </div>
      )}
    </>
  );
};
