import React from "react";
import { useRemoveEmplacement } from "../hooks";

interface IRemoveEmplacementProps {
  emplacementId: number;
  refetch: any;
}

export const RemoveEmplacement: React.FC<IRemoveEmplacementProps> = ({
  emplacementId,
  refetch,
}) => {
  const { submit, loading } = useRemoveEmplacement({
    id: emplacementId,
    onCompleted: () => refetch(),
  });

  return (
    <span className="px-2 cursor-pointer" onClick={submit}>
      x
    </span>
  );
};
