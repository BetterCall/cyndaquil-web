import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce";
import { useLazyUser } from "../../hooks/useUser";
import { useLazyUsers } from "../../hooks/useUsers";

interface IUserInput {
  form: UseFormReturn<any, any>;
  inputName?: string;
  disabled?: boolean;
}

export const UserInput: React.FC<IUserInput> = ({
  form: { setValue, getValues },
  inputName = "userId",
  disabled = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyUsers();

  const [lazyUser] = useLazyUser();
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [hasBeenSelected, setSelected] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: userData } = await lazyUser({
        variables: { id: +id },
      });
      if (userData?.user?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(
          `${userData?.user?.result?.firstname} ${userData?.user?.result?.lastname}`
        );
        setSelectedCustomer(userData?.user?.result);
        setValue(inputName, id);
      }
    };

    const userId = getValues(inputName);
    if (userId) {
      fetchData(userId);
    }
  }, []);

  const [displayedSearch, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(displayedSearch, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsOpened(true);
        searchFn({
          variables: {
            limit: 2,
            offset: 0,
            where: {
              search: displayedSearch,
            },
          },
        });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (!hasBeenSelected) setValue(inputName, null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="label">Utilisateur</label>
      <input
        disabled={disabled}
        className="input mb-3"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
          setValue(inputName, null);
        }}
        value={displayedSearch}
      />

      {isOpened && displayedSearch !== "" && !hasBeenSelected && (
        <>
          <label className="text-sm font-bold">Résultats</label>
          <div className="input mb-3 ">
            {loading && <h2>Chargement ...</h2>}

            {called && data?.users?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.users?.results?.map((user) => (
              <div
                className="mb-3 cursor-pointer"
                key={`user-${user.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(`${user.firstname} ${user.lastname} `);
                  setSelected(true);
                  setSelectedCustomer(user);
                  setValue(inputName, user.id);
                }}
              >
                <h2>
                  {user.firstname} {user.lastname} 
                </h2>
              </div>
            ))}

            {data?.users.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search: displayedSearch,
                      },
                      limit: 2,
                      offset: data?.users?.results?.length,
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
