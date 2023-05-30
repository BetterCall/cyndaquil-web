import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { useSupplier } from "../hooks";

type ISupplierParams = {
  id: string;
};

export const Supplier: React.FC = () => {
  const { id } = useParams<ISupplierParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data } = useSupplier(+id!);

  return (
    <>
      <Header
        title={"Fournisseur"}
        subtitle={data?.supplier?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/supplier/${data?.supplier?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="Section">
          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Suppliers, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.References,
                      objectId: +id!,
                    }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
