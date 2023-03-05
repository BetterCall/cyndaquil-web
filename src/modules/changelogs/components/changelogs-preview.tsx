import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { ChangelogFiltersInput } from "../../../__generated__/globalTypes";
import { useChangelogs } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { cleanObject } from "../../../helpers/clean-object";

interface IChangelogsPreviewProps {
  where: ChangelogFiltersInput;
  hideCreateButton?: boolean;
  message?: string;
}

export const ChangelogsPreview: React.FC<IChangelogsPreviewProps> = ({
  where,
  hideCreateButton,
  message = "Aucun Changelog",
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useChangelogs({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.changelogs?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Fait par</th>
            <th className=" font-medium padding-table text-center ">Table</th>
            <th className=" font-medium padding-table text-center ">Type</th>
            <th className=" font-medium padding-table text-right ">Id</th>
          </tr>
        </thead>
        <tbody>
          {data?.changelogs?.results?.map((changelog, index) => (
            <tr
              key={`changelog-${changelog.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => navigate(`/changelog/${changelog.id}`)}
                  >
                    {changelog.user?.firstname} {changelog.user?.lastname}
                  </p>
                </div>
              </td>
              <td className="font-medium padding-table text-center ">
                {changelog.database}
              </td>
              <td className="font-medium padding-table text-center ">
                {changelog.event}
              </td>
              <td className="font-medium padding-table text-right ">
                {changelog.id}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hideCreateButton ? null : (
        <div className="cardFooter">
          <div className="w-full md:w-1/2 px-2">
            <div
              className="btn"
              onClick={() =>
                navigate(
                  `/changelog/create?${createSearchParams(cleanObject(where))}`
                )
              }
            >
              Nouveau Changelog
            </div>
          </div>
        </div>
      )}
    </>
  );
};

{
  /* <CardHeader
        title="Changelog sur Places"
        button={{
          title: "Nouveau Changelog",
          icon: <SendIcon />,
          url:
            Object.keys(where).length > 0
              ? `/changelog/create?${createSearchParams(cleanObject(where))}`
              : `/changelog/create`,
        }}
      /> */
}
