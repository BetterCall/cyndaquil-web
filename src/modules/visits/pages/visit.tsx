import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useVisit } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { ContactDetails } from "../../contacts/components";
import { Loading } from "../../../components";
import { useMe } from "../../users/hooks/useMe";
import { VisitReportForm } from "../components/visit-report-form";

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
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/visit/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
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
                <input
                  type="text"
                  className="input w-full "
                  disabled
                  value={data?.visit?.result?.status}
                />
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
        </section>
      </div>
    </>
  );
};
