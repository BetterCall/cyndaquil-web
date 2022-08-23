import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { CustomerForm } from "../../components/customers";

import { useCustomerCategories } from "../../hooks/useCustomerCategories";

import { CUSTOMER, EDIT_CUSTOMER } from "../../queries/customers.queries";
import {
  CustomerQuery,
  CustomerQueryVariables,
} from "../../__generated__/CustomerQuery";
import {
  EditCustomerMutation,
  EditCustomerMutationVariables,
} from "../../__generated__/EditCustomerMutation";
import { EditCustomerInput } from "../../__generated__/globalTypes";
import { DashboardLayout } from "../../layouts/dashboard.layout";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

type IEditCustomer = {
  id: string;
};

export const EditCustomer = () => {
  const { id } = useParams<IEditCustomer>();
  const client = useApolloClient();
  const navigate = useNavigate();
  const { data: categoriesData } = useCustomerCategories();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditCustomerInput>({
      mode: "all",
      defaultValues: {
        name: null,
        email: null,
        phone: null,
        categoryId: null,
      },
    });

  const { data } = useQuery<CustomerQuery, CustomerQueryVariables>(CUSTOMER, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.customer?.ok && data?.customer?.result) {
      const { result } = data?.customer;
      setValue("name", result.name);
      setValue("email", result.email);
      setValue("phone", result.phone);
      setValue("categoryId", result.category?.id);

      setValue("streetNumber", result.streetNumber);
      setValue("street", result.street);
      setValue("city", result.city);
      setValue("postal", result.postal);
      setValue("lat", result.lat);
      setValue("lng", result.lng);
    }
  });

  const [mutation, { loading }] = useMutation<
    EditCustomerMutation,
    EditCustomerMutationVariables
  >(EDIT_CUSTOMER);

  const submit = async () => {
    if (loading) return;
    const { categoryId, ...input } = getValues();

    console.log("input ", input);

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          categoryId: +categoryId!,
          ...input,
        },
      },
    });

    if (data?.editCustomer.ok) {
      client.writeFragment({
        id: `Customer:${id}`,
        fragment: gql`
          fragment EditedCustomer on Customer {
            name
            email
            phone
            category
          }
        `,
        data: {
          email: input.email,
          name: input.name,
          phone: input.phone,
          category: categoriesData?.customerCategories?.results?.find(
            (o) => o.id === +categoryId!
          ),
        },
      });
      navigate(`/customers`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <DashboardLayout>
      <Header
        title={data?.customer?.result?.name ?? ""}
        subtitle="Modifier les informations du client"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/customers/${data?.customer?.result?.id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerForm
          loading={loading}
          register={register}
          submit={handleSubmit(submit)}
          formState={formState}
        />
      </div>
    </DashboardLayout>
  );
};
