import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazyContacts, useLazyContact } from "../hooks";

interface IContactInput {
  form: UseFormReturn<any, any>;
  disabled?: boolean;
  siteId?: number;
  customerId?: number;
  name?: string;
  label?: string;
}

export const ContactInput: React.FC<IContactInput> = ({
  form,
  disabled = false,
  siteId,
  customerId,
  name = "contactId",
  label = "Contact",
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyContacts();
  const [lazyContact] = useLazyContact();

  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: contactData } = await lazyContact({
        variables: { id: +id },
      });
      if (contactData?.contact?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(
          `${contactData?.contact?.result?.firstname} ${contactData?.contact?.result?.lastname}`
        );
        // setSelectedCustomer(userData?.user?.result);
        form.setValue(name, id);
      }
    };

    const contactId = form.getValues(name);
    if (contactId) {
      fetchData(contactId);
    }
  }, []);

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
              ...(siteId && { siteId }),
              ...(customerId && { customerId }),
            },
          },
        });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (!hasBeenSelected) form.setValue(name, null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <p className="label">{label} </p>
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
                  // @ts-ignore
                  form.setValue(name, contact.id);
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
                        ...(siteId && { siteId }),
                        ...(customerId && { customerId }),
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
