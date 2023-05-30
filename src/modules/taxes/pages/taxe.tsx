import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { useTaxe } from "../hooks";

type ITaxe = {
  id: string;
};

export const Taxe: React.FC = () => {
  const { id } = useParams<ITaxe>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useTaxe(+id!);

  return (
    <>
      <Header
        title="Taxe"
        subtitle=""
        buttons={[
          {
            actionText: "Modifier la Taxe",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxe/update/${id}`,
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
                where={{ database: Database.Taxes, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Taxes,
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
