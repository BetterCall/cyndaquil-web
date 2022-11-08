import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { CONTACTS } from "../../queries/contacts.queries";

import {
  ContactsQuery,
  ContactsQueryVariables,
} from "../../__generated__/ContactsQuery";
import { UseFormReturn } from "react-hook-form";

interface IContactInput {
  form: UseFormReturn<any, any>;
  disabled?: boolean;
}

export const ContactInput: React.FC<IContactInput> = ({
  form,
  disabled = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    ContactsQuery,
    ContactsQueryVariables
  >(CONTACTS);

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
    if (!hasBeenSelected) form.setValue("contactId", null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold">Contact</label>
      <input
        className="input mb-3"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
        }}
        value={search}
        disabled={disabled}
      />

      {isOpened && search !== "" && !hasBeenSelected && (
        <>
          <label className="text-sm font-bold">Résultats</label>
          <div className="input mb-3 ">
            {loading && <h2>Chargement ...</h2>}

            {called && data?.contacts?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.contacts?.results?.map((contact) => (
              <div
                className="mb-3 cursor-pointer"
                key={`contact-${contact.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(`${contact.firstname} ${contact.lastname} `);
                  setSelected(true);
                  form.setValue("contactId", contact.id);
                }}
              >
                <h2 className="">
                  · {contact.firstname} {contact.lastname}
                </h2>
                <div className="px-5 border-b-2 ">
                  <div className="font-light">tel : {contact.phone}</div>
                  <div className="font-light">email : {contact.email}</div>
                </div>
              </div>
            ))}

            {data?.contacts.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search,
                      },
                      limit: 2,
                      offset: data?.contacts?.results?.length,
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
