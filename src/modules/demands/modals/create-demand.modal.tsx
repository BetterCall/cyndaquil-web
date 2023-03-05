import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useCreateDemand } from "../hooks";
import { DemandForm } from "../components";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { DashboardIcon } from "../../../components/icons";
import { Button } from "../../../components/button";
import { createSearchParams, useNavigate } from "react-router-dom";
import { cleanObject, parseParams } from "../../../helpers/clean-object";

export const CreateDemandModal: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, submit, loading } = useCreateDemand({
    onCompleted: () => {
      toast.success("Un Ticket a été crée avec succès");
      setIsModalOpen(false);
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset();
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openNewPage = () => {
    setIsModalOpen(false);
    const input = form.getValues();
    navigate({
      pathname: "/demand/create",
      search: `?${createSearchParams(cleanObject(input))}`,
    });
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer flex justify-center p-3 text-sm text-white bg-indigo-500 hover:bg-indigo-600 rounded-full transition duration-200"
      >
        <span>Demande</span>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CardHeader title="Créer une demande" />
        <div className="w-full mb-3">
          <Button
            onClick={() => openNewPage()}
            actionText="Ouvrir dans une nouvelle page"
            full
          />
        </div>
        <DemandForm form={form} loading={loading} submit={submit} />
      </Modal>
    </>
  );
};
