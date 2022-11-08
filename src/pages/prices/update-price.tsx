import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/cards";
import { FormHeader } from "../../components/form";
import { Header } from "../../components/header";
import { DashboardIcon } from "../../components/icons";
import { Loading } from "../../components/loading";
import { PriceForm } from "../../components/prices";
import { cleanObject, parseParams } from "../../helpers/clean-object";
import { UPDATE_PRICE_RULE, PRICE_RULE } from "../../queries/prices.queries";
import { UpdateBenefitMutationVariables } from "../../__generated__/UpdateBenefitMutation";
import { UpdatePriceRuleMutation } from "../../__generated__/UpdatePriceRuleMutation";
import { UpdatePriceRuleInput } from "../../__generated__/globalTypes";
import {
  PriceRuleQuery,
  PriceRuleQueryVariables,
} from "../../__generated__/PriceRuleQuery";

type ICustomerParams = {
  id: string;
};

export const UpdatePrice = () => {
  const { id } = useParams<ICustomerParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/price-rules");
    }
  }, []);

  const form = useForm<UpdatePriceRuleInput>();

  const { data, refetch } = useQuery<PriceRuleQuery, PriceRuleQueryVariables>(
    PRICE_RULE,
    {
      variables: {
        id: +id!,
      },
    }
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(data);
    if (data?.priceRule) {
      const {
        priceRule: { result },
      } = data;
      form.setValue("amount", result?.amount);
      form.setValue("type", result?.type);
      form.setValue("description", result?.description);
      form.setValue("benefitId", result?.benefit?.id);
      form.setValue("categoryId", result?.category?.id);
      form.setValue("customerId", result?.customer?.id);

      setLoaded(true);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdatePriceRuleMutation,
    UpdateBenefitMutationVariables
  >(UPDATE_PRICE_RULE);
  const submit = async () => {
    if (loading) return;

    const values = form.getValues();
    const cleaned = cleanObject(values);
    const parsed = parseParams(cleaned);

    try {
      const { data: mData } = await mutation({
        variables: {
          id: +id!,
          input: parsed,
        },
      });

      if (mData?.updatePriceRule?.ok) {
        await refetch();
        navigate("/prices");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Modification Règle de tarification"
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
        {loaded ? (
          <Card>
            <FormHeader
              title="Informations Générales"
              subtitle="Ajouter un nouveau contact"
            />

            <PriceForm
              loading={loading}
              submit={submit}
              form={form}
              disabledFields={["categoryId", "benefitId", "customerId"]}
            />
          </Card>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};
