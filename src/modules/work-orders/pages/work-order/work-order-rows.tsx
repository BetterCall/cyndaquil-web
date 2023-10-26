import React from "react";
import { EmptyList, Loading } from "../../../../components";
import { useWorkOrderRows } from "../../../work-order-rows/hooks";

interface IProps {
  workOrderId: number;
}

export const WorkOrderRows: React.FC<IProps> = ({ workOrderId }) => {
  const { data, loading } = useWorkOrderRows({ where: { workOrderId } });

  console.log(data);
  if (loading) {
    return <Loading />;
  }

  if (data?.workOrderRows?.error) {
    return <EmptyList text="Error" />;
  }

  if (data?.workOrderRows?.results?.length === 0) {
    return <EmptyList text="Aucun element a afficher" />;
  }

  return (
    <div>
      {data?.workOrderRows?.results?.map((row) => (
        <div className={`${row.done ? "bg-green-500" : ""} mt-4`}>
          <div className="flex ">
            <div className="w-1/2 mr-1 ">
              <div className="w-full mt-3">
                <p className="label">Batiment</p>
                <input
                  className="input w-full"
                  type="text"
                  value={row.emplacement.building ?? ""}
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
                  value={row.emplacement.entrance ?? ""}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex ">
            <div className="w-1/2 mr-1">
              <div className="w-full mt-3">
                <p className="label">Etage</p>
                <input
                  className="input w-full"
                  type="text"
                  value={row.emplacement.floor ?? ""}
                  disabled
                />
              </div>
            </div>

            <div className="w-1/2 ml-1 ">
              <div className="w-full mt-3">
                <p className="label">N° Emplacement</p>
                <input
                  className="input w-full"
                  type="text"
                  value={row.emplacement.code ?? "Aucun Code assigné"}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex ">
            <div className="w-1/2 mr-1 ">
              <div className="w-full mt-3">
                <p className="label">Catégorie</p>
                <input
                  className="input w-full"
                  type="text"
                  value={row.emplacement.category?.name ?? ""}
                  disabled
                />
              </div>
            </div>
            <div className="w-1/2 ml-1">
              <div className="w-full mt-3">
                <p className="label">Service</p>
                <input
                  className="input w-full"
                  type="text"
                  value={row.benefit?.name ?? ""}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-3">
            <p className="label">Etat</p>
            <input className="input w-full" value={row.status} />
          </div>

          <div className="w-full flex justify-center mt-3">
            <div className="h-1 w-full bg-red-500 lg:w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
