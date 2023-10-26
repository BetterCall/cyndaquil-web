import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";

import { useLazyReference, useLazyReferences } from "../hooks";

interface IProps {
  form: UseFormReturn<any, any>;
  disabled?: boolean;
}

export const ReferenceInput: React.FC<IProps> = ({
  form,
  disabled = false,
}) => {
  const limit = 10;
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyReferences();
  const [fetchReference] = useLazyReference();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);
  const [selectedReference, setSelectedReference] = useState<any>(null);
  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsOpened(true);
        searchFn({
          variables: {
            limit,
            offset: 0,
            where: {
              search,
            },
          },
        });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const categoryId = form.watch("categoryId");
  console.log(data);
  useEffect(
    () => {
      console.log(categoryId);
      if (categoryId) {
        setIsOpened(true);
        searchFn({
          variables: {
            limit,
            offset: 0,
            where: {
              categoryId: +categoryId,
            },
          },
        });
        setSelectedReference(null);
        setSearch("");
        setIsOpened(true);
        setSelected(false);
      }
    },
    [categoryId] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (!hasBeenSelected) form.setValue("referenceId", null);
  }, [hasBeenSelected]);

  const referenceId = form.getValues("referenceId");

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: referenceData } = await fetchReference({
        variables: { id: +id },
      });
      if (referenceData?.reference?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(
          `${referenceData?.reference?.result?.brand?.name} - ${referenceData?.reference?.result?.name}`
        );
        setSelectedReference(referenceData?.reference?.result);
        form.setValue("referenceId", referenceData?.reference?.result?.id);
      }
    };

    if (referenceId) {
      console.log(referenceId);
      fetchData(referenceId);
    }
  }, [referenceId]);

  return (
    <div className="flex flex-col">
      <label className="label">Reference</label>
      <input
        disabled={disabled}
        className="input"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
        }}
        value={search}
      />

      {((isOpened && search !== "") ||
        (isOpened && categoryId && search !== "")) &&
        !hasBeenSelected && (
          <>
            <label className="text-sm font-bold">Résultats</label>
            <div className="input mb-3 ">
              {loading && <h2>Chargement ...</h2>}

              {called && data?.references?.results?.length == 0 && (
                <>
                  <h2>Aucun resultat</h2>
                </>
              )}

              {data?.references?.results?.map((reference) => (
                <div
                  className="mb-3 cursor-pointer"
                  key={`reference-${reference.id}`}
                  onClick={() => {
                    setIsOpened(false);
                    setSearch(reference.name);
                    setSelected(true);
                    form.setValue("referenceId", reference.id);
                    setSelectedReference(reference);
                  }}
                >
                  <h2>
                    {reference.brand?.name} - {reference.name}
                  </h2>
                </div>
              ))}

              {data?.references.hasMore && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    fetchMore({
                      variables: {
                        where: {
                          search,
                        },
                        limit,
                        offset: data?.references?.results?.length,
                      },
                    });
                  }}
                  disabled={loading}
                  className={`text-lg font-medium focus:outline-none text-white py-4  transition-colors ${
                    !loading
                      ? "bg-gray-700 hover:bg-gray-800"
                      : "bg-gray-300 pointer-events-none "
                  }`}
                >
                  {loading ? "Chargement" : "Plus de resultats"}{" "}
                </button>
              )}
            </div>
          </>
        )}
    </div>
  );
};
