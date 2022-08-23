import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { CustomerCategoryForm } from "../../components/customer-categories";

import {
  CUSTOMER_CATEGORY,
  EDIT_CUSTOMER_CATEGORY,
} from "../../queries/customer-categories.queries";

import {
  CustomerCategoryQuery,
  CustomerCategoryQueryVariables,
} from "../../__generated__/CustomerCategoryQuery";
import {
  EditCustomerCategoryMutation,
  EditCustomerCategoryMutationVariables,
} from "../../__generated__/EditCustomerCategoryMutation";
import { EditCustomerCategoryInput } from "../../__generated__/globalTypes";
import { SendIcon } from "../../components/icons";
import { Header } from "../../components/header";
import { DashboardLayout } from "../../layouts/dashboard.layout";

type IEditCustomerCategory = {
  id: string;
};

export const EditCustomerCategory = () => {
  const { id } = useParams<IEditCustomerCategory>();
  const client = useApolloClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditCustomerCategoryInput>({
      mode: "all",
      defaultValues: {
        name: null,
      },
    });

  const { data } = useQuery<
    CustomerCategoryQuery,
    CustomerCategoryQueryVariables
  >(CUSTOMER_CATEGORY, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.customerCategory?.ok && data?.customerCategory?.result) {
      const { result } = data?.customerCategory;
      setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading, error }] = useMutation<
    EditCustomerCategoryMutation,
    EditCustomerCategoryMutationVariables
  >(EDIT_CUSTOMER_CATEGORY);
  console.log(error);
  const submit = async () => {
    if (loading) return;
    const input = getValues();
    console.log("input", input);

    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.editCustomerCategory.ok) {
      client.writeFragment({
        id: `CustomerCategory:${id}`,
        fragment: gql`
          fragment EditedCustomerCategory on CustomerCategory {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      navigate(`/customers/categories`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <DashboardLayout>
      <Header
        title="Modifier la Catégorie de client"
        subtitle="Modifier la Catégorie"
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
        <CustomerCategoryForm
          loading={loading}
          register={register}
          submit={handleSubmit(submit)}
          formState={formState}
        />
      </div>
    </DashboardLayout>
  );
};
