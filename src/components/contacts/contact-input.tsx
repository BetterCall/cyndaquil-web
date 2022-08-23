import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { CONTACTS } from "../../queries/contacts.queries";

import { CreateContactForm } from "./create-contact-form";

import {
  ContactsQuery,
  ContactsQueryVariables,
} from "../../__generated__/ContactsQuery";

interface IContactInput {
  setValue: any;
  defaultValue?: string;
  canCreate?: boolean;
}

export const ContactInput: React.FC<IContactInput> = ({
  setValue,
  defaultValue,
  canCreate = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    ContactsQuery,
    ContactsQueryVariables
  >(CONTACTS);

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
    if (!hasBeenSelected) setValue("contactId", null);
  }, [hasBeenSelected]);

  const [create, setCreate] = useState(false);
  const onCompleted = (contactCreated: any) => {
    console.log("contact ", contactCreated);

    setIsOpened(false);
    setSearch(`${contactCreated.firstname} ${contactCreated.lastname} `);
    setSelected(true);
    setValue("contactId", contactCreated.id);

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
        <CreateContactForm onCompleted={onCompleted} />
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold">Contact</label>
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
                  setValue("contactId", contact.id);
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

            {canCreate && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCreate(true);
                }}
                className={`mt-2 text-lg w-full font-medium focus:outline-none text-white py-4  transition-colors  bg-cyan-500 hover:bg-cyan-600  `}
              >
                Nouveau Contact
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
