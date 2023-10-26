import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import { CUSTOMERS } from "../customers.queries";
import {
  CustomersQuery,
  CustomersQueryVariables,
} from "../../../__generated__/CustomersQuery";
import { useLazyCustomer } from "../hooks/useCustomer";

interface ICustomerInput {
  form: UseFormReturn<any, any>;
  canSelectAddress?: boolean;
  disabled?: boolean;
  error?: string;
}

export const CustomerInput: React.FC<ICustomerInput> = ({
  form,
  canSelectAddress = false,
  disabled = false,
  error = null,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    CustomersQuery,
    CustomersQueryVariables
  >(CUSTOMERS);
  const [lazyCustomer] = useLazyCustomer();

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [hasBeenSelected, setSelected] = useState(false);

  const customerId = form.watch("customerId");

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: customerData } = await lazyCustomer({
        variables: { id: +id },
      });
      if (customerData?.customer?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(customerData?.customer?.result?.name);
        setSelectedCustomer(customerData?.customer?.result);
        form.setValue("customerId", id);
      }
    };

    if (customerId) {
      fetchData(customerId);
    } else {
      setSearch("");
      setSelectedCustomer(null);
    }
  }, [customerId]);

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
    if (!hasBeenSelected) form.setValue("customerId", null);
  }, [hasBeenSelected]);

  return (
    <div className="flex flex-col">
      <label className="label">Client</label>
      <input
        disabled={disabled}
        className="input mb-3"
        onChange={(e) => {
          setSearch(e.target.value);
          setSelected(false);
          form.setValue("customerId", null);
        }}
        value={displayedSearch}
      />
      {!customerId && error ? (
        <p className="error-message mb-2">{error}</p>
      ) : null}
      {isOpened && displayedSearch !== "" && !hasBeenSelected && (
        <>
          <label className="text-sm font-bold">Résultats</label>
          <div className="input mb-3 ">
            {loading && <h2>Chargement ...</h2>}

            {called && data?.customers?.results?.length == 0 && (
              <>
                <h2>Aucun resultat</h2>
              </>
            )}

            {data?.customers?.results?.map((customer) => (
              <div
                className="mb-3 cursor-pointer"
                key={`customer-${customer.id}`}
                onClick={() => {
                  setIsOpened(false);
                  setSearch(customer.name);
                  setSelected(true);
                  setSelectedCustomer(customer);
                  form.setValue("customerId", customer.id);
                }}
              >
                <h2>{customer.name}</h2>
              </div>
            ))}

            {data?.customers.hasMore && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fetchMore({
                    variables: {
                      where: {
                        search: displayedSearch,
                      },
                      limit: 2,
                      offset: data?.customers?.results?.length,
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

      {selectedCustomer && hasBeenSelected && canSelectAddress && (
        <div
          className="btn mt-2"
          onClick={() => {
            form.setValue("street", selectedCustomer.street);
            form.setValue("city", selectedCustomer.city);
            form.setValue("postal", selectedCustomer.postal);
            form.setValue("streetNumber", selectedCustomer.streetNumber);
            form.setValue("lat", selectedCustomer.lat);
            form.setValue("lng", selectedCustomer.lng);
          }}
        >
          Utiliser comme adresse
        </div>
      )}
    </div>
  );
};
