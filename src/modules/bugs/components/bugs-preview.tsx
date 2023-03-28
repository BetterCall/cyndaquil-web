import React from "react";
import { useNavigate } from "react-router-dom";

import { useBugs } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { BugFiltersInput } from "../../../__generated__/globalTypes";

interface IProps {
  where: BugFiltersInput;
  message?: string;
  limit?: number;
}

export const BugsPreview: React.FC<IProps> = ({
  where,
  message = "Aucun utilisateur",
  limit = 5,
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useBugs({
    limit,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.bugs?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  console.log("data", data);
  console.log("error", error);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">URL</th>
            <th className=" font-medium padding-table text-right ">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.bugs?.results?.map((bug, index) =>
            index < limit ? (
              <tr
                onClick={() => navigate(`/bug/${bug.id}`)}
                key={`bug-${bug.id}`}
                className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
              >
                <td className="flex padding-table ">{bug.url}</td>
                <td className="font-medium padding-table text-right ">
                  {bug.status}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </>
  );
};
