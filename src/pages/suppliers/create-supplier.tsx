import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CreateSupplierInput } from "../../__generated__/globalTypes";
import {
  CreateSupplierMutation,
  CreateSupplierMutationVariables,
} from "../../__generated__/CreateSupplierMutation";
import { CREATE_SUPPLIER } from "../../queries/suppliers.queries";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { SupplierForm } from "../../components/suppliers";

export const CreateSupplier: React.FC = () => {
  const form = useForm<CreateSupplierInput>({
    mode: "all",
  });

  const [mutation, { loading }] = useMutation<
    CreateSupplierMutation,
    CreateSupplierMutationVariables
  >(CREATE_SUPPLIER);

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

    if (data?.createSupplier.ok) {
      form.setValue("name", "");
    }
  };

  return (
    <>
      <Header
        title="Nouveau Fournisseur"
        subtitle="Ajouter un nouveau fournisseur"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/suppliers`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SupplierForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
