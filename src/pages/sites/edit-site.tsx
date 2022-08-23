import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { SiteForm } from "../../components/sites";

import { EDIT_SITE, SITE } from "../../queries/sites.queries";

import {
  EditSiteMutation,
  EditSiteMutationVariables,
} from "../../__generated__/EditSiteMutation";
import { EditSiteInput } from "../../__generated__/globalTypes";
import { SiteQuery, SiteQueryVariables } from "../../__generated__/SiteQuery";

type IEditSite = {
  id: string;
};

export const EditSite = () => {
  const { id } = useParams<IEditSite>();
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { register, handleSubmit, getValues, setValue, formState } =
    useForm<EditSiteInput>({
      mode: "all",
      defaultValues: {
        name: null,
        customerId: null,
      },
    });

  const { data } = useQuery<SiteQuery, SiteQueryVariables>(SITE, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.site?.ok && data?.site?.result) {
      const { result } = data?.site;
      setValue("name", result.name);
      setValue("customerId", result.customer?.id);
      setValue("streetNumber", result.streetNumber);
      setValue("street", result.street);

      setValue("postal", result.postal);
      setValue("city", result.city);

      setValue("lat", result.lat);
      setValue("lng", result.lng);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    EditSiteMutation,
    EditSiteMutationVariables
  >(EDIT_SITE);

  const submit = async () => {
    if (loading) return;
    const { customerId, lat, lng, ...input } = getValues();
    console.log({
      customerId: customerId ? +customerId : null,
      ...input,
    });

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          customerId: customerId ? +customerId : null,
          lat: +lat!,
          lng: +lng!,
          ...input,
        },
      },
    });

    console.log("datra", data);

    if (data?.editSite.ok) {
      client.writeFragment({
        id: `Site:${id}`,
        fragment: gql`
          fragment EditedSite on Site {
            name
            customerId
            customer
            name
            lat
            lng
            number
            street
            postal
            city
          }
        `,
        data: {
          name: input.name,
          customerId: data?.editSite?.customer?.id,
          customer: data?.editSite?.customer,
          lat: +lat!,
          lng: +lng!,
          ...input,
        },
      });
      navigate(`/sites`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="mt-5 flex flex-col justify-center items-center px-5">
      <h4 className="font-semibold text-2xl mb-3">Edit Customer</h4>
      <SiteForm
        loading={loading}
        register={register}
        submit={handleSubmit(submit)}
        formState={formState}
        setValue={setValue}
        customerId={+id!}
      />
    </div>
  );
};
