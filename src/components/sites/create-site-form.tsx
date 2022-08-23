import React from "react";
import { useForm } from "react-hook-form";
import { useApolloClient, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { SiteForm } from ".";

import { CREATE_SITE, SITES } from "../../queries/sites.queries";

import { CreateSiteInput } from "../../__generated__/globalTypes";
import {
  CreateSiteMutation,
  CreateSiteMutationVariables,
} from "../../__generated__/CreateSiteMutation";

interface ICreateSiteForm {
  customerId?: number;
  onCompleted: any;
}

export const CreateSiteForm: React.FC<ICreateSiteForm> = ({
  customerId = null,
  onCompleted,
}) => {
  const client = useApolloClient();

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<CreateSiteInput>({
      mode: "all",
      defaultValues: {
        name: "",
        customerId: null,
        lat: 0,
        lng: 0,
      },
    });

  const [mutation, { loading }] = useMutation<
    CreateSiteMutation,
    CreateSiteMutationVariables
  >(CREATE_SITE);

  const submit = async () => {
    if (loading) return;
    const { customerId, lat, lng, ...input } = getValues();

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
      const queryResult = client.readQuery({
        query: SITES,
        variables: { limit: 10, offset: 0, where: {} },
      });

      console.log("query ", queryResult);
      client.writeQuery({
        query: SITES,
        variables: {
          limit: 10,
          offset: 0,
          where: {},
        },
        data: {
          sites: {
            ...(queryResult?.sites || {
              hasMore: true,
            }),
            results: [
              {
                __typename: "Site",
                id: data?.createSite?.id,
                customer: data?.createSite?.customer || null,
                customerId: data?.createSite?.customer?.id || null,
                lat: +lat,
                lng: +lng,
                ...input,
              },
              ...(queryResult?.sites?.results || []),
            ],
          },
        },
      });

      onCompleted(data?.createSite?.id);
    }
  };

  return (
    <SiteForm
      customerId={customerId ?? undefined}
      loading={loading}
      register={register}
      submit={handleSubmit(submit)}
      formState={formState}
      setValue={setValue}
    />
  );
};
