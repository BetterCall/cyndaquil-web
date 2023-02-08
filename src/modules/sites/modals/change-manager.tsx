import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useUpdateSite } from "../hooks";
import { Button } from "../../../components/button";
import { useContacts } from "../../contacts/hooks";
import { CardHeader } from "../../../components/cards";
import { toast } from "react-toastify";

interface IChangeManagerProps {
  siteId: number;
  customerId?: number;
  onCompleted: any;
  managerId: number | null;
}

export const ChangeManager: React.FC<IChangeManagerProps> = ({
  siteId,
  customerId,
  onCompleted,
  managerId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, submit, loading } = useUpdateSite({
    id: siteId,
    onCompleted: () => {
      form.setValue("managerId", null);
      toast.success("Le gestionnaire a été modifié avec succès");
    },
  });

  const { data } = useContacts({ where: { customerId } });
  useEffect(() => {
    form.setValue("managerId", null);
  }, [customerId]);
  const selectedId = form.watch("managerId");

  useEffect(() => {
    form.setValue("managerId", managerId);
  }, []);

  const handleOk = async () => {
    try {
      await submit();
      setIsModalOpen(false);
      onCompleted();
    } catch (error) {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="btn">
        <svg
          className="mr-2"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99989 0.666687C7.90554 0.666687 6.82191 0.882235 5.81086 1.30102C4.79981 1.71981 3.88115 2.33364 3.10733 3.10746C1.54453 4.67027 0.666555 6.78988 0.666555 9.00002C0.65927 10.9243 1.32555 12.7905 2.54989 14.275L0.883222 15.9417C0.76759 16.0589 0.68926 16.2077 0.658115 16.3693C0.62697 16.531 0.644405 16.6983 0.708222 16.85C0.777437 17 0.889642 17.126 1.03059 17.212C1.17155 17.2981 1.33489 17.3403 1.49989 17.3334H8.99989C11.21 17.3334 13.3296 16.4554 14.8924 14.8926C16.4552 13.3298 17.3332 11.2102 17.3332 9.00002C17.3332 6.78988 16.4552 4.67027 14.8924 3.10746C13.3296 1.54466 11.21 0.666687 8.99989 0.666687V0.666687ZM8.99989 15.6667H3.50822L4.28322 14.8917C4.43843 14.7356 4.52555 14.5243 4.52555 14.3042C4.52555 14.084 4.43843 13.8728 4.28322 13.7167C3.19204 12.6267 2.51253 11.1921 2.36046 9.65735C2.20839 8.12256 2.59317 6.58253 3.44924 5.29962C4.30531 4.01672 5.57971 3.07032 7.05532 2.62166C8.53092 2.17301 10.1164 2.24986 11.5417 2.83911C12.967 3.42837 14.1439 4.49358 14.8719 5.85326C15.5999 7.21294 15.8339 8.78297 15.5342 10.2959C15.2344 11.8087 14.4193 13.1709 13.2278 14.1502C12.0364 15.1295 10.5422 15.6655 8.99989 15.6667V15.6667ZM13.1666 8.16669H4.83322C4.61221 8.16669 4.40025 8.25448 4.24397 8.41076C4.08769 8.56704 3.99989 8.77901 3.99989 9.00002C3.99989 9.22103 4.08769 9.433 4.24397 9.58928C4.40025 9.74556 4.61221 9.83335 4.83322 9.83335H13.1666C13.3876 9.83335 13.5995 9.74556 13.7558 9.58928C13.9121 9.433 13.9999 9.22103 13.9999 9.00002C13.9999 8.77901 13.9121 8.56704 13.7558 8.41076C13.5995 8.25448 13.3876 8.16669 13.1666 8.16669ZM11.4999 11.5H6.49989C6.27887 11.5 6.06691 11.5878 5.91063 11.7441C5.75435 11.9004 5.66655 12.1123 5.66655 12.3334C5.66655 12.5544 5.75435 12.7663 5.91063 12.9226C6.06691 13.0789 6.27887 13.1667 6.49989 13.1667H11.4999C11.7209 13.1667 11.9329 13.0789 12.0891 12.9226C12.2454 12.7663 12.3332 12.5544 12.3332 12.3334C12.3332 12.1123 12.2454 11.9004 12.0891 11.7441C11.9329 11.5878 11.7209 11.5 11.4999 11.5ZM6.49989 6.50002H11.4999C11.7209 6.50002 11.9329 6.41222 12.0891 6.25594C12.2454 6.09966 12.3332 5.8877 12.3332 5.66669C12.3332 5.44567 12.2454 5.23371 12.0891 5.07743C11.9329 4.92115 11.7209 4.83335 11.4999 4.83335H6.49989C6.27887 4.83335 6.06691 4.92115 5.91063 5.07743C5.75435 5.23371 5.66655 5.44567 5.66655 5.66669C5.66655 5.8877 5.75435 6.09966 5.91063 6.25594C6.06691 6.41222 6.27887 6.50002 6.49989 6.50002V6.50002Z"
            fill="#8880EB"
          ></path>
        </svg>
        <span>Changer de gestionnaire</span>
      </div>

      <Modal
        visible={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="annuler"
        okText="Valider"
      >
        <CardHeader title="Changer le gestionnaire" />
        <ul>
          {data?.contacts?.results?.map((contact) => (
            <li
              key={`manager-${contact.id}`}
              className="flex align-middle justify-items-center"
            >
              <input
                onClick={() => form.setValue("managerId", contact.id)}
                type="checkbox"
                className="mr-2"
                checked={contact.id === selectedId}
              />
              {`${contact.firstname} ${contact.lastname}`}
            </li>
          ))}
        </ul>

        <div className="grid -mx-2 mt-2   justify-items-center ">
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
