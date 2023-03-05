import React from "react";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { UsersFiltersInput } from "../../../__generated__/globalTypes";

interface IUsersPreviewProps {
  where: UsersFiltersInput;
  message?: string;
}

export const UsersPreview: React.FC<IUsersPreviewProps> = ({
  where,
  message = "Aucun utilisateur",
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useUsers({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.users?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  console.log("data", data);
  console.log("error", error);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Nom</th>
            <th className=" font-medium padding-table text-right ">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.results?.map((user, index) => (
            <tr
              key={`user-${user.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    {user.firstname}
                  </p>
                  <p className="text-gray-500">{user.lastname}</p>
                </div>
              </td>
              <td className="font-medium padding-table text-right ">
                {user.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
