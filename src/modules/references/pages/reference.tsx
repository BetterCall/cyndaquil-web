import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { useReference } from "../hooks";

type IRefParams = {
  id: string;
};

export const Reference: React.FC = () => {
  const { id } = useParams<IRefParams>();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/references");
    }
  }, []);

  const { data, loading } = useReference(+id!);

  return (
    <>
      <Header
        title={"Référence"}
        subtitle={data?.reference?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Nouvelle Référence",
            bgColor: "indigo",
            textColor: "white",
            link: `/reference/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="section">
          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.References, objectId: +id! }}
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
