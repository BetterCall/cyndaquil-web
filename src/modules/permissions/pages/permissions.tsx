import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { usePermissions } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { useUsers } from "../../users/hooks";
import { ToogleUserPermission } from "../components/toggle-user-permission";
import { UserRole } from "../../../__generated__/globalTypes";

export const Permissions: React.FC = () => {
  const navigate = useNavigate();

  const { data, loading, error } = usePermissions();
  const [permissions, setPermissions] = useState({});

  console.log(error);

  const { data: userData } = useUsers({ where: {} });

  useEffect(() => {
    if (data?.permissions?.results) {
      console.log(data?.permissions?.results?.length);
      let p = {};
      data?.permissions?.results.map((permission) => {
        console.log(permission);

        if (!p.hasOwnProperty(permission.resource)) {
          p[permission.resource] = [];
        }

        p[permission.resource].push(permission);
      });

      setPermissions({ ...p });
    }
  }, [data?.permissions?.results]);

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.permissions?.results?.length === 0) {
      return <EmptyList text="Aucune Règle" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table   font-medium">Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.permissions?.results?.map((permission, index) => (
            <tr
              key={`permission-${permission.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex py-3 padding-table  ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/permission/${permission.id}`)}
                  >
                    {permission?.label || "-"}
                  </p>
                  <p className="text-gray-500"></p>
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
        title={"Permissions"}
        subtitle={"Liste des permissions"}
        buttons={[]}
      />

      <div className="main-container">
        {Object.keys(permissions).map((resource) => {
          return (
            <>
              <div className="w-full card mb-3">
                <CardHeader title={`Resource ${resource}`} />
                {permissions[resource].map((permission) => {
                  return (
                    <div className="w-full mb-3">
                      <p className="label">{permission.label}</p>

                      <div className="px-3">
                        <p className="label">Par Role</p>
                        {Object.keys(UserRole).map((value) => (
                          <ToogleUserPermission
                            userRole={value as UserRole}
                            permissionId={permission.id}
                            username={value}
                          />
                        ))}
                      </div>

                      <div className="px-3">
                        <p className="label">Par utilisateur</p>
                        {userData?.users?.results?.map((user) => {
                          const index = permission.users?.findIndex(
                            (p) => p.userId === user.id
                          );
                          return (
                            <ToogleUserPermission
                              userId={user.id}
                              permissionId={permission.id}
                              username={user.firstname}
                              active={
                                index !== -1
                                  ? permission.users[index].active
                                  : false
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
