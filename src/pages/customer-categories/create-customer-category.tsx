import React from "react";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { CustomerCategoryForm } from "../../components/customer-categories/";

import {
  CREATE_CUSTOMER_CATEGORY,
  CUSTOMER_CATEGORIES,
} from "../../queries/customer-categories.queries";

import { CreateCustomerCategoryInput } from "../../__generated__/globalTypes";
import {
  CreateCustomerCategoryMutation,
  CreateCustomerCategoryMutationVariables,
} from "../../__generated__/CreateCustomerCategoryMutation";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

export const CreateCustomerCategory = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const form = useForm<CreateCustomerCategoryInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateCustomerCategoryMutation,
    CreateCustomerCategoryMutationVariables
  >(CREATE_CUSTOMER_CATEGORY);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        input,
      },
    });

    if (data?.createCustomerCategory.ok) {
      const queryResult = client.readQuery({
        query: CUSTOMER_CATEGORIES,
      });
      client.writeQuery({
        query: CUSTOMER_CATEGORIES,
        data: {
          customerCategories: {
            ...queryResult.customerCategories,
            results: [
              {
                __typename: "CustomerCategory",
                id: data?.createCustomerCategory?.id,
                ...input,
              },
              ,
              ...queryResult.customerCategories.results,
            ],
          },
        },
      });
      navigate(`/customers/categories`, {
        replace: true,
      });
    }
  };

  return (
    <>
      <Header
        title="Nouvelle Catégorie de client"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers/categories",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
