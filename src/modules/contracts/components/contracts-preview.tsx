import React from "react";
import { EmptyList } from "../../../components";
import { ContractFiltersInput } from "../../../__generated__/globalTypes";
import { useContracts } from "../hooks";
import { ContractStatusBadge } from "./contract-status-badge";

interface IContractsPreviewProps {
  where: ContractFiltersInput;
  emptyText?: string;
}

export const ContractsPreview: React.FC<IContractsPreviewProps> = ({
  where,
  emptyText,
}) => {
  const { data, loading } = useContracts({
    limit: 15,
    offset: 0,
    where,
  });

  if (loading) {
    return <div className="flex justify-center align-middle ">Loading</div>;
  }

  if (data?.contracts?.results?.length === 0) {
    return <EmptyList text={emptyText ?? "Aucun Contrat"} />;
  }

  return (
    <ul>
      {data?.contracts?.results?.map((r) => (
        <li className="mb-5">
          <ContractStatusBadge status={r.status} /> {r.name}
        </li>
      ))}
    </ul>
  );
};
