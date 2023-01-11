import React from "react";
import { useNavigate } from "react-router-dom";
import { SiteFiltersInput } from "../../../__generated__/globalTypes";
import { useSites } from "../hooks";
import { EmptyList, Loading } from "../../../components";

export const SitesPreview: React.FC<SiteFiltersInput> = (where) => {
  const navigate = useNavigate();

  const { data, loading } = useSites({
    limit: 10,
    offset: 0,
    where,
  });

  if (loading) return <Loading />;
  if (data?.sites?.results?.length === 0) {
    return <EmptyList text="Aucun Immeuble" />;
  }

  return (
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
                  onClick={() => navigate(`/site/${site.id}`)}
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
  );
};

{
  /* 
 <div className="card">
  <CardHeader
//   title="Immeubles"
//   button={{
//     title: "Nouvel Imm.",
//     icon: <SendIcon />,
//     //@ts-ignore
//     url:
//       Object.keys(where).length > 0
//         ? `/sites/create?${createSearchParams(cleanObject(where))}`
//         : `/sites/create`,
//   }}
// /> */
}
