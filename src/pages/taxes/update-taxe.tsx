import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { TaxeForm } from "../../components/taxes";
import { TAXE, UPDATE_TAXE } from "../../queries/taxes.queries";
import { UpdateTaxeInput } from "../../__generated__/globalTypes";
import { TaxeQuery, TaxeQueryVariables } from "../../__generated__/TaxeQuery";
import {
  UpdateTaxeMutation,
  UpdateTaxeMutationVariables,
} from "../../__generated__/UpdateTaxeMutation";

type IUpdateTaxe = {
  id: string;
};

export const UpdateTaxe = () => {
  const { id } = useParams<IUpdateTaxe>();
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateTaxeInput>({
    mode: "all",
  });

  const { data } = useQuery<TaxeQuery, TaxeQueryVariables>(TAXE, {
    variables: {
      id: +id!,
    },
  });

  useEffect(() => {
    if (data?.taxe?.ok && data?.taxe?.result) {
      const input = form.getValues();
      const { result } = data?.taxe;

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateTaxeMutation,
    UpdateTaxeMutationVariables
  >(UPDATE_TAXE);

  const submit = async () => {
    if (loading) return;
    const { name, value } = form.getValues();
    console.log({
      id: +id!,
      input: {
        name,
        value: parseFloat((value + "").replace(",", ".")),
      },
    });
    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          name,
          value: parseFloat((value + "").replace(",", ".")),
        },
      },
    });

    if (data?.updateTaxe.ok) {
      client.writeFragment({
        id: `Taxe:${id}`,
        fragment: gql`
          fragment UpdateedTaxe on Taxe {
            name
            value
          }
        `,
        data: {
          name,
          value: parseFloat((value + "").replace(",", ".")),
        },
      });
      navigate(`/taxes`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Nouvelle Taxe"
        subtitle="Creer une nouvelle taxe"
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
