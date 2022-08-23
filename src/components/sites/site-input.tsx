import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useLazySite } from "../../hooks/useSite";
import { SITES } from "../../queries/sites.queries";
import {
  SitesQuery,
  SitesQueryVariables,
} from "../../__generated__/SitesQuery";
import { CreateSiteForm } from "./create-site-form";

interface ISiteInput {
  setValue: any;
  defaultValue?: number;
  canCreate?: boolean;
  canSelectAddress?: boolean;
}

export const SiteInput: React.FC<ISiteInput> = ({
  setValue,
  defaultValue,
  canSelectAddress = true,
  canCreate = false,
}) => {
  const client = useApolloClient();

  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    SitesQuery,
    SitesQueryVariables
  >(SITES);
  const [lazySite] = useLazySite();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(!!defaultValue);
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
    if (!hasBeenSelected) setValue("siteId", null);
  }, [hasBeenSelected]);

  useEffect(() => {
    const fetchData = async () => {
      if (defaultValue) {
        const { data: siteData } = await lazySite({
          variables: { id: +defaultValue },
        });
        console.log(siteData);
        if (siteData?.site?.result) {
          setIsOpened(false);
          setSelected(true);
          setSearch(siteData?.site?.result?.name);
          setSelectedSite(siteData?.site?.result);
          setValue("siteId", siteData?.site?.result?.id);
        }
      }
    };

    fetchData();
  }, []);

  const [create, setCreate] = useState(false);
  const onCompleted = (id: number) => {
    const site = client.readFragment({
      id: `Site:${id}`, // The value of the to-do item's cache ID
      fragment: gql`
        fragment SiteCreated on Site {
          id
          name
          city
        }
      `,
    });

    setIsOpened(false);
    setSearch(`${site.name} - ${site.city}`);
    setSelected(true);
    setValue("siteId", id);

    setCreate(false);
  };

  if (create) {
    return (
      <>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCreate(false);
          }}
          className={`mt-5 text-lg w-full font-medium focus:outline-none text-white py-4  transition-colors  bg-gray-700 hover:bg-gray-800  `}
        >
          annuler
        </button>
        <CreateSiteForm onCompleted={onCompleted} />
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <label className="label">Site</label>
      <input
        className="input mb-3"
        onChange={(e) => {
          console.log(e.target.value);
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
                  setValue("siteId", site.id);
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

            {canCreate && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCreate(true);
                }}
                className={`mt-2 text-lg w-full font-medium focus:outline-none text-white py-4  transition-colors  bg-cyan-500 hover:bg-cyan-600  `}
              >
                Nouveau Site
              </button>
            )}
          </div>
        </>
      )}

      {selectedSite && canSelectAddress && (
        <div
          onClick={() => {
            setValue("street", selectedSite.street);
            setValue("city", selectedSite.city);
            setValue("postal", selectedSite.postal);
            setValue("streetNumber", selectedSite.streetNumber);
            setValue("lat", selectedSite.lat);
            setValue("lng", selectedSite.lng);
          }}
        >
          set address
        </div>
      )}
    </div>
  );
};
