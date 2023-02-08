import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGenerateFromContract } from "../hooks/useGenerateFromContract";

interface IGenerateWorkOrderBtn {
  contractId: number;
}

export const GenerateWorkOrderBtn: React.FC<IGenerateWorkOrderBtn> = ({
  contractId,
}) => {
  const navigate = useNavigate();
  const { submit, loading } = useGenerateFromContract({
    defaultValues: { contractId },
    onCompleted: async (id) => {
      console.log(id);
      toast.success("Bon d'intervention généré avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/work-order/${id}`);
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
