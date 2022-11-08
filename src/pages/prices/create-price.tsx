import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import { CreatePriceRuleInput } from "../../__generated__/globalTypes";

import { Card } from "../../components/cards";
import { FormHeader } from "../../components/form";
import {
  cleanObject,
  parseParams,
  parseSearchParams,
} from "../../helpers/clean-object";
import { PriceForm } from "../../components/prices";
import {
  CreatePriceRuleMutation,
  CreatePriceRuleMutationVariables,
} from "../../__generated__/CreatePriceRuleMutation";
import { CREATE_PRICE_RULE } from "../../queries/prices.queries";

export const CreatePrice = () => {
  const [params] = useSearchParams();

  const form = useForm<CreatePriceRuleInput>({
    mode: "all",
    defaultValues: {
      ...parseSearchParams(params),
    },
  });

  console.log(parseSearchParams(params));
  console.log(params);

  const [mutation, { loading }] = useMutation<
    CreatePriceRuleMutation,
    CreatePriceRuleMutationVariables
  >(CREATE_PRICE_RULE);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const cleaned = cleanObject(input);
    const parsed = parseParams(cleaned);

    console.log("input.categoryId", parsed.categoryId);
    if (parsed.categoryId) {
      delete parsed.benefitId;
    }

    const { data } = await mutation({
      variables: {
        input: { ...parsed },
      },
    });

    if (data?.createPriceRule.ok) {
    }
  };

  return (
    <>
      <Header
        title="Nouvelle Règle de tarification"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/prices",
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

          <PriceForm
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
