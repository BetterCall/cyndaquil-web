import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useVisit } from "../hooks";
import { Header } from "../../../components/header";
import { CardHeader } from "../../../components/cards";
import { Loading } from "../../../components";
import { useMe } from "../../users/hooks/useMe";
import { VisitReportForm } from "../components/visit-report-form";
import { FilesPreview } from "../../../components/files-preview";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { EditVisitButton } from "../buttons";
import { WithTraduction } from "../../traductions/components";

export const Visit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: meData } = useMe();

  useEffect(() => {
    if (!id) {
      navigate("/visits");
    }
  }, []);

  const { data, loading } = useVisit(+id!);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={`Rendez-vous`}
        subtitle={`${data?.visit?.result?.object} - ${data?.visit?.result?.customer?.name}`}
      />

      <div className="main-container">
        <div className="flex mb-3">
          <EditVisitButton id={+id!} />
        </div>

        <section className="section">
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Informations Générales" />

              <div className="w-full">
                <p className="label">Objet</p>
                <input
                  type="text"
                  className="input w-full "
                  disabled
                  value={data?.visit?.result?.object}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Date</p>
                    <input
                      className="input w-full"
                      value={data?.visit?.result?.date ?? ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Heure</p>
                    <input
                      className="input w-full"
                      value={data?.visit?.result?.start ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              {data?.visit?.result?.user?.firstname}

              <div className="w-full mt-3">
                <p className="label">Informations</p>
                <textarea
                  className="input w-full "
                  disabled
                  value={data?.visit?.result?.description ?? ""}
                />
              </div>

              <div className="w-full mt-3">
                <p
                  className="label cursor-pointer "
                  onClick={() =>
                    navigate(`/customer/${data?.visit?.result?.customer?.id}`)
                  }
                >
                  Client
                </p>
                <input
                  type="text"
                  className="input w-full "
                  disabled
                  value={data?.visit?.result?.customer?.name}
                />
              </div>

              <div className="w-full mt-3">
                <p className="label">Etat</p>
                {data?.visit?.result?.status ? (
                  <WithTraduction text={data?.visit?.result?.status}>
                    {(traduction) => (
                      <input
                        type="text"
                        className="input w-full "
                        disabled
                        value={traduction}
                      />
                    )}
                  </WithTraduction>
                ) : null}
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Adresse" />
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">N°</p>
                    <input
                      className="input w-full"
                      value={data?.visit?.result?.streetNumber}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Complement</p>
                    <input
                      className="input w-full"
                      value={"BIS TODO"}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-3">
                <p className="label">Adresse</p>
                <input
                  className="input w-full"
                  value={data?.visit?.result?.street}
                  disabled
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="input w-full"
                      value={data?.visit?.result?.postal}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Ville</p>
                    <input
                      className="input w-full"
                      value={data?.visit?.result?.city}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Rapport" />
              <VisitReportForm id={+id!} />
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Visits, objectId: +id! }}
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
        </section>
      </div>
    </>
  );
};
