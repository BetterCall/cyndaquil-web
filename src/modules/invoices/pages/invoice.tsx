import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { CreateBillingReminderButton } from "../../billing-reminders/buttons";
import { BillingRemindersPreview } from "../../billing-reminders/components";
import { PaymentsPreview } from "../../payments/components";
import { CreateUploadModal } from "../../uploads/modals";
import { WorkOrdersPreview } from "../../work-orders/components";

import { useInvoice } from "../hooks";

type IInvoiceParams = {
  id: string;
};

export const Invoice: React.FC = () => {
  const { id } = useParams<IInvoiceParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/invoices");
    }
  }, []);

  const { data, error } = useInvoice(+id!);
  console.log("error ", error);
  console.log("data ", data);
  return (
    <>
      <Header
        title={`Facture`}
        subtitle={`Facture N°${data?.invoice?.result?.id}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/invoice/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section ">
          <div className=" element">
            <div className="card">
              <CardHeader title={"Lieu de l'intervention"} />

              <div className="w-full mb-3">
                <p className="label">Immeuble</p>
                <input
                  className="input w-full "
                  disabled
                  value={data?.invoice?.result?.site?.name ?? ""}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Numero de rue</p>

                    <input
                      className="w-full input"
                      disabled
                      value={data?.invoice?.result?.site?.streetNumber ?? ""}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Complément</p>
                    <input
                      className="w-full input"
                      type="text"
                      placeholder="Bis"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="w-full input"
                  disabled
                  value={data?.invoice?.result?.site?.street ?? ""}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.invoice?.result?.site?.city ?? ""}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.invoice?.result?.site?.postal ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" element">
            <div className="card">
              <CardHeader title={"Client"} />

              <div className="w-full mb-3">
                <p className="label">Nom</p>
                <input
                  className="input w-full "
                  disabled
                  value={data?.invoice?.result?.customer?.name ?? ""}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Numero de rue</p>

                    <input
                      className="w-full input"
                      disabled
                      value={
                        data?.invoice?.result?.customer?.streetNumber ?? ""
                      }
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Complément</p>
                    <input
                      className="w-full input"
                      type="text"
                      placeholder="Bis"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="w-full input"
                  disabled
                  value={data?.invoice?.result?.customer?.street ?? ""}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.invoice?.result?.customer?.city ?? ""}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.invoice?.result?.customer?.postal ?? ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Résumé" />
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Montant HT</p>
                    <input
                      className="input w-full "
                      disabled
                      value={`${data?.invoice?.result?.totalWithoutTax}€ HT`}
                    />
                  </div>
                </div>

                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Montant TTC</p>
                    <input
                      className="input w-full "
                      disabled
                      value={`${data?.invoice?.result?.totalWithTax}€ TTC`}
                    />
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Montant de la TVA</p>
                    <input
                      className="input w-full "
                      disabled
                      value={`${data?.invoice?.result?.taxAmount}€ HT`}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label"> Reste a payer </p>
                    <input
                      className="input w-full "
                      disabled
                      value={`${data?.invoice?.result?.amountRemaining}€ TTC`}
                    />
                  </div>
                </div>
              </div>
              <CardHeader title="Paiement" />

              <PaymentsPreview invoiceId={+id!} />
              <div
                className="btn cursor-pointer mt-2"
                onClick={() => {
                  navigate(`/payment/create?invoiceId=${id}`);
                }}
              >
                Saisir un paiment
              </div>
            </div>
          </div>

          <div className="element ">
            <div className="card">
              <CardHeader title="Bons d'intervention" />
              <WorkOrdersPreview invoiceId={+id!} />
            </div>
          </div>

          <div className="element ">
            <div className="card">
              <CardHeader title="Détails" />
              {data?.invoice?.result?.rows?.map((row) => (
                <div className="mt-4 px-4 mb-5">
                  <div className="mb-2 flex justify-between font-medium ">
                    <span>{row.line} </span>
                    <span className=" font-medium"> </span>
                  </div>

                  <div className="mx-2">
                    <div className="mb-2 flex justify-between">
                      <span>Quantité </span>
                      <span className=" font-medium">{row.quantity}</span>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <span>Prix Unitaire </span>
                      <span className=" font-medium">XX € HT</span>
                    </div>

                    <div className="mb-2 flex justify-between ">
                      <span>Taux TVA </span>
                      <span className=" font-medium">
                        {row.taxPercentage} %
                      </span>
                    </div>
                  </div>
                  <div className="w-full px-2 py-1 bg-slate-100 rounded">
                    <div className=" flex justify-between font-medium mt-2">
                      <span className=" font-medium">Montant TVA</span>
                      <span className=" font-medium">{row.taxAmount} € HT</span>
                    </div>

                    <div className=" flex justify-between font-medium mt-2">
                      <span className=" font-medium">Montant HT</span>
                      <span className=" font-medium">
                        {row.totalWithoutTax} € HT
                      </span>
                    </div>
                    <div className=" flex justify-between font-medium mt-2 pb-2">
                      <span className=" font-medium">Montant TTC</span>
                      <span className=" font-medium">
                        {row.totalWithTax} € TTC
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="element">
            <div className="card mb-3">
              <CardHeader title="Relances" />
              <BillingRemindersPreview where={{ invoiceId: +id! }} />
              <CreateBillingReminderButton invoiceId={+id!} />
            </div>

            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Invoices, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2 justify-items-center ">
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
