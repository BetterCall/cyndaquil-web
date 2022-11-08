import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce";
import { useLazySite } from "../../hooks/useSite";
import { SITES } from "../../queries/sites.queries";
import {
  SitesQuery,
  SitesQueryVariables,
} from "../../__generated__/SitesQuery";

interface ISiteInput {
  form: UseFormReturn<any, any>;
  canSelectAddress?: boolean;
  disabled?: boolean;
}

export const SiteInput: React.FC<ISiteInput> = ({
  form,
  canSelectAddress = false,
  disabled = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    SitesQuery,
    SitesQueryVariables
  >(SITES);
  const [lazySite] = useLazySite();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
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
    if (!hasBeenSelected) form.setValue("siteId", null);
  }, [hasBeenSelected]);

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: siteData } = await lazySite({
        variables: { id: +id },
      });
      if (siteData?.site?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(siteData?.site?.result?.name);
        setSelectedSite(siteData?.site?.result);
        form.setValue("siteId", siteData?.site?.result?.id);
      }
    };

    const id = form.getValues("siteId");
    if (id) {
      fetchData(id);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <label className="label">Site</label>
      <input
        disabled={disabled}
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

            {called && data?.sites?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.sites?.results?.map((site) => (
              <div
                className="mb-3 cursor-pointer"
                key={`site-${site.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(site.name);
                  setSelected(true);
                  form.setValue("siteId", site.id);
                  setSelectedSite(site);
                }}
              >
                <h2>
                  {site.name} {site.city} 
                </h2>
              </div>
            ))}

            {data?.sites.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search,
                      },
                      limit: 2,
                      offset: data?.sites?.results?.length,
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

      {selectedSite && canSelectAddress && (
        <div
          onClick={() => {
            form.setValue("street", selectedSite.street);
            form.setValue("city", selectedSite.city);
            form.setValue("postal", selectedSite.postal);
            form.setValue("streetNumber", selectedSite.streetNumber);
            form.setValue("lat", selectedSite.lat);
            form.setValue("lng", selectedSite.lng);
          }}
        >
          set address
        </div>
      )}
    </div>
  );
};
