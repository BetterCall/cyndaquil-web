import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateInvoice } from "../hooks";

interface ICreateInvoiceBtn {
  workOrderId: number;
}

export const CreateInvoiceBtn: React.FC<ICreateInvoiceBtn> = ({
  workOrderId,
}) => {
  const navigate = useNavigate();
  const { loading, submit } = useCreateInvoice({
    defaultValues: { workOrderId },
    onCompleted: async (id) => {
      toast.success("Facture créée avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/invoice/${id}`);
    },
  });

  return (
    <div className="flex justify-end">
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Chargement..." : "Créer une facture"}
      </button>
    </div>
  );
};
