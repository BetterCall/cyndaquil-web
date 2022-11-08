import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { SiteForm } from "../../components/sites";

import { UPDATE_SITE, SITE } from "../../queries/sites.queries";

import {
  UpdateSiteMutation,
  UpdateSiteMutationVariables,
} from "../../__generated__/UpdateSiteMutation";
import { UpdateSiteInput } from "../../__generated__/globalTypes";
import { SiteQuery, SiteQueryVariables } from "../../__generated__/SiteQuery";

type IUpdateSite = {
  id: string;
};

export const UpdateSite = () => {
  const { id } = useParams<IUpdateSite>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateSiteInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<SiteQuery, SiteQueryVariables>(SITE, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.site?.ok && data?.site?.result) {
      const { result } = data?.site;
      form.setValue("name", result.name);
      form.setValue("customerId", result.customer?.id);
      form.setValue("streetNumber", result.streetNumber);
      form.setValue("street", result.street);

      form.setValue("postal", result.postal);
      form.setValue("city", result.city);

      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateSiteMutation,
    UpdateSiteMutationVariables
  >(UPDATE_SITE);

  const submit = async () => {
    if (loading) return;
    const { customerId, lat, lng, ...input } = form.getValues();

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

    if (data?.updateSite.ok) {
      await refetch();
      navigate(`/sites`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier le site"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/sites/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SiteForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
