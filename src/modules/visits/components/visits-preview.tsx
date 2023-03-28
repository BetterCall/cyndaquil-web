import React, { useEffect, useState } from "react";

import { useLazyVisits } from "../hooks";

import { cleanObject } from "../../../helpers/clean-object";
import { EmptyList, Loading } from "../../../components";

import { VisitFiltersInput } from "../../../__generated__/globalTypes";

interface VisitProps extends VisitFiltersInput {
  title?: string;
  subtitle?: string;
}

export const VisitsPreview: React.FC<VisitProps> = ({
  title,
  subtitle,
  date,
  ...where
}) => {
  const [filters, setFilters] = useState({});
  const [search, { data, loading }] = useLazyVisits();
  useEffect(() => {
    if (filters === where) {
      return;
    }
    setFilters(where);
    const filter = cleanObject(where);
    if (Object.keys(filter).length === 0) {
      return;
    }
    search({
      variables: {
        limit: 10,
        offset: 0,
        where: { date, ...filter },
      },
    });
  }, [date]);

  if (loading) {
    return <Loading />;
  }

  if (data?.visits?.results?.length === 0) {
    return <EmptyList text="Aucun Rendez-Vous" />;
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
        {data?.visits?.results?.map((visit, index) => (
          <tr
            key={`visit-${visit.id}`}
            className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="padding-table ">{visit?.object}</td>
            <td className="padding-table text-center">{visit.status}</td>
            <td className="padding-table text-right ">{visit.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
