import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useUpdateSite } from "../hooks";
import { CustomerInput } from "../../customer/components";

interface IChangeManagerProps {
  siteId: number;
  customerId?: number;
  onCompleted: any;
}

export const ChangeCustomer: React.FC<IChangeManagerProps> = ({
  siteId,
  customerId,
  onCompleted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, submit, loading } = useUpdateSite({
    id: siteId,
    onCompleted: () => alert("ok"),
  });

  useEffect(() => {
    form.setValue("customerId", customerId);
  }, []);

  const handleOk = async () => {
    try {
      await submit();
      onCompleted();
    } catch (error) {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="btn">
        {loading ? "Chargement" : "Changer le Client"}
      </div>

      <Modal
        visible={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CustomerInput form={form} />

        <div className="grid -mx-2 mt-2 justify-items-center ">
          <div
            onClick={() => {
              handleOk();
            }}
            className="btn"
          >
            {loading ? "Chargement" : "Valider"}
          </div>
        </div>
      </Modal>
    </>
  );
};
