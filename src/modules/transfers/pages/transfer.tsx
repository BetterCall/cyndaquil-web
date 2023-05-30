import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useTransfer } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { ContactDetails } from "../../contacts/components";
import { Loading } from "../../../components";
import { FilesPreview } from "../../../components/files-preview";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";

export const Transfer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/transfers");
    }
  }, []);

  const { data, loading } = useTransfer(+id!);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={`Remboursement`}
        subtitle={`${data?.transfer?.result?.customer?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/transfer/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations Générales" />
              {data?.transfer?.result?.amount} €
              <br />
              IBAN : {data?.transfer?.result?.iban}
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Client" />
              {data?.transfer?.result?.createdAt}
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Heure" />
              {data?.transfer?.result?.customer?.name}
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Saisie Par " />
              {data?.transfer?.result?.recordedBy?.firstname}{" "}
              {data?.transfer?.result?.recordedBy?.lastname}
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Informations Générales" />

              <div className="mb-7">
                <p className="text-sm">{data?.transfer?.result?.comment}</p>
              </div>
              <ContactDetails
                customer={data?.transfer?.result?.customer?.name}
                customerId={data?.transfer?.result?.customer?.id}
              />
            </div>
          </div>
          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Transfers, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Transfers,
                      objectId: +id!,
                    }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
