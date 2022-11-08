import React from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { useMutation } from "@apollo/client";

import { CREATE_SITE } from "../../queries/sites.queries";

import { CreateSiteInput } from "../../__generated__/globalTypes";
import {
  CreateSiteMutation,
  CreateSiteMutationVariables,
} from "../../__generated__/CreateSiteMutation";
import { SiteForm } from "../../components/sites";

export const CreateSite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const form = useForm<CreateSiteInput>({
    mode: "all",
    defaultValues: {
      ...(customerId && { customerId: +customerId }),
    },
  });

  const [mutation, { loading }] = useMutation<
    CreateSiteMutation,
    CreateSiteMutationVariables
  >(CREATE_SITE);

  const submit = async () => {
    if (loading) return;
    const { customerId, lat, lng, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        input: {
          customerId: customerId ? +customerId : null,
          lat: +lat,
          lng: +lng,
          ...input,
        },
      },
    });

    if (data?.createSite.ok) {
    }
  };

  return (
    <>
      <Header
        title="Nouvel Immeuble"
        subtitle="Creer une nouvelle copropriété"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/sites`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SiteForm form={form} loading={loading} submit={submit} />
      </div>
    </>
  );
};
