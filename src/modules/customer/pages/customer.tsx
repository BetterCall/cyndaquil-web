import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { DemandsPreview } from "../../demands/components";
import { ContactsPreview } from "../../contacts/components";
import { PricesPreview } from "../../prices/components";
import { SitesPreview } from "../../sites/components";
import { WorkOrdersPreview } from "../../work-orders/components";
import { useCustomer } from "../hooks";
import { VisitsPreview } from "../../visits/components";
import { SimpleMap } from "../../../components/maps";

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
      <Header
        title={`Client`}
        subtitle={data?.customer?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/customer/${data?.customer?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
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
                <p className="label">Nombre d'immeuble en gestion</p>
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
              <ContactsPreview where={{ customerId: +id! }} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/contact/create?customerId=${id}`)}
                  >
                    Nouveau Contact
                  </div>
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
                  <div
                    className="btn"
                    onClick={() =>
                      navigate(`/work-order/create?customerId=${id}`)
                    }
                  >
                    Nouveau BI
                  </div>
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
                  <div
                    className="btn"
                    onClick={() => navigate(`/price/create?customerId=${id}`)}
                  >
                    Nouveau Tarif
                  </div>
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
                  <div
                    className="btn"
                    onClick={() => navigate(`/demand/create?customerId=${id}`)}
                  >
                    Nouvel Appel
                  </div>
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
                  <div
                    className="btn"
                    onClick={() => navigate(`/visit/create?customerId=${id}`)}
                  >
                    Nouveau rendez vous
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
