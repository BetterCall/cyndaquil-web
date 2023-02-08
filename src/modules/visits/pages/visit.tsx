import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useVisit } from "../hooks";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { ContactDetails } from "../../contacts/components";
import { Loading } from "../../../components";

export const Visit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        title={`${data?.visit?.result?.object}`}
        subtitle={`${data?.visit?.result?.customer?.name}`}
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
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Etat" />
              {data?.visit?.result?.status}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Date" />
              {data?.visit?.result?.date}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Heure" />
              {data?.visit?.result?.start}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-4">
            <div className="card">
              <CardHeader title="Tech" />
              {data?.visit?.result?.user?.firstname}
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
                <p className="text-sm">{data?.visit?.result?.description}</p>
              </div>
              <ContactDetails
                customer={data?.visit?.result?.customer?.name}
                customerId={data?.visit?.result?.customer?.id}
              />
            </div>

            <div className="card mb-2 font-bold">
              <CardHeader title="Adresse" />
              {data?.visit?.result?.customer?.streetNumber}{" "}
              {data?.visit?.result?.customer?.street} <br />
              {data?.visit?.result?.customer?.postal},{" "}
              {data?.visit?.result?.customer?.city}
            </div>
          </div>
          <div className="right"></div>
        </section>
      </div>
    </>
  );
};
