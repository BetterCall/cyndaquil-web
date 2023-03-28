import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazyEquipment } from "../hooks";

interface IProps {
  form: UseFormReturn<any, any>;
  disabled?: boolean;
}

export const EquipmentInput: React.FC<IProps> = ({
  form,
  disabled = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyEquipment();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsOpened(true);
        searchFn({
          variables: {
            where: {
              code: parseInt(search),
            },
          },
        });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const equipmentId = form.watch("equipmentId");
  console.log({ equipmentId });
  console.log(data);
  useEffect(
    () => {
      if (equipmentId && !hasBeenSelected) {
        const getInitialData = async () => {
          console.log("getInitialData");
          const { data: eData } = await await searchFn({
            variables: {
              where: {
                id: +equipmentId,
              },
            },
          });
          setSearch(
            `${eData?.equipment?.result?.code} ${eData?.equipment?.result?.category?.name}`
          );
          setSelected(true);
        };
        getInitialData();
      }
    },
    [] // Only call effect if debounced search term changes
  );

  return (
    <div className="flex flex-col">
      <p className="label">N° Equipement</p>
      <input
        className="input w-full "
        placeholder="Aucun Equipement en place"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
          form.setValue("equipmentId", null);
        }}
        value={search}
        disabled={disabled}
      />

      {isOpened && search !== "" && !hasBeenSelected && (
        <>
          <label className="text-sm font-bold">Résultats</label>
          <div className="input mb-3 ">
            {loading && <h2>Chargement ...</h2>}

            {called && data?.equipment?.error?.length && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.equipment?.result ? (
              <div
                className="mb-3 cursor-pointer"
                onClick={() => {
                  setIsOpened(false);
                  setSearch(
                    `${data?.equipment?.result?.code} ${data?.equipment?.result?.category?.name}`
                  );
                  setSelected(true);
                  // @ts-ignore
                  form.setValue("equipmentId", data?.equipment?.result?.id);
                }}
              >
                <h2 className="font-medium">
                  · {data?.equipment?.result?.category?.name}
                </h2>
                <div className="px-5 ">
                  <div className="font-light"></div>
                  <div className="font-light">
                    Marque : {data?.equipment?.result?.reference?.brand?.name}
                  </div>
                  <div className="font-light">
                    Code : {data?.equipment?.result.code}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};
