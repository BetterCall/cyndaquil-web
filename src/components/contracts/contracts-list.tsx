import { useQuery } from "@apollo/client";
import React from "react";
import { CONTRACTS } from "../../queries/contracts.queries";
import {
  ContractsQuery,
  ContractsQueryVariables,
} from "../../__generated__/ContractsQuery";
import { ContractFiltersInput } from "../../__generated__/globalTypes";
import { ContractStatusBadge } from "./contract-status-badge";

interface IContractsListProps {
  where: ContractFiltersInput;
  emptyMessage?: string;
}

export const ContractsList: React.FC<IContractsListProps> = ({
  where,
  emptyMessage = "",
}) => {
  const { data, loading } = useQuery<ContractsQuery, ContractsQueryVariables>(
    CONTRACTS,
    {
      variables: {
        limit: 15,
        offset: 0,
        where,
      },
    }
  );

  if (loading) {
    return <div className="flex justify-center align-middle ">Loading</div>;
  }

  return (
    <ul>
      {data?.contracts?.results?.length === 0 && (
        <div className="flex justify-center align-middle py-5 bg-slate-100 rounded border-solid border-slate-200 ">
          {emptyMessage}
        </div>
      )}
      {data?.contracts?.results?.map((r) => (
        <li className="mb-5">
          <ContractStatusBadge status={r.status} /> {r.name}
        </li>
      ))}
    </ul>
  );
};
