import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoice } from "../hooks";

import { CardHeader } from "../../../components/cards";
import { FormHeader } from "../../../components/form";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

type IInvoiceParams = {
  id: string;
};

export const UpdateInvoice: React.FC = () => {
  const { id } = useParams<IInvoiceParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/invoices");
    }
  }, []);

  const { data } = useInvoice(+id!);

  return (
    <>
      <Header
        title={`Facture`}
        subtitle={"Mettre a jour la facture"}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/invoice/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className=" p-4">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full b-4 md:mb-0">
              <div className="card">
                <FormHeader subtitle="" title="Selection Rapide" />

                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      <th className="padding-table  font-medium text-left w-25">
                        Tous
                      </th>
                      <th className="padding-table  font-medium text-center">
                        Nombre
                      </th>
                      <th className="padding-table  font-medium text-center ">
                        Type
                      </th>
                      <th className="padding-table  font-medium text-center ">
                        Service
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="card">
                <CardHeader title="ROWS" />
              </div>
            </div>
            <div className="w-full xl:w-1/2  mb-4 md:mb-0">
              <div className="card">
                <CardHeader title="Total" />

                <div className=" ">
                  <div className="mt-4 px-4">
                    <div className="mb-2 flex justify-between">
                      <span>Nombre d'équipement</span>
                      <span>20</span>
                    </div>

                    <div className="mb-2  flex justify-between">
                      <span>Montant HT</span>
                      <span>xx € HT</span>
                    </div>
                    <div className="mb-2  flex justify-between border-b pb-2">
                      <span>Montant TVA</span>
                      <span className=" font-medium">xx € HT</span>
                    </div>

                    <div className=" flex justify-between font-medium text-lg mt-2">
                      <span className=" font-medium">Montant Estimatif</span>
                      <span className=" font-medium">xx € TTC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className=""></div>
      </div>
    </>
  );
};
