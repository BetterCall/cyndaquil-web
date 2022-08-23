import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { ContactForm } from "./contact-form";

import { CreateContactInput } from "../../__generated__/globalTypes";

import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from "../../__generated__/CreateContactMutation";
import { CREATE_CONTACT } from "../../queries/contacts.queries";
import { Card, CardHeader } from "../cards";
import { FormHeader } from "../form";

interface ICreateContactForm {
  siteId?: number;
  customerId?: number;
  onCompleted: any;
}

export const CreateContactForm: React.FC<ICreateContactForm> = ({
  onCompleted,
  siteId = null,
  customerId = null,
}) => {
  const { register, handleSubmit, setValue, getValues, formState } =
    useForm<CreateContactInput>({
      mode: "all",
      defaultValues: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        siteId,
        customerId,
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT);

  const submit = async () => {
    if (loading) return;
    const { customerId, siteId, ...input } = getValues();

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
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("email", "");
      setValue("phone", "");
      onCompleted({ id: data?.createContact?.id, ...input });
    }
  };

  return (
    <Card>
      <FormHeader
        title="Informations Générales"
        subtitle="Ajouter un nouveau contact"
      />

      <ContactForm
        customerId={customerId ?? undefined}
        siteId={siteId ?? undefined}
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
        setValue={setValue}
      />
    </Card>
  );
};
