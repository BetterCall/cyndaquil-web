import React from "react";
import { EmptyList, Loading } from "../../../components";
import { DemandsFiltersInput } from "../../../__generated__/globalTypes";
import { useDemands } from "../hooks";

export const DemandsPreview: React.FC<DemandsFiltersInput> = (where) => {
  const { data, loading } = useDemands({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.demands?.results?.length === 0) {
    return <EmptyList text="Aucune Demande" />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left">
          <th className="padding-table  font-medium">Nom</th>
          <th className="padding-table  font-medium text-center ">Client</th>
          <th className="padding-table  font-medium text-right ">Site</th>
        </tr>
      </thead>
      <tbody>
        {data?.demands?.results?.map((demand, index) => (
          <tr
            key={`demands-${demand.id}`}
            className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="padding-table ">
              {`${demand.openedBy.firstname} ${demand.openedBy.lastname}`}
            </td>
            <td className="padding-table text-center">
              {demand.customer?.name || "-"}
            </td>
            <td className="padding-table text-right ">
              {demand.site?.name || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
