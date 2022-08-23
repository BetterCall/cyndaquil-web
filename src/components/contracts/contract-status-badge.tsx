import React from "react";
import { ContractStatus } from "../../__generated__/globalTypes";

const styles = {
  Accepted: "bg-green-500 text-white",
  Declined: "bg-red-500 text-white",
  Draft: "bg-gray-600 text-white",
  Pending: "bg-blue-500 text-white",
};

const traductions = {
  Accepted: "Acceptée",
  Declined: "Refusée",
  Draft: "Brouillon",
  Pending: "En Attente",
};

interface IContractStatusProps {
  status: ContractStatus;
}
export const ContractStatusBadge: React.FC<IContractStatusProps> = ({
  status,
}) => {
  return (
    <span
      className={`font-bold mr-2 text-xs px-2 py-2 rounded bg-red-500 ${styles[status]}`}
    >
      {traductions[status]}
    </span>
  );
};
