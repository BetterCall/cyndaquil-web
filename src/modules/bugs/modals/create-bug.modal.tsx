import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useCreateBug } from "../hooks";
import { BugForm } from "../components";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";

export const CreateBugModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, submit, loading } = useCreateBug({
    onCompleted: () => {
      toast.success("Un Ticket a été crée avec succès");
      setIsModalOpen(false);
      form.setValue("object", "");
      form.setValue("description", "");
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset();
      form.setValue(
        "url",
        window.location.pathname + "" + window.location.search
      );
      form.setValue("critical", false);
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer flex justify-center p-3 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-full transition duration-200"
      >
        <span>BUG</span>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CardHeader title="Ouvrir un Ticket" />
        <BugForm form={form} loading={loading} submit={submit} />
      </Modal>
    </>
  );
};
