import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { DemandsPreview } from "../../demands/components";
import { ContactsPreview } from "../../contacts/components";
import { PricesPreview } from "../../prices/components";
import { SitesPreview } from "../../sites/components";
import { WorkOrdersPreview } from "../../work-orders/components";
import { useCustomer } from "../hooks";
import { VisitsPreview } from "../../visits/components";
import { SimpleMap } from "../../../components/maps";
import { FilesPreview } from "../../../components/files-preview";
import { Database } from "../../../__generated__/globalTypes";
import { CreateUploadModal } from "../../uploads/modals";
import { EditCustomerButton } from "../buttons";
import { CreateContactButton } from "../../contacts/buttons";
import { CreateWorkOrderButton } from "../../work-orders/buttons";
import { CreatePriceRuleButton } from "../../prices/buttons";
import { CreateDemand } from "../../demands/pages";
import { CreateDemandButton } from "../../demands/buttons";
import { CreateVisitButton } from "../../visits/buttons";

type ICustomerParams = {
  id: string;
};

export const Customer: React.FC = () => {
  const { id } = useParams<ICustomerParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data, loading, refetch } = useCustomer(+id!);

  return (
    <>
      <Header title={`Client`} subtitle={data?.customer?.result?.name ?? ""} />

      <div className="main-container">
        <div className="flex mb-3">
          <EditCustomerButton id={+id!} />
        </div>

        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations Générales" />
              <div className="w-full mb-3">
                <p className="label">Nom</p>
                <input
                  disabled
                  value={data?.customer?.result?.name}
                  className="input w-full"
                />
              </div>

              <div
                className="w-full mb-3 cursor-pointer"
                onClick={() =>
                  navigate(`/sites?customerId=${data?.customer?.result?.id}`)
                }
              >
                <p className="label">Nb. d'immeuble en gestion</p>
                <input
                  disabled
                  value={data?.customer?.result?.sitesCount}
                  className="input w-full"
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3 ">
                    <p className="label">Categorie de client</p>
                    <input
                      disabled
                      value={data?.customer?.result?.category?.name ?? ""}
                      className="input w-full"
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3 ">
                    <p className="label">Commercial</p>
                    <input
                      disabled
                      value={
                        data?.customer?.result?.commercialId
                          ? `${data?.customer?.result?.commercial?.firstname} ${data?.customer?.result?.commercial?.lastname}`
                          : "Aucun Commercial assigné"
                      }
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3 ">
                    <p className="label">Téléphone</p>
                    <input
                      disabled
                      value={data?.customer?.result?.phone}
                      className="input w-full"
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3 ">
                    <p className="label">Email</p>
                    <input
                      disabled
                      value={data?.customer?.result?.email ?? ""}
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card ">
              {data?.customer?.result?.lat && data?.customer?.result?.lng ? (
                <SimpleMap
                  lat={data?.customer?.result?.lat}
                  lng={data?.customer?.result?.lng}
                  zoom={15}
                />
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Immeubles" />
              <SitesPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/site/create?customerId=${id}`)}
                  >
                    Nouveau Site
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Gestionnaires" />
              <ContactsPreview
                where={{ customerId: +id! }}
                message="Aucun Gestionnaire"
              />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <CreateContactButton customerId={+id!} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Bon D'intervention" />
              <WorkOrdersPreview customerId={+id!} />

              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <CreateWorkOrderButton customerId={+id!} />
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Tarifs" />
              <PricesPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <CreatePriceRuleButton customerId={+id!} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Appels" />
              <DemandsPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <CreateDemandButton customerId={+id!} />
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Rendez-vous " />
              <VisitsPreview customerId={+id!} />

              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <CreateVisitButton customerId={+id!} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Customers, objectId: +id! }}
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
                      database: Database.Customers,
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
