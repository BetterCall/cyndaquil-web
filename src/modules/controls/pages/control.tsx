import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { useControl } from "../hooks";

type IControl = {
  id: string;
};

export const Control: React.FC = () => {
  const { id } = useParams<IControl>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, loading } = useControl(+id!);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={"Vérification"}
        subtitle={data?.control?.result?.id + ""}
        buttons={[
          {
            actionText: "Mettre à jour",
            bgColor: "indigo",
            textColor: "white",
            link: `/control/${id}/update`,
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
                where={{ database: Database.Controls, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  {/* <div
                    className="btn"
                    onClick={() =>
                      navigate(`/upload/create?database=Sites&objectId=${id}`)
                    }
                  >
                    Nouveau Fichier
                  </div> */}
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Controls,
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
