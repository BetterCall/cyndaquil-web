import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CreateContactInput } from "../../__generated__/globalTypes";

import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from "../../__generated__/CreateContactMutation";
import { CREATE_CONTACT } from "../../queries/contacts.queries";
import { Card } from "../../components/cards";
import { FormHeader } from "../../components/form";
import { ContactForm } from "../../components/contacts";
import { parseSearchParams } from "../../helpers/clean-object";

export const CreateContact = () => {
  const [params] = useSearchParams();

  const form = useForm<CreateContactInput>({
    mode: "all",
    defaultValues: {
      ...parseSearchParams(params),
    },
  });

  const [mutation, { loading }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT);

  const submit = async () => {
    if (loading) return;
    const { customerId, siteId, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        input: {
          ...(customerId && { customerId }),
          ...(siteId && { siteId }),
          ...input,
        },
      },
    });

    if (data?.createContact.ok) {
      form.setValue("firstname", "");
      form.setValue("lastname", "");
      form.setValue("email", "");
      form.setValue("phone", "");
    }
  };

  return (
    <>
      <Header
        title="Liste des Contrats"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <Card>
          <FormHeader
            title="Informations Générales"
            subtitle="Ajouter un nouveau contact"
          />

          <ContactForm
            loading={loading}
            submit={submit}
            form={form}
            disabledFields={Object.keys(parseSearchParams(params))}
          />
        </Card>
      </div>
    </>
  );
};
