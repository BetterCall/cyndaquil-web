import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { cleanObject } from "../../helpers/clean-object";
import { useCalls } from "../../hooks/useCalls";
import { CallsFiltersInput } from "../../__generated__/globalTypes";
import { Card, CardHeader } from "../cards";
import { SendIcon } from "../icons";

export const CallsList: React.FC<CallsFiltersInput> = (where) => {
  const navigate = useNavigate();

  const { data, loading } = useCalls({
    limit: 5,
    offset: 0,
    where,
  });

  return (
    <Card>
      <CardHeader
        title="List des Appels"
        button={{
          title: "Nouvel Appel",
          icon: <SendIcon />,
          //@ts-ignore
          url:
            Object.keys(where).length > 0
              ? `/calls/create?${createSearchParams(cleanObject(where))}`
              : `/calls/create`,
        }}
      />

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
    </Card>
  );
};
