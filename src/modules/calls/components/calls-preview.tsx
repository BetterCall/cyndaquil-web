import React from "react";
import { EmptyList, Loading } from "../../../components";
import { CallsFiltersInput } from "../../../__generated__/globalTypes";
import { useCalls } from "../hooks";

export const CallsPreview: React.FC<CallsFiltersInput> = (where) => {
  const { data, loading } = useCalls({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.calls?.results?.length === 0) {
    return <EmptyList text="Aucun Appel" />;
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
        {data?.calls?.results?.map((call, index) => (
          <tr
            key={`calls-${call.id}`}
            className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="padding-table ">
              {`${call.user.firstname} ${call.user.lastname}`}
            </td>
            <td className="padding-table text-center">
              {call.customer?.name || "-"}
            </td>
            <td className="padding-table text-right ">
              {call.site?.name || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// <div className="card">
// <CardHeader
//   title="List des Appels"
//   button={{
//     title: "Nouvel Appel",
//     icon: <SendIcon />,
//     //@ts-ignore
//     url:
//       Object.keys(where).length > 0
//         ? `/call/create?${createSearchParams(cleanObject(where))}`
//         : `/call/create`,
//   }}
// />
