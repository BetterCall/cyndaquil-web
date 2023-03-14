import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { useGenerateFromWorkOrder } from "../hooks/useGenerateFromWorkOrder";

interface IProps {
  workOrderId: number;
}

export const GenerateFromWorkOrderBtn: React.FC<IProps> = ({ workOrderId }) => {
  const navigate = useNavigate();
  const { submit, loading } = useGenerateFromWorkOrder({
    workOrderId,
    onCompleted: async (id) => {
      toast.success("Le nouveau Bon d'intervention a été généré avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/work-order/${id}`);
    },
    onError: (message) => toast.error(message),
  });

  return (
    <Button
      onClick={submit}
      canClick={true}
      loading={loading}
      actionText={"Nouveau Bon d'intervention"}
    />
  );
};
