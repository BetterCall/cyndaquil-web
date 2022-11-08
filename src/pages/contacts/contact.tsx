import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader } from "../../components/cards";
import { Header } from "../../components/header";

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

  return (
    <>
      <Header title="Contact" subtitle="COntract" />
      <div className="main-container">
        <Card>
          <CardHeader title="Informations Générales" />
        </Card>
      </div>
    </>
  );
};
