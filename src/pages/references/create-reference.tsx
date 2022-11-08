import React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { ReferenceForm } from "../../components/references";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { CREATE_REFERENCE } from "../../queries/references.queries";

import { CreateReferenceInput } from "../../__generated__/globalTypes";

import {
  CreateReferenceMutation,
  CreateReferenceMutationVariables,
} from "../../__generated__/CreateReferenceMutation";

export const CreateReference: React.FC = ({}) => {
  const form = useForm<CreateReferenceInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateReferenceMutation,
    CreateReferenceMutationVariables
  >(CREATE_REFERENCE);

  const submit = async () => {
    if (loading) return;
    const { categoryId, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        input: {
          categoryId: parseInt(categoryId + ""),
          ...input,
        },
      },
    });

    if (data?.createReference.ok) {
      form.setValue("name", "");
    }
  };

  return (
    <>
      <Header
        title="Nouvelle Référence"
        subtitle="Ajouter une nouvelle référence produit"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/references`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <ReferenceForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
