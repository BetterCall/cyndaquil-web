import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { ContactDetails } from "../../contacts/components";
import { InvoicesPreview } from "../../invoices/components";
import { CreateUploadModal } from "../../uploads/modals";
import {
  GenerateFromContractBtn,
  WorkOrdersPreview,
} from "../../work-orders/components";

import { useContract } from "../hooks";

type IContractParams = {
  id: string;
};

export const Contract: React.FC = () => {
  const { id } = useParams<IContractParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/contracts");
    }
  }, []);

  const { data } = useContract(+id!);

  return (
    <>
      <Header
        title={`Contrat`}
        subtitle={`${data?.contract?.result?.customer.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-order/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section ">
          <div className=" element">
            <div className="card">
              <CardHeader
                title={data?.contract?.result?.customer?.name ?? ""}
              />

              <ContactDetails
                city={`${data?.contract?.result?.customer?.postal} ,${data?.contract?.result?.customer?.city}`}
                phone={data?.contract?.result?.customer?.phone}
                email={data?.contract?.result?.customer?.email}
              />
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title={data?.contract?.result?.site?.name ?? ""} />
              <ContactDetails
                city={`${data?.contract?.result?.site?.postal}, ${data?.contract?.result?.site?.city}`}
                phone={data?.contract?.result?.site?.name}
              />
            </div>
          </div>

          <div className="w-full mx-2 mb-4">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Contracts, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Contracts,
                      objectId: +id!,
                    }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>

          <div className=" element">
            <div className="card">
              <CardHeader title="Bon d'intervention" />
              <WorkOrdersPreview contractId={+id!} />
              <GenerateFromContractBtn contractId={+id!} />
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Facture" />
              <InvoicesPreview where={{ contractId: +id! }} />
            </div>
          </div>

          <div className="w-full mx-2 mb-4">
            <div className="card">
              <CardHeader title="Résumé" />
              <div className="mt-4 px-4">
                <div className="mb-2 flex justify-between">
                  <span>Nombre d'appareil</span>
                  <span className=" font-medium">
                    {data?.contract.result?.equipmentCount}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span>Montant HT</span>
                  <span className=" font-medium">
                    {data?.contract.result?.price} € HT
                  </span>
                </div>

                <div className="mb-2 flex justify-between border-b pb-2">
                  <span>Montant TVA </span>
                  <span className=" font-medium">
                    {data?.contract.result?.taxPrice} %
                  </span>
                </div>

                <div className=" flex justify-between font-medium text-lg mt-2">
                  <span className=" font-medium">Montant Estimatif</span>
                  <span className=" font-medium">
                    {(data?.contract.result?.taxPrice ?? 0) +
                      (data?.contract.result?.price ?? 0)}{" "}
                    € TTC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {data?.contract?.result?.rows?.map((row: any, index: number) => (
          <div key={`row-${index}`} className="w-full  md:flex ">
            <div className="w-full  mb-4 md:w-2/3  md:pr-2">
              <div className="card">
                <CardHeader title={row.benefit?.name} />

                <div className="mt-4 px-4 mb-5">
                  <div className="mb-2 flex justify-between">
                    <span>Quantité </span>
                    <span className=" font-medium">{row.price}</span>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <span>Prix Unitaire </span>
                    <span className=" font-medium">{row.price} € HT</span>
                  </div>

                  <div className="mb-2 flex justify-between border-b pb-2">
                    <span>Taux TVA </span>
                    <span className=" font-medium">{row.taxe} %</span>
                  </div>

                  <div className=" flex justify-between font-medium  mt-2">
                    <span className=" font-medium">Montant TVA</span>
                    <span className=" font-medium">{row.taxPrice} € HT</span>
                  </div>

                  <div className=" flex justify-between font-medium mt-2">
                    <span className=" font-medium">Montant Estimatif</span>
                    <span className=" font-medium">{row.totalPrice} € HT</span>
                  </div>
                  <div className=" flex justify-between font-medium text-lg mt-2">
                    <span className=" font-medium">Montant TTC</span>
                    <span className=" font-medium">
                      {row.totalPrice + row.taxPrice} € TTC
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full  mb-4 md:w-1/3 md:pl-2">
              <div className="card">
                <CardHeader title="Détails" />
                <table className="table-auto w-full ">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      <th className="padding-table font-medium text-left">
                        Batiment
                      </th>
                      <th className="padding-table font-medium text-center">
                        Entrée
                      </th>
                      <th className="padding-table font-medium text-right">
                        Etage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.emplacements?.map((e, index) => (
                      <tr
                        key={`emplacement-${e.emplacement.id}`}
                        className={`text-xs  ${index % 2 ? "" : "bg-gray-50"} `}
                      >
                        <td className="padding-table font-medium text-left">
                          {e.emplacement.building}
                        </td>
                        <td className="padding-table font-medium text-center">
                          {e.emplacement.entrance}
                        </td>
                        <td className="padding-table font-medium text-right">
                          {e.emplacement.floor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
