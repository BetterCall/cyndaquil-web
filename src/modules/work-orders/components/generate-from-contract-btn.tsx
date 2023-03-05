import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGenerateFromContract } from "../hooks/useGenerateFromContract";

interface IGenerateFromContractBtn {
  contractId: number;
}

export const GenerateFromContractBtn: React.FC<IGenerateFromContractBtn> = ({
  contractId,
}) => {
  const navigate = useNavigate();
  const { submit, loading } = useGenerateFromContract({
    contractId,
    onCompleted: async (id) => {
      toast.success("Bon d'intervention généré avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/work-order/${id}`);
    },
    onError: (message) => {
      toast.error(message);
    },
  });
  return (
    <div
      className="btn cursor-pointer mt-2"
      onClick={() => {
        if (!loading) submit();
      }}
    >
      {loading ? "Chargement ..." : "Générer un BI "}
    </div>
  );
};
