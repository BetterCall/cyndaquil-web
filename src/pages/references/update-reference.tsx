import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { UpdateReferenceInput } from "../../__generated__/globalTypes";
import { UPDATE_REFERENCE, REFERENCE } from "../../queries/references.queries";
import {
  ReferenceQuery,
  ReferenceQueryVariables,
} from "../../__generated__/ReferenceQuery";
import {
  UpdateReferenceMutation,
  UpdateReferenceMutationVariables,
} from "../../__generated__/UpdateReferenceMutation";
import { ReferenceForm } from "../../components/references";

type IUpdateReference = {
  id: string;
};

export const UpdateReference = () => {
  const { id } = useParams<IUpdateReference>();
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateReferenceInput>({
    mode: "all",
  });

  const { data } = useQuery<ReferenceQuery, ReferenceQueryVariables>(
    REFERENCE,
    {
      variables: {
        id: +id!,
      },
    }
  );

  useEffect(() => {
    if (data?.reference?.ok && data?.reference?.result) {
      const { result } = data?.reference;
      form.setValue("name", result.name);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateReferenceMutation,
    UpdateReferenceMutationVariables
  >(UPDATE_REFERENCE);

  const submit = async () => {
    if (loading) return;
    const { categoryId, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          categoryId: parseInt(categoryId + ""),
          ...input,
        },
      },
    });

    if (data?.updateReference.ok) {
      client.writeFragment({
        id: `Reference:${id}`,
        fragment: gql`
          fragment UpdateedReference on Reference {
            name
          }
        `,
        data: {
          name: input.name,
        },
      });
      navigate(`/references`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier la Référence"
        subtitle="Modifier les informations de cette référance produit"
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
