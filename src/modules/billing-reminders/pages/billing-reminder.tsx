import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";

import { useBillingReminder } from "../hooks";

type IBillingReminderParams = {
  id: string;
};

export const BillingReminder: React.FC = () => {
  const { id } = useParams<IBillingReminderParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/invoices");
    }
  }, []);

  const { data, error } = useBillingReminder(+id!);
  console.log("error ", error);
  console.log("data ", data);
  return (
    <>
      <Header
        title={`Relance`}
        subtitle={`Facture N°${data?.billingReminder?.result?.id}`}
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
                  value={data?.billingReminder?.result?.site?.name ?? ""}
                />
              </div>

              {/* <div className="flex ">
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
              </div> */}
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
                  value={data?.billingReminder?.result?.customer?.name ?? ""}
                />
              </div>

              {/* <div className="flex ">
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
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
