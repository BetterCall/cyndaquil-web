import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazyBrands } from "../hooks";

interface IBrandInput {
  form: UseFormReturn<any, any>;
}

export const BrandInput: React.FC<IBrandInput> = ({ form }) => {
  const [isOpened, setIsOpened] = useState(false);

  const [searchFn, { data, loading, called, fetchMore }] = useLazyBrands();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);

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
    if (!hasBeenSelected) form.setValue("brandId", null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="label">Marque</label>
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

            {called && data?.brands?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.brands?.results?.map((brand) => (
              <div
                className="mb-3 cursor-pointer"
                key={`brand-${brand.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(`${brand.name}`);
                  setSelected(true);
                  form.setValue("brandId", brand.id);
                }}
              >
                <h2 className="">· {brand.name}</h2>
              </div>
            ))}

            {data?.brands.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search,
                      },
                      limit: 2,
                      offset: data?.brands?.results?.length,
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
