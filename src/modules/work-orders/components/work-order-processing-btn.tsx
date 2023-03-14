import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { WorkOrderStatus } from "../../../__generated__/globalTypes";
import { useUpdateWorkOrder } from "../hooks";

interface IGenerateFromContractBtn {
  workOrderId: number;
}

export const WorkOrderProcessingBtn: React.FC<IGenerateFromContractBtn> = ({
  workOrderId,
}) => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = React.useState(false);

  const { submit, loading, form } = useUpdateWorkOrder({
    id: workOrderId,
    onCompleted: async () => {
      toast.success("Bon d'intervention a été modifié avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/work-order/${workOrderId}`);
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  return (
    <>
      <div
        className="btn cursor-pointer mt-2"
        onClick={() => {
          setIsOpened(true);
        }}
      >
        {loading ? "Chargement ..." : "Cloturer le bon d'intervention"}
      </div>

      <Modal
        open={isOpened}
        onCancel={() => setIsOpened(false)}
        onOk={() => setIsOpened(false)}
        style={{
          width: "90%",
        }}
        footer={null}
      >
        <div className="mb-3">
          <CardHeader title="Valider le Bon d'intervention " />
          <p>Validez le bon d'intervention</p>
        </div>

        <Button
          actionText="Valider"
          canClick={!loading}
          loading={loading}
          onClick={() => {
            form.setValue("status", WorkOrderStatus.Reviewed);
            submit();
          }}
        />
      </Modal>
    </>
  );
};
