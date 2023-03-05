import { gql, useApolloClient } from "@apollo/client";
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
  const client = useApolloClient();
  const { loading, submit } = useCreateInvoice({
    defaultValues: { workOrderId },
    onCompleted: async (id) => {
      toast.success("Facture créée avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // navigate(`/invoice/${id}`);
      client.writeFragment({
        id: `WorkOrder:${workOrderId}`,
        fragment: gql`
          fragment WorkOrderInvoice on WorkOrder {
            invoiceId
          }
        `,
        data: {
          invoiceId: id,
        },
      });
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  return (
    <button className="btn w-full" onClick={submit} disabled={loading}>
      {loading ? "Chargement..." : "Créer une facture"}
    </button>
  );
};
