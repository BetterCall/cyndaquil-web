import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CustomerForm } from "../../components/customers";

import { CREATE_CUSTOMER } from "../../queries/customers.queries";

import { CreateCustomerInput } from "../../__generated__/globalTypes";

import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
} from "../../__generated__/CreateCustomerMutation";
import { useNavigate } from "react-router-dom";

export const CreateCustomer: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<CreateCustomerInput>({
    mode: "all",
    defaultValues: {},
  });

  const [mutation, { loading }] = useMutation<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >(CREATE_CUSTOMER, {});

  const submit = async () => {
    if (loading) return;
    const { categoryId, lat, lng, ...input } = form.getValues();

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

    if (data?.createCustomer.ok && data?.createCustomer.id) {
      navigate(`/customers/${data?.createCustomer?.id}`);
    }
  };

  return (
    <>
      <Header
        title="Nouveau Client"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
