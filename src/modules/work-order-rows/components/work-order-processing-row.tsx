import { gql, useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { WorkOrderRowStatus } from "../../../__generated__/globalTypes";
import { EquipmentInput } from "../../equipments/components";

import { useUpdateWorkOrderRow } from "../hooks/useUpdateWorkOrderRow";
import { WorkOrderRowStatusSelect } from "./work-order-row-status-select";

type DefaultValues = {
  done: boolean;
  comment: string;
  status?: WorkOrderRowStatus;
  emplacementCode?: number;
};

interface IProps {
  id: number;
  defaultValues: DefaultValues;
  informations: IInformations;
}

interface IInformations {
  equipmentCode: string;
  building: string;
  entrance: string;
  floor: string;
  category: string;
  benefit: string;
}

export const WorkOrderProcessingRow: React.FC<IProps> = ({
  id,
  defaultValues,
  informations,
}) => {
  const client = useApolloClient();
  const { form, submit, loading } = useUpdateWorkOrderRow({
    id,
    defaultValues,
    onCompleted: () => {
      try {
        const { status, comment } = form.getValues();
        const { data } = client.readFragment({
          id: `WorkOrderRow:${id}`,
          fragment: gql`
            fragment WorkOrderRowProcessed on WorkOrderRow {
              done
              comment
            }
          `,
        });
        console.log("data ", data);

        client.writeFragment({
          id: `WorkOrderRow:${id}`,
          fragment: gql`
            fragment WorkOrderRowProcessed on WorkOrderRow {
              status
              comment
            }
          `,
          data: {
            status,
            comment,
          },
        });
      } catch (error) {}

      toast.success("Le travail a été modifié avec succès");
    },
    onError: (message) => toast.error(message),
  });

  const status = form.watch("status");

  useEffect(() => {
    if (status !== WorkOrderRowStatus.Replaced) {
      form.setValue("equipmentId", null);
    }
  }, [status]);

  const update = async () => {
    const { equipmentId } = form.getValues();
    if (status === WorkOrderRowStatus.Replaced && equipmentId === null) {
      toast.error(
        "Vous devez saisir le code de l'équipement nouvellement installé"
      );
    } else {
      await submit();
    }
  };

  return (
    <div
      className={`input w-full border-0 border-l-4 p-3 mt-5
      ${
        status === WorkOrderRowStatus.Ok ? "border-blue-500" : "border-red-500"
      }`}
    >
      <section className="section">
        <div className="element">
          <div className="w-full mt-3">
            <p className="label">N° Emplacement</p>
            <input
              {...form.register("emplacementCode")}
              className="input w-full"
              type="text"
            />
          </div>
          <div className="flex ">
            <div className="w-1/2 mr-1 ">
              <div className="w-full mt-3">
                <p className="label">Batiment</p>
                <input
                  className="input w-full"
                  type="text"
                  value={informations.building}
                  disabled
                />
              </div>
            </div>
            <div className="w-1/2 ml-1">
              <div className="w-full mt-3">
                <p className="label">Entrée</p>
                <input
                  className="input w-full"
                  type="text"
                  value={informations.entrance ?? ""}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-1/2 mr-1 ">
              <div className="w-full mt-3">
                <p className="label">Etage</p>
                <input
                  className="input w-full"
                  type="text"
                  value={informations?.floor ?? ""}
                  disabled
                />
              </div>
            </div>
            <div className="w-1/2 ml-1">
              <div className="w-full mt-3">
                <p className="label">Type d'équipement</p>
                <input
                  className="input w-full"
                  type="text"
                  value={informations.category}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="element">
          <div className="flex ">
            <div className="w-1/2 mr-1 ">
              <div className="w-full mt-3">
                <EquipmentInput form={form} />
              </div>
            </div>
            <div className="w-1/2 ml-1">
              <div className="w-full mt-3">
                <p className="label">Service </p>
                <input
                  className="input w-full"
                  type="text"
                  value={informations.benefit}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-3">
            <p className="label">Commentaire</p>
            <textarea
              className={`input w-full  `}
              placeholder="Commentaire"
              {...form.register("comment")}
            />
          </div>

          <div className="w-full mt-3">
            <WorkOrderRowStatusSelect form={form} />
            {status === WorkOrderRowStatus.Replaced ? (
              <div className="w-full mt-3">
                <EquipmentInput form={form} />
              </div>
            ) : null}
          </div>

          <div className="w-full mt-3">
            <button className="btn w-full" onClick={() => update()}>
              {loading ? "Chargement ... " : "Valider"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
