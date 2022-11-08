import { useQuery } from "@apollo/client";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { cleanObject } from "../../helpers/clean-object";
import { SITES } from "../../queries/sites.queries";
import { SiteFiltersInput } from "../../__generated__/globalTypes";
import {
  SitesQuery,
  SitesQueryVariables,
} from "../../__generated__/SitesQuery";
import { Card, CardHeader } from "../cards";
import { SendIcon } from "../icons";

export const SitesList: React.FC<SiteFiltersInput> = (where) => {
  const navigate = useNavigate();

  const { data, loading } = useQuery<SitesQuery, SitesQueryVariables>(SITES, {
    variables: {
      limit: 10,
      offset: 0,
      where,
    },
  });

  return (
    <Card>
      <CardHeader
        title="Immeubles"
        button={{
          title: "Nouvel Imm.",
          icon: <SendIcon />,
          //@ts-ignore
          url:
            Object.keys(where).length > 0
              ? `/sites/create?${createSearchParams(cleanObject(where))}`
              : `/sites/create`,
        }}
      />

      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table font-medium">Nom</th>
            <th className="padding-table font-medium text-center">Téléphone</th>
            <th className="padding-table font-medium text-center">Email</th>
            <th className="padding-table font-medium text-right">Rôle</th>
          </tr>
        </thead>
        <tbody>
          {data?.sites?.results?.map((site, index) => (
            <tr
              key={`site-${site.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/sites/${site.id}`)}
                  >
                    {site.name}
                  </p>
                  <p className="text-gray-500">{site.city}</p>
                </div>
              </td>
              <td className="font-medium padding-table text-center   ">
                {site.name}
              </td>
              <td className="font-medium padding-table text-center   ">
                {site.city}
              </td>
              <td className="padding-table  text-right ">
                <span className="inline-block py-1 px-2 text-white bg-green-500 rounded-full">
                  {site?.postal}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};
