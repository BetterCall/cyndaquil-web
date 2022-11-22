import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader } from "../../components/cards";
import { FormHeader } from "../../components/form";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { useBenefits } from "../../hooks/useBenefits";
import { CONTRACT } from "../../queries/contracts.queries";
import {
  ContractQuery,
  ContractQueryVariables,
} from "../../__generated__/ContractQuery";

type IContractParams = {
  id: string;
};

export const UpdateContract = () => {
  const { id } = useParams<IContractParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/contracts");
    }
  }, []);

  const { data } = useQuery<ContractQuery, ContractQueryVariables>(CONTRACT, {
    variables: {
      id: +id!,
    },
  });

  const [rows, setRows] = useState<any[]>([]);

  const { data: benefitData } = useBenefits({
    where: {},
  });

  useEffect(() => {
    console.log(data?.contract?.result?.rows);
    data?.contract?.result?.rows?.map((row) => {});
  }, [data]);
  useEffect(() => {
    console.log(benefitData);
  }, [benefitData]);

  return (
    <>
      <Header
        subtitle={`${data?.contract?.result?.customer.name}`}
        title={`${data?.contract?.result?.site?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-orders/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className=" p-4">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full b-4 md:mb-0">
              <Card>
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
              </Card>

              <Card>
                <CardHeader title="ROWS" />

                {data?.contract?.result?.rows?.map(
                  (row: any, index: number) => (
                    <div className=" ">
                      <div key={`row-${index}`} className="mt-4 px-4">
                        <div className="mb-2  flex justify-between border-b pb-2">
                          <div>
                            <div>{row.benefit.name}</div>
                            <div>
                              batiment{" "}
                              {row.emplacement.floor.entrance.building.name}
                            </div>
                          </div>
                          <span className=" font-medium">{row.price} € HT</span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </Card>
            </div>
            <div className="w-full xl:w-1/2  mb-4 md:mb-0">
              <Card>
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
              </Card>
            </div>
          </div>
        </section>

        <div className=""></div>
      </div>
    </>
  );
};
