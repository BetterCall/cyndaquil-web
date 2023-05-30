import React, { useState } from "react";
import { Modal } from "antd";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Database } from "../../../__generated__/globalTypes";
import { useEmplacement } from "../hooks";
import { ChangeEquipment } from "./change-equipment.modal";
import { toast } from "react-toastify";

interface IProps {
  emplacementId: number;
  children: any;
}

export const EmplacementPreview: React.FC<IProps> = ({
  children,
  emplacementId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, refetch } = useEmplacement(emplacementId);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>{children}</div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CardHeader title="Informations" />

        <div className="main-container">
          <div className="section">
            <div className="element">
              <CardHeader title="Equipement" />

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Code</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.code ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Catégorie</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.emplacement?.result?.category?.name ?? "-"}
                    />
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Batiment</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.building ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Entrée</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.emplacement?.result?.entrance ?? "-"}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <p className="label">Etage</p>
                <input
                  type="text"
                  className="w-full input"
                  disabled
                  value={data?.emplacement?.result?.floor ?? "-"}
                />
              </div>

              <div className="w-full ">
                <CardHeader title="Fichiers" />
                <FilesPreview
                  withoutFilters
                  where={{
                    database: Database.Emplacements,
                    objectId: emplacementId,
                  }}
                />
              </div>
            </div>

            <div className="element">
              <CardHeader title="Equipement" />

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Code</p>
                    <input
                      className="w-full input"
                      value={data?.emplacement?.result?.equipment?.code ?? "-"}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Derniere verif.</p>
                    <input
                      className="w-full input"
                      disabled
                      value={"12/12/2024"}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <CardHeader title="Fichiers" />
                <FilesPreview
                  withoutFilters
                  where={{
                    database: Database.Equipments,
                    objectId: data?.emplacement?.result?.equipment?.id ?? 0,
                  }}
                />
              </div>

              <ChangeEquipment
                id={emplacementId}
                onCompleted={() => toast.success("Equipement modifié")}
                onError={(error) => toast.error(error)}
                defaultValues={{
                  equipmentId: data?.emplacement?.result?.equipment?.id,
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
