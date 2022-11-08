import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { CustomerCategoryForm } from "../../components/customer-categories";

import {
  CUSTOMER_CATEGORY,
  UPDATE_CUSTOMER_CATEGORY,
} from "../../queries/customer-categories.queries";

import {
  CustomerCategoryQuery,
  CustomerCategoryQueryVariables,
} from "../../__generated__/CustomerCategoryQuery";
import {
  UpdateCustomerCategoryMutation,
  UpdateCustomerCategoryMutationVariables,
} from "../../__generated__/UpdateCustomerCategoryMutation";
import { UpdateCustomerCategoryInput } from "../../__generated__/globalTypes";
import { SendIcon } from "../../components/icons";
import { Header } from "../../components/header";

type IUpdateCustomerCategory = {
  id: string;
};

export const UpdateCustomerCategory = () => {
  const { id } = useParams<IUpdateCustomerCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateCustomerCategoryInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<
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
      form.setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading, error }] = useMutation<
    UpdateCustomerCategoryMutation,
    UpdateCustomerCategoryMutationVariables
  >(UPDATE_CUSTOMER_CATEGORY);
  const submit = async () => {
    if (loading) return;
    const input = form.getValues();
    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.updateCustomerCategory.ok) {
      await refetch();
      navigate(`/customers/categories`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
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
        <CustomerCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
