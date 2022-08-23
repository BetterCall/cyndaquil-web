import { gql, useApolloClient, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useLazyCustomer } from "../../hooks/useCustomer";
import { useDebounce } from "../../hooks/useDebounce";
import { CUSTOMERS } from "../../queries/customers.queries";
import {
  CustomersQuery,
  CustomersQueryVariables,
} from "../../__generated__/CustomersQuery";

import { CreateCustomerForm } from "./create-customer-form";

interface ICustomerInput {
  setValue: any;
  defaultValue?: number;
  canCreate?: boolean;
  canSelectAddress?: boolean;
}

export const CustomerInput: React.FC<ICustomerInput> = ({
  setValue,
  defaultValue,
  canCreate = false,
  canSelectAddress = true,
}) => {
  const client = useApolloClient();

  const [isOpened, setIsOpened] = useState(false);
  const [searchFn, { data, loading, called, fetchMore }] = useLazyQuery<
    CustomersQuery,
    CustomersQueryVariables
  >(CUSTOMERS);
  const [lazyCustomer] = useLazyCustomer();

  const [search, setSearch] = useState("");

  const [hasBeenSelected, setSelected] = useState(!!defaultValue);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
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
    const fetchData = async () => {
      if (defaultValue) {
        const { data: customerData } = await lazyCustomer({
          variables: { id: +defaultValue },
        });
        console.log(customerData);
        if (customerData?.customer?.result) {
          setIsOpened(false);
          setSelected(true);
          setSearch(customerData?.customer?.result?.name);
          setSelectedCustomer(customerData?.customer?.result);
          setValue("customerId", customerData?.customer?.result?.id);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!hasBeenSelected) setValue("customerId", null);
  }, [hasBeenSelected]);

  const [create, setCreate] = useState(false);
  const onCompleted = (id: number) => {
    const customer = client.readFragment({
      id: `Customer:${id}`, // The value of the to-do item's cache ID
      fragment: gql`
        fragment CustomerCreated on Customer {
          id
          name
        }
      `,
    });

    setIsOpened(false);
    setSearch(customer.name);
    setSelected(true);
    setValue("customerId", id);

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
        <CreateCustomerForm onCompleted={onCompleted} />
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <label className="label">Client</label>
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
                  setValue("customerId", customer.id);
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
                        search,
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

            {canCreate && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCreate(true);
                }}
                className={`mt-2 text-lg w-full font-medium focus:outline-none text-white py-4  transition-colors  bg-cyan-500 hover:bg-cyan-600  `}
              >
                Nouveau Client
              </button>
            )}
          </div>
        </>
      )}

      {selectedCustomer && canSelectAddress && (
        <div
          onClick={() => {
            setValue("street", selectedCustomer.street);
            setValue("city", selectedCustomer.city);
            setValue("postal", selectedCustomer.postal);
            setValue("streetNumber", selectedCustomer.streetNumber);
            setValue("lat", selectedCustomer.lat);
            setValue("lng", selectedCustomer.lng);
          }}
        >
          set address
        </div>
      )}
    </div>
  );
};
