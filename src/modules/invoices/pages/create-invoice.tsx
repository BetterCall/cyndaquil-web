import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { SiteInput } from "../../sites/components/site-input";
import { useLazyWorkOrders } from "../../work-orders/hooks";
import { useInvoice, useLazyInvoices } from "../hooks";

export const CreateInvoice: React.FC = () => {
  const form = useForm({});
  const { siteId } = form.watch();

  const [getWorkOrders, { data, loading }] = useLazyWorkOrders();
  const { data: fake } = useInvoice(11);

  console?.log("Site Id", siteId);

  useEffect(() => {
    console.log("Site Chnaged", siteId);
    if (siteId) {
      getWorkOrders({ variables: { where: { siteId, billed: false } } });
    }
  }, [siteId]);
  return (
    <>
      <Header
        title="Facture"
        subtitle="Nouvelle Facture"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/invoices`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container ">
        <section className="section">
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Rechercher les Bons d'intervention" />
              <div className="w-full p-3">
                <label className="label">L'indentifiant du bon</label>
                <input className="input w-full" type="text" />
              </div>
              <div className="w-full p-3">
                <SiteInput form={form} />
              </div>
            </div>

            <div className="card mb-2">
              <CardHeader
                title="Liste des bons d'intervention"
                subtitle="Seuls les bons non facturés sont listés"
              />
              {data?.workOrders?.results?.map((workOrder) => (
                <div key={workOrder.id} className="w-full p-3">
                  {workOrder?.object}
                </div>
              ))}
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Détails" />
              {fake?.invoice?.result?.rows?.map((row) => (
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
                      <span className=" font-medium">{row.taxe} %</span>
                    </div>
                  </div>
                  <div className="w-full px-2 py-1 bg-slate-100 rounded">
                    <div className=" flex justify-between font-medium mt-2">
                      <span className=" font-medium">Montant TVA</span>
                      <span className=" font-medium">{row.taxPrice} € HT</span>
                    </div>

                    <div className=" flex justify-between font-medium mt-2">
                      <span className=" font-medium">Montant Estimatif</span>
                      <span className=" font-medium">
                        {row.totalPrice} € HT
                      </span>
                    </div>
                    <div className=" flex justify-between font-medium mt-2 pb-2">
                      <span className=" font-medium">Montant TTC</span>
                      <span className=" font-medium">
                        {row.totalPrice + row.taxPrice} € TTC
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 px-5 mb-5 bg-slate-100  py-6 rounded">
                <div className="mb-2 flex justify-between font-medium  text-lg ">
                  <span>Prix HT</span>
                  <span className=" font-medium">
                    {fake?.invoice?.result?.preTaxPrice}€
                  </span>
                </div>

                <div className=" flex justify-between font-medium text-lg  mt-2">
                  <span className=" font-medium">Montant TVA</span>
                  <span className=" font-medium">
                    {" "}
                    {fake?.invoice?.result?.taxPrice} €
                  </span>
                </div>

                <div className=" flex justify-between font-medium text-lg mt-2">
                  <span className=" font-medium">Montant TTC</span>
                  <span className=" font-medium">
                    {fake?.invoice?.result?.totalPrice} €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
