import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { BrandForm } from "../../components/brands";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { BRAND, UPDATE_BRAND } from "../../queries/brands.queries";
import {
  BrandQuery,
  BrandQueryVariables,
} from "../../__generated__/BrandQuery";
import {
  UpdateBrandMutation,
  UpdateBrandMutationVariables,
} from "../../__generated__/UpdateBrandMutation";
import { UpdateBrandInput } from "../../__generated__/globalTypes";

type IUpdateBrand = {
  id: string;
};

export const UpdateBrand = () => {
  const { id } = useParams<IUpdateBrand>();
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateBrandInput>({
    mode: "all",
  });

  const { data } = useQuery<BrandQuery, BrandQueryVariables>(BRAND, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.brand?.ok && data?.brand?.result) {
      const input = form.getValues();
      const { result } = data?.brand;

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateBrandMutation,
    UpdateBrandMutationVariables
  >(UPDATE_BRAND);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.updateBrand.ok) {
      client.writeFragment({
        id: `Brand:${id}`,
        fragment: gql`
          fragment UpdateedBrand on Brand {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      navigate(`/brands`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Nouvelle Marque"
        subtitle="Creer une nouvelle copropriété"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/brands`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <BrandForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
