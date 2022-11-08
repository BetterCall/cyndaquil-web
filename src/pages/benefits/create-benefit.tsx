import { gql, useApolloClient, useMutation } from "@apollo/client";
import Card from "antd/lib/card/Card";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { BenefitForm } from "../../components/benefits";
import { CREATE_BENEFIT } from "../../queries/benefits.queries";
import {
  CreateBenefitMutation,
  CreateBenefitMutationVariables,
} from "../../__generated__/CreateBenefitMutation";
import { CreateBenefitInput } from "../../__generated__/globalTypes";

type ICreateBenefitParams = {
  categoryId: string;
};

export const CreateBenefit = () => {
  const client = useApolloClient();

  const { categoryId } = useParams<ICreateBenefitParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!categoryId) {
      navigate("/benefits");
    }
  }, []);

  const [mutation, { loading, error }] = useMutation<
    CreateBenefitMutation,
    CreateBenefitMutationVariables
  >(CREATE_BENEFIT);

  const form = useForm<CreateBenefitInput>({
    mode: "all",
    defaultValues: { categoryId: +categoryId! },
  });

  const submit = async () => {
    if (loading) return;
    try {
      const input = form.getValues();
      console.log(input);
      const { data } = await mutation({
        variables: {
          input: {
            ...input,
            price: parseFloat((input.price + "").replace(",", ".")),
          },
        },
      });
      console.log(data);
      if (!data?.createBenefit?.ok) {
        alert("error");
      }
      alert(data?.createBenefit?.id);

      const category = client.readFragment({
        id: `EquipmentCategory:${categoryId}`, // The value of the to-do item's cache ID
        fragment: gql`
          fragment EquipmentCategory on EquipmentCategory {
            id
            benefits {
              id
              name
              price
            }
          }
        `,
      });

      client.writeFragment({
        id: `EquipmentCategory:${categoryId}`,
        fragment: gql`
          fragment EquipmentCategory on EquipmentCategory {
            benefits
          }
        `,
        data: {
          benefits: [
            ...category.benefits,
            {
              __typename: "Benefit",
              id: data?.createBenefit?.id,
              name: input.name,
              price: input.price,
            },
          ],
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
        title="Nouveau Service"
        subtitle="Creer un nouveau service"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/benefices`,
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
