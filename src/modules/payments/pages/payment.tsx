import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { usePayment } from "../hooks";

type IPaymentParams = {
  id: string;
};

export const Payment: React.FC = () => {
  const { id } = useParams<IPaymentParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/payments");
    }
  }, []);

  const { data } = usePayment(+id!);

  return (
    <>
      <Header
        title={`Paiement`}
        subtitle={`${data?.payment?.result?.invoice?.site?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/payment/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section ">
          <div className=" element">
            <div className="card">
              <CardHeader title={data?.payment?.result?.customer?.name ?? ""} />
            </div>
          </div>

          <div className="element">
            <div className="card"></div>
          </div>
        </section>
        <section className="section">
          <div className=" element">
            <div className="card"></div>
          </div>
          <div className="element">
            <div className="card"></div>
          </div>
        </section>
        <section className="section">
          <div className="full">
            <div className="card"></div>
          </div>
        </section>
      </div>
    </>
  );
};
