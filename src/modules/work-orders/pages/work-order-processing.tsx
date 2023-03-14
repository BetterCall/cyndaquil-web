import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { Loading } from "../../../components";
import { WorkOrderProcessingRow } from "../../work-order-rows/components";
import { useWorkOrderRows } from "../../work-order-rows/hooks";
import { useWorkOrder } from "../hooks";
import moment from "moment";
import { WorkOrderProcessingBtn } from "../components";

export const WorkOrderProcessing: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/work-orders");
    }
  }, []);

  const workOrder = useWorkOrder(+id!);

  const { data, loading, error } = useWorkOrderRows({
    where: {
      workOrderId: +id!,
    },
  });
  console.log("error ", error);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title={`${workOrder?.data?.workOrder?.result?.site?.name}`}
        subtitle={`Intervention du ${moment(
          workOrder?.data?.workOrder?.result?.date
        ).format("dddd LL")}`}
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
        <div className="card">
          <CardHeader title="Liste des Equipements" />

          <div className="mb-7">
            {data?.workOrderRows?.results?.map((row) => (
              <div className={`${row.done ? "bg-green-500" : ""} mt-4`}>
                <WorkOrderProcessingRow
                  id={row.id}
                  informations={{
                    equipmentCode: row.emplacement?.equipment?.code
                      ? row.emplacement?.equipment?.code + ""
                      : "Aucun Equipement sur Place",
                    building: row.emplacement?.building,
                    entrance: row.emplacement?.entrance ?? "",
                    floor: row.emplacement?.floor + "",
                    category: row.emplacement?.category?.name ?? "",
                    benefit: row.benefit?.name,
                  }}
                  defaultValues={{
                    // @ts-ignore
                    emplacementCode: row.emplacement?.code,
                    done: row.done,
                    comment: row.comment ?? "",
                    status: row.status,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="w-full">
            <WorkOrderProcessingBtn workOrderId={+id!} />
          </div>
        </div>
      </div>
    </>
  );
};
