import React, { useState, useEffect } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazySuppliers } from "../hooks";

interface ISupplierInput {
  setValue: any;
  defaultValue?: string;
}

export const SupplierInput: React.FC<ISupplierInput> = ({
  setValue,
  defaultValue,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazySuppliers();

  const [search, setSearch] = useState(defaultValue);
  const [hasBeenSelected, setSelected] = useState(!!defaultValue);

  const debouncedSearchTerm = useDebounce(search, 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsOpened(true);
        searchFn({
          variables: {
            limit: 2,
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

  useEffect(() => {
    if (!hasBeenSelected) setValue("supplierId", null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold">Marque</label>
      <input
        className="input mb-3"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
        }}
        value={search}
      />

      {isOpened && search !== "" && !hasBeenSelected && (
        <>
          <label className="text-sm font-bold">Résultats</label>
          <div className="input mb-3 ">
            {loading && <h2>Chargement ...</h2>}

            {called && data?.suppliers?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.suppliers?.results?.map((brand) => (
              <div
                className="mb-3 cursor-pointer"
                key={`brand-${brand.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(`${brand.name}`);
                  setSelected(true);
                  setValue("supplierId", brand.id);
                }}
              >
                <h2 className="">· {brand.name}</h2>
              </div>
            ))}

            {data?.suppliers.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search,
                      },
                      limit: 2,
                      offset: data?.suppliers?.results?.length,
                    },
                  });
                }}
                disabled={loading}
                className={`text-lg w-full font-medium focus:outline-none text-white py-4  transition-colors ${
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
