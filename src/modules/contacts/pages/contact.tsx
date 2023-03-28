import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { DemandsPreview } from "../../demands/components";
import { useContact } from "../hooks";

type IContactParams = {
  id: string;
};

export const Contact = () => {
  const { id } = useParams<IContactParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/contacts");
    }
  }, []);

  const { data, loading } = useContact(+id!);

  if (loading) return <Loading />;

  return (
    <>
      <Header
        title="Contact"
        subtitle={`${data?.contact?.result?.firstname} ${data?.contact?.result?.lastname} `}
      />
      <div className="main-container">
        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations Générales" />

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Nom</p>
                    <input
                      className="input w-full"
                      value={data?.contact?.result?.firstname}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Prénom</p>
                    <input
                      className="input w-full"
                      value={data?.contact?.result?.lastname}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mt-3">
                <p className="label">Email</p>
                <input
                  className="input w-full"
                  disabled
                  value={data?.contact?.result?.email ?? "Email Non Renseignée"}
                />
              </div>
              <div className="w-full mt-3">
                <p className="label">Téléphone</p>
                <input
                  className="input w-full"
                  disabled
                  value={
                    data?.contact?.result?.phone ?? "Téléphone Non Renseigné"
                  }
                />
              </div>

              <div className="w-full mt-3">
                <p className="label">Informations Supplémentaires</p>
                <textarea
                  className="input w-full"
                  disabled
                  value={data?.contact?.result?.additionalInformations ?? ""}
                />
              </div>
            </div>
          </div>

          <div className="element">
            {data?.contact?.result?.customerId ? (
              <div className="card mb-2">
                <CardHeader title="Client" />
                <div className="flex ">
                  <div className="w-1/2 mr-1 ">
                    <div className="w-full mt-3">
                      <p className="label">N°</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.customer?.streetNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-1/2 ml-1">
                    <div className="w-full mt-3">
                      <p className="label">Complément</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.customer?.streetNumber}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full mt-3">
                  <p className="label">Adresse</p>
                  <input
                    className="input w-full"
                    disabled
                    value={
                      data?.contact?.result?.customer?.street ??
                      "Aucune Adresse renseignée"
                    }
                  />
                </div>
                <div className="flex ">
                  <div className="w-1/2 mr-1 ">
                    <div className="w-full mt-3">
                      <p className="label">Ville</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.customer?.city}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-1/2 ml-1">
                    <div className="w-full mt-3">
                      <p className="label">Code Postal</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.customer?.postal}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {data?.contact?.result?.siteId ? (
              <div className="card mb-2">
                <CardHeader title="Immeuble" />
                <div className="flex ">
                  <div className="w-1/2 mr-1 ">
                    <div className="w-full mt-3">
                      <p className="label">N°</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.site?.streetNumber}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-1/2 ml-1">
                    <div className="w-full mt-3">
                      <p className="label">Complément</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.site?.streetNumber}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full mt-3">
                  <p className="label">Adresse</p>
                  <input
                    className="input w-full"
                    disabled
                    value={
                      data?.contact?.result?.site?.street ??
                      "Aucune Adresse renseignée"
                    }
                  />
                </div>
                <div className="flex ">
                  <div className="w-1/2 mr-1 ">
                    <div className="w-full mt-3">
                      <p className="label">Ville</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.site?.city}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="w-1/2 ml-1">
                    <div className="w-full mt-3">
                      <p className="label">Code Postal</p>
                      <input
                        className="input w-full"
                        value={data?.contact?.result?.site?.postal}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="appels" />
              <DemandsPreview contactId={+id!} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
