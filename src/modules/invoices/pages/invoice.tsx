import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { ContactDetails } from "../../contacts/components";
import { PaymentsPreview } from "../../payments/components";

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
  console.log(data);
  console.log(error);
  return (
    <>
      <Header
        subtitle={`${data?.invoice?.result?.id}`}
        title={` `}
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
          <div className=" left ">
            <div className="card">
              <CardHeader title={data?.invoice?.result?.id + "" ?? ""} />
              <ContactDetails city={`  `} phone={`  `} email={`  `} />
            </div>
          </div>

          <div className="right">
            <div className="card">
              <CardHeader title="Paiements" />
              <div className="text-sm text-gray-500 mb-2">
                Reste a payer : {data?.invoice?.result?.amountRemaining} € TTC
              </div>
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
        </section>

        <section className="section">
          <div className="full">
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
                    {data?.invoice?.result?.preTaxPrice}€
                  </span>
                </div>

                <div className=" flex justify-between font-medium text-lg  mt-2">
                  <span className=" font-medium">Montant TVA</span>
                  <span className=" font-medium">
                    {" "}
                    {data?.invoice?.result?.taxPrice} €
                  </span>
                </div>

                <div className=" flex justify-between font-medium text-lg mt-2">
                  <span className=" font-medium">Montant TTC</span>
                  <span className=" font-medium">
                    {data?.invoice?.result?.totalPrice} €
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
