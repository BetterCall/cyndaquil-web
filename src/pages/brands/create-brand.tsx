import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CREATE_BRAND } from "../../queries/brands.queries";

import { CreateBrandInput } from "../../__generated__/globalTypes";
import {
  CreateBrandMutation,
  CreateBrandMutationVariables,
} from "../../__generated__/CreateBrandMutation";
import { SendIcon } from "../../components/icons";
import { Header } from "../../components/header";
import { BrandForm } from "../../components/brands";

export const CreateBrand: React.FC = () => {
  const form = useForm<CreateBrandInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateBrandMutation,
    CreateBrandMutationVariables
  >(CREATE_BRAND);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();
    const { data } = await mutation({
      variables: {
        input: {
          ...input,
        },
      },
    });

    if (data?.createBrand.ok) {
      form.setValue("name", "");
    }
  };

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
