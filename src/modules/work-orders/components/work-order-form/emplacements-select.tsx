import React, { useEffect } from "react";
import { SelectBenefit } from "../../../benefits/components";
import { useLazyEmplacements } from "../../../emplacements/hooks";

interface IProps {
  siteId: number;
  emplacementsSelected: any;
  toggleRow: any;
  setRowBenefit: any;
  value?: any;
}

export const EmplacementsSelect: React.FC<IProps> = ({
  siteId,
  emplacementsSelected,
  toggleRow,
  setRowBenefit,
  value,
}) => {
  const [getEmplacements, { data: eData, called }] = useLazyEmplacements();
  useEffect(() => {
    getEmplacements({ variables: { where: { siteId } } });
  }, [siteId]);

  console.log(siteId, eData);
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
        {eData?.emplacements.results?.map((emplacement, index) => {
          const isSelected =
            emplacementsSelected.findIndex(
              (row) => row.emplacementId === emplacement.id
            ) ?? -1;

          return (
            <>
              <tr
                key={`emplacement-${emplacement.id}`}
                className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
              >
                <td className="padding-table ">
                  <input
                    checked={isSelected !== -1}
                    type="checkbox"
                    className="mr-2 cursor-pointer "
                    onClick={() => toggleRow({ emplacementId: emplacement.id })}
                    id={`emplacement-${emplacement.id}`}
                  />
                </td>
                <td className="padding-table font-medium">
                  {emplacement.category?.name} {emplacement.id}
                </td>

                <td className="padding-table font-medium text-center">
                  {emplacement.building}
                </td>
                <td className="padding-table font-medium text-center ">
                  {emplacement.entrance}
                </td>
                <td className="padding-table  font-medium text-center ">
                  {emplacement.floor}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={5}
                  className={`padding-table ${index % 2 ? "" : "bg-gray-50"}  `}
                >
                  {isSelected !== -1 && emplacement.categoryId ? (
                    <SelectBenefit
                      value={emplacementsSelected[isSelected].benefitId ?? -1}
                      setValue={(e) => {
                        const benefitId = parseInt(e.target.value);
                        setRowBenefit(emplacement.id, benefitId);
                      }}
                      categoryId={emplacement.categoryId!}
                    />
                  ) : null}
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
