import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { Database } from "../../../__generated__/globalTypes";
// TO DO CHANGE
import { CreateUploadModal } from "../../uploads/modals";
import { useContactCategory } from "../hooks";

type IContactCategory = {
  id: string;
};

export const ContactCategory: React.FC = () => {
  const { id } = useParams<IContactCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/contacts");
    }
  }, []);

  const { data, refetch } = useContactCategory(+id!);

  return (
    <>
      <Header
        subtitle={data?.contactCategory?.result?.name ?? ""}
        title={"Types de contact"}
        buttons={[]}
      />

      <div className="main-container">
        <div className="section">
          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.ContactCategories, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.ContactCategories,
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
