import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useWorkOrder } from "../../hooks";
import { Header } from "../../../../components/header";
import { SendIcon } from "../../../../components/icons";
import { CardHeader } from "../../../../components/cards";
import { Loading } from "../../../../components";
import {
  Database,
  WorkOrderStatus,
} from "../../../../__generated__/globalTypes";
import { WorkOrderRows } from "./work-order-rows";
import { FilesPreview } from "../../../../components/files-preview";
import { CreateUploadModal } from "../../../uploads/modals";
import { CreateInvoiceButton } from "../../../invoices/buttons";
import { Link } from "react-router-dom";

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
        title={`Bon d'Intervention`}
        subtitle={`${data?.workOrder?.result?.object} - ${data?.workOrder?.result?.customer?.name}`}
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
          <div className="element">
            <div className="card mb-2  ">
              <CardHeader title={data?.workOrder?.result?.site?.name ?? ""} />
              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="input w-full"
                  value={`${data?.workOrder?.result?.streetNumber} ${data?.workOrder?.result?.street}`}
                  disabled
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1">
                  <div className="w-full mb-3">
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
                  <div className="w-full mb-3">
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

              {data?.workOrder?.result?.status}
              <div className="cardFooter">
                {data?.workOrder?.result?.status === WorkOrderStatus.Reviewed ||
                data?.workOrder?.result?.status ===
                  WorkOrderStatus.Unfinished ? (
                  <div className="w-full md:w-1/2 px-2">
                    <div
                      className="btn"
                      onClick={() =>
                        navigate(`/work-order/create?workOrderId=${id}`)
                      }
                    >
                      Generer un bon avec les taches manquantes
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="card mb-2">
              <CardHeader title="Informations" />

              <div className="w-full mb-3">
                <p className="label">Technicien</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={`${data?.workOrder?.result?.user?.firstname} ${data?.workOrder?.result?.user?.lastname}`}
                />
              </div>

              <div className="w-full mb-3">
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
                  <div className="w-full mb-3">
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
                  <div className="w-full mb-3">
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

              <div className="w-full mb-3">
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
                  <div className="w-full mb-3">
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
                  <div className="w-full mb-3">
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

            <div className="card mb-2">
              <CardHeader
                title={
                  data?.workOrder?.result?.invoiceId
                    ? `Facture n°${data?.workOrder?.result?.invoiceId}`
                    : "Facture"
                }
              />
              {data?.workOrder?.result?.invoice?.status}
              <div className="mb-7">
                <div className="w-full mb-3">
                  <p className="label">Montant HT</p>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={`${data?.workOrder?.result?.invoice?.totalWithoutTax} €`}
                  />
                </div>
                <div className="w-full mb-3">
                  <p className="label">Montant TTC</p>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={`${data?.workOrder?.result?.invoice?.totalWithTax} €`}
                  />
                </div>
                <div className="w-full mb-3">
                  <p className="label">Restant Du</p>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={`${data?.workOrder?.result?.invoice?.amountRemaining} €`}
                  />
                </div>
              </div>

              <div className="w-full">
                {!data?.workOrder?.result?.invoiceId ? (
                  <CreateInvoiceButton workOrderId={+id!} />
                ) : (
                  <Link to={`/invoice/${data?.workOrder?.result?.invoiceId}`}>
                    <div className="btn btn-primary">Detail Facture</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="element">
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

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.WorkOrders, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.WorkOrders,
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
