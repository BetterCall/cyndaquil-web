import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CREATE_TAXE } from "../../queries/taxes.queries";

import { SendIcon } from "../../components/icons";
import { Header } from "../../components/header";
import { TaxeForm } from "../../components/taxes";
import { CreateTaxeInput } from "../../__generated__/globalTypes";
import {
  CreateTaxeMutation,
  CreateTaxeMutationVariables,
} from "../../__generated__/CreateTaxeMutation";

export const CreateTaxe: React.FC = () => {
  const form = useForm<CreateTaxeInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateTaxeMutation,
    CreateTaxeMutationVariables
  >(CREATE_TAXE);

  const submit = async () => {
    if (loading) return;
    const { name, value } = form.getValues();
    console.log({ name, value });
    const { data } = await mutation({
      variables: {
        input: {
          name,
          value: parseFloat(value + ""),
        },
      },
    });

    if (data?.createTaxe.ok) {
      form.setValue("name", "");
      form.setValue("value", 0);
    }
  };

  return (
    <>
      <Header
        title="Nouvelle Taxe"
        subtitle="Creer une nouvelle Taxe"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxes`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <TaxeForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
