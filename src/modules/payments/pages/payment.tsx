import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";

import { usePayment } from "../hooks";

type IPaymentParams = {
  id: string;
};

export const Payment: React.FC = () => {
  const { id } = useParams<IPaymentParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/payments");
    }
  }, []);

  const { data } = usePayment(+id!);

  return (
    <>
      <Header
        title={`Paiement`}
        subtitle={`${data?.payment?.result?.invoice?.site?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/payment/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section ">
          <div className=" element">
            <div className="card">
              <CardHeader title={data?.payment?.result?.customer?.name ?? ""} />
            </div>
          </div>

          <div className="element">
            <div className="card"></div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Payments, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Benefits,
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
