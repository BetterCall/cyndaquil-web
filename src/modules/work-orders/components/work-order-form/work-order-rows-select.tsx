import React, { useEffect } from "react";
import { EmptyList, Loading } from "../../../../components";
import { SelectBenefit } from "../../../benefits/components";
import { useLazyWorkOrderRows } from "../../../work-order-rows/hooks";

interface IProps {
  workOrderId: number;
  emplacementsSelected: any;
  toggleRow: any;
}

export const WorkOrderRowsSelect: React.FC<IProps> = ({
  workOrderId,
  emplacementsSelected,
  toggleRow,
}) => {
  const [getEmplacements, { data: eData, called, loading }] =
    useLazyWorkOrderRows();
  useEffect(() => {
    getEmplacements({ variables: { where: { workOrderId, done: false } } });
  }, [workOrderId]);

  if (loading) return <Loading />;
  if (eData?.workOrderRows?.results?.length === 0) {
    return <EmptyList text="Aucun Emplacement" />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left">
          <th className="padding-table font-medium "></th>
          <th className="padding-table font-medium ">Catégorie</th>
          <th className="padding-table font-medium text-center">Batiment</th>
          <th className="padding-table font-medium text-center">Entrée</th>
          <th className="padding-table font-medium text-center">Etage</th>
        </tr>
      </thead>
      <tbody>
        {eData?.workOrderRows.results?.map((row, index) => {
          const isSelected =
            emplacementsSelected.findIndex((r) => r.rowId === row.id) ?? -1;

          return (
            <>
              <tr
                key={`row-${row.id}`}
                className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
              >
                <td className="padding-table ">
                  <input
                    checked={isSelected !== -1}
                    type="checkbox"
                    className="mr-2 cursor-pointer "
                    onClick={() =>
                      toggleRow({
                        rowId: row.id,
                        emplacementId: row.emplacementId,
                        benefitId: row.benefitId,
                      })
                    }
                    id={`row-${row.id}`}
                  />
                </td>
                <td className="padding-table font-medium">
                  {row.emplacement.category?.name} {row.id}
                </td>

                <td className="padding-table font-medium text-center">
                  {row.emplacement.building}
                </td>
                <td className="padding-table font-medium text-center ">
                  {row.emplacement.entrance}
                </td>
                <td className="padding-table  font-medium text-center ">
                  {row.emplacement.floor}
                </td>
              </tr>
              <tr>
                <td colSpan={5} className={`padding-table`}>
                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full  ">
                        <p className="label">Service</p>
                        <SelectBenefit
                          disabled
                          setValue={(e) => {}}
                          value={row.benefitId!}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full ">
                        <p className="label">Entrée</p>
                        <input
                          className="input w-full"
                          type="text"
                          disabled
                          value={row.status}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
