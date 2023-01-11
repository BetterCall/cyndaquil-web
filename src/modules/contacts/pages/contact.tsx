import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { CallsPreview } from "../../calls/components";
import { ContactDetails } from "../components";
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
        title={`${data?.contact?.result?.firstname} ${data?.contact?.result?.lastname} `}
        subtitle=""
      />
      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="Informations Générales" />
              <ContactDetails />
            </div>
          </div>

          <div className="right">
            <div className="card mb-2">
              <CardHeader title="Client" />
            </div>

            <div className="card">
              <CardHeader title="Site" />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="appels" />
              <CallsPreview contactId={+id!} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
