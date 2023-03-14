import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useWorkOrder } from "../../hooks";
import { Header } from "../../../../components/header";
import { SendIcon } from "../../../../components/icons";
import { CardHeader } from "../../../../components/cards";
import { ContactDetails } from "../../../contacts/components";
import { Loading } from "../../../../components";
import { CreateInvoiceBtn } from "../../../invoices/components/create-invoice-btn";
import { GenerateFromWorkOrderBtn } from "../../components";
import { WorkOrderStatus } from "../../../../__generated__/globalTypes";
import { WorkOrderRows } from "./work-order-rows";

export const WorkOrder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/work-orders");
    }
  }, []);

  const { data, loading, error } = useWorkOrder(+id!);
  console.log("error ", error);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={`${data?.workOrder?.result?.object}`}
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
          <div className="left">
            <div className="card mb-2  ">
              <CardHeader title={data?.workOrder?.result?.site?.name ?? ""} />
              <div className="w-full">
                <p className="label">Adresse</p>
                <input
                  className="input w-full"
                  value={`${data?.workOrder?.result?.streetNumber} ${data?.workOrder?.result?.street}`}
                  disabled
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1">
                  <div className="w-full mt-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.postal ?? ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="w-1/2 ml-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Ville</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.city ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="label">Description</p>
                <input
                  className="input w-full"
                  value={data?.workOrder?.result?.description ?? ""}
                  disabled
                />
              </div>

              <div className="mt-3">{data?.workOrder?.result?.description}</div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <button
                      className="btn w-full"
                      onClick={() =>
                        navigate(`/work-order/create?workOrderId=${id}`)
                      }
                    >
                      Nouveau BI
                    </button>
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <button
                      className="btn w-full"
                      onClick={() =>
                        navigate(
                          `/contract/create?siteId=${data?.workOrder?.result?.siteId}`
                        )
                      }
                    >
                      Nouveau Contrat
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-2">
              <CardHeader title="Informations" />

              <div className="w-full mt-3">
                <p className="label">Technicien</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={`${data?.workOrder?.result?.user?.firstname} ${data?.workOrder?.result?.user?.lastname}`}
                />
              </div>

              <div className="w-full mt-3">
                <p className="label">Client</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={data?.workOrder?.result?.customer?.name}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1">
                  <div className="w-full mt-3">
                    <p className="label">Email</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.customer?.email ?? ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="w-1/2 ml-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Téléphone</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.customer?.phone ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="w-full">
                <p className="label">Etat</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={data?.workOrder?.result?.status}
                />
              </div>

              <div className="w-full mt-3">
                <p className="label">Date</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={data?.workOrder?.result?.date ?? ""}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1">
                  <div className="w-full mt-3">
                    <p className="label">Heure d'arrivée</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.start ?? ""}
                      disabled
                    />
                  </div>
                </div>

                <div className="w-1/2 ml-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Fin Estimée</p>
                    <input
                      className="input w-full"
                      type="text"
                      value={data?.workOrder?.result?.end ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader title="Liste des Equipements" />

              <div className="mb-7">{<WorkOrderRows workOrderId={+id!} />}</div>

              {data?.workOrder?.result?.status !== WorkOrderStatus.Reviewed ? (
                <div className="w-full">
                  <button
                    className="btn w-full"
                    onClick={() => navigate(`/work-order/${id}/processing`)}
                    disabled={loading}
                  >
                    Saisir la journée
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="left">
            <div className="card mb-2">
              <CardHeader title="Facture" />
              <div className="mb-7">
                <p className="text-sm">{data?.workOrder?.result?.invoiceId}</p>
                <p className="text-sm">
                  {data?.workOrder?.result?.invoice?.totalPrice}
                </p>
              </div>

              <div className="w-full">
                {!data?.workOrder?.result?.invoiceId ? (
                  <CreateInvoiceBtn workOrderId={+id!} />
                ) : null}
              </div>
            </div>
          </div>
          <div className="right"></div>
        </section>
      </div>
    </>
  );
};
