import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/cards";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { BenefitForm } from "../../components/benefits";
import { UPDATE_BENEFIT, BENEFIT } from "../../queries/benefits.queries";
import {
  BenefitQuery,
  BenefitQueryVariables,
} from "../../__generated__/BenefitQuery";
import {
  UpdateBenefitMutation,
  UpdateBenefitMutationVariables,
} from "../../__generated__/UpdateBenefitMutation";

type IUpdateBenefitParams = {
  categoryId: string;
  benefitId: string;
};

export const UpdateBenefit = () => {
  const client = useApolloClient();

  const { categoryId, benefitId } = useParams<IUpdateBenefitParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!categoryId || !benefitId) {
      navigate("/benefits");
    }
  }, []);

  const [mutation, { loading, error }] = useMutation<
    UpdateBenefitMutation,
    UpdateBenefitMutationVariables
  >(UPDATE_BENEFIT);

  const form = useForm({
    mode: "all",
  });

  const { data: qData } = useQuery<BenefitQuery, BenefitQueryVariables>(
    BENEFIT,
    { variables: { id: +benefitId! } }
  );

  useEffect(() => {
    if (qData) {
      form.setValue("name", qData.benefit?.result?.name);
      form.setValue("price", qData.benefit?.result?.price);
    }
  }, [qData]);

  const submit = async () => {
    if (loading) return;
    try {
      const input = form.getValues();
      console.log(input);
      const { data } = await mutation({
        variables: {
          id: +benefitId!,
          input: {
            ...input,
            price: parseFloat((input.price + "").replace(",", ".")),
          },
        },
      });
      console.log(data);
      if (!data?.updateBenefit?.ok) {
        alert("error");
      }

      client.writeFragment({
        id: `Benefit:${benefitId}`,
        fragment: gql`
          fragment UpdateedBenefit on Benefit {
            name
            price
          }
        `,
        data: {
          name: input.name,
          price: input.price,
        },
      });

      navigate(`/equipments/category/${categoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(error);

  return (
    <>
      <Header
        title="Modifier Offre"
        subtitle="Creer une nouvelle Offre"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/benefits`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <Card>
          <BenefitForm form={form} loading={loading} submit={submit} />
        </Card>
      </div>
    </>
  );
};
