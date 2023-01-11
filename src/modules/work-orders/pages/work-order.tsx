import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useWorkOrder } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { ContactDetails } from "../../contacts/components";
import { Loading } from "../../../components";

export const WorkOrder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/work-orders");
    }
  }, []);

  const { data, loading } = useWorkOrder(+id!);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={`${data?.workOrder?.result?.name}`}
        subtitle={`${data?.workOrder?.result?.customer?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-order/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section">
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Etat" />
              {data?.workOrder?.result?.status}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Date" />
              {data?.workOrder?.result?.date}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Heure" />
              {data?.workOrder?.result?.start}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Tech" />
              {data?.workOrder?.result?.user?.firstname}
            </div>
          </div>
        </section>

        <section className="mx-auto grid grid-cols-4 gap-4">
          <div className="flex flex-col"></div>
          <div className="flex flex-col"></div>

          <div className="flex flex-col"></div>

          <div className="flex flex-col"></div>
        </section>

        <section className="section">
          <div className="left">
            <div className="card mb-2">
              <CardHeader title="Informations Générales" />

              <div className="mb-7">
                <p className="text-sm">
                  {data?.workOrder?.result?.description}
                </p>
              </div>
              <ContactDetails
                site={data?.workOrder?.result?.site?.name}
                siteId={data?.workOrder?.result?.site?.id}
                customer={data?.workOrder?.result?.customer?.name}
                customerId={data?.workOrder?.result?.customer?.id}
                city={data?.workOrder?.result?.city}
              />
            </div>

            <div className="card mb-2 font-bold">
              <CardHeader title="Adresse" />
              {data?.workOrder?.result?.streetNumber}{" "}
              {data?.workOrder?.result?.street} <br />
              {data?.workOrder?.result?.postal}, {data?.workOrder?.result?.city}
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader title="Liste des Equipements" />

              <div className="mb-7">
                {data?.workOrder?.result?.emplacements?.map((eq) => (
                  <div className="mt-4">
                    <div className="font-bold">
                      Batiment : {eq.emplacement.entrance}
                    </div>
                    <div className="mx-2">
                      <div className="font-medium">
                        Entrée : {eq.emplacement.floor}
                      </div>
                      <div className="mx-2">
                        Etage : {eq.emplacement.building} : Equipement :{" "}
                        <span className="font-bold">
                          1 {eq.emplacement.category?.name}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
