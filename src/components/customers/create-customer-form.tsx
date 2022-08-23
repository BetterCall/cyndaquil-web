import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";

import { CustomerForm } from "../../components/customers";

import { useCustomerCategories } from "../../hooks/useCustomerCategories";

import { CREATE_CUSTOMER, CUSTOMERS } from "../../queries/customers.queries";

import { CreateCustomerInput } from "../../__generated__/globalTypes";

import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
} from "../../__generated__/CreateCustomerMutation";
import { DashboardLayout } from "../../layouts/dashboard.layout";

interface ICreateCustomerForm {
  onCompleted: any;
}

export const CreateCustomerForm: React.FC<ICreateCustomerForm> = ({
  onCompleted,
}) => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const { data: categoriesData } = useCustomerCategories();

  const { register, handleSubmit, getValues, formState } =
    useForm<CreateCustomerInput>({
      mode: "all",
      defaultValues: {
        name: "",
        email: "",
        phone: "",
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >(CREATE_CUSTOMER, {});

  const submit = async () => {
    if (loading) return;
    const { categoryId, lat, lng, ...input } = getValues();

    const { data } = await mutation({
      variables: {
        input: {
          categoryId: +categoryId,
          lat: +lat,
          lng: +lng,
          ...input,
        },
      },
    });

    if (data?.createCustomer.ok) {
      const queryResult = client.readQuery({
        query: CUSTOMERS,
        variables: { limit: 10, offset: 0 },
      });
      client.writeQuery({
        query: CUSTOMERS,
        variables: {
          limit: 10,
          offset: 0,
        },
        data: {
          customers: {
            ...(queryResult.customers || {
              hasMore: true,
            }),
            results: [
              {
                __typename: "Customer",
                id: data?.createCustomer?.id,
                category: categoriesData?.customerCategories?.results?.find(
                  (o) => o.id === +categoryId
                ),
                lat: +lat,
                lng: +lng,
                ...input,
              },
              ...(queryResult.customers.results || []),
            ],
          },
        },
      });
      onCompleted(data?.createCustomer?.id);
    }
  };

  return (
    <CustomerForm
      loading={loading}
      register={register}
      submit={handleSubmit(submit)}
      formState={formState}
    />
  );
};
