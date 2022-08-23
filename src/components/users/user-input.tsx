import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SEARCH_USERS } from "../../queries/user.queries";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "../../__generated__/SearchUsersQuery";

interface IUserInput {
  setValue: any;
  defaultValue?: string;
}

export const UserInput: React.FC<IUserInput> = ({ setValue, defaultValue }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(SEARCH_USERS);

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
    if (!hasBeenSelected) setValue("userId", null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="label">Utilisateur</label>
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

            {called && data?.searchUsers?.results?.length == 0 && (
              <h2>Aucun resultat</h2>
            )}

            {data?.searchUsers?.results?.map((user) => (
              <div
                className="mb-3 cursor-pointer"
                key={`user-${user.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(`${user.firstname} ${user.lastname}`);
                  setSelected(true);
                  setValue("userId", user.id);
                }}
              >
                <h2>
                  {user.firstname} {user.lastname}
                </h2>
              </div>
            ))}
          </div>
        </>
      )}

      {data?.searchUsers.hasMore && (
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchMore({
              variables: {
                where: {
                  search,
                },
                limit: 2,
                offset: data?.searchUsers?.results?.length,
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
  );
};
