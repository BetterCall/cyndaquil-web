import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import Card from "antd/lib/card/Card";
import React from "react";
import { CREATE_EMPLACEMENT } from "../../queries/emplacements.queries";
import { EQUIPMENT_CATEGORIES } from "../../queries/equipment-categories.queries";
import {
  CreateEmplacementMutation,
  CreateEmplacementMutationVariables,
} from "../../__generated__/CreateEmplacementMutation";
import {
  EquipmentCategoriesQuery,
  EquipmentCategoriesQuery_equipmentCategories_results,
} from "../../__generated__/EquipmentCategoriesQuery";

interface ICreateEmplacement {
  floorId: number;
}

export const CreateEmplacement: React.FC<ICreateEmplacement> = ({
  floorId,
}) => {
  const client = useApolloClient();
  const { data: categoryData } =
    useQuery<EquipmentCategoriesQuery>(EQUIPMENT_CATEGORIES);

  const [mutation, { loading }] = useMutation<
    CreateEmplacementMutation,
    CreateEmplacementMutationVariables
  >(CREATE_EMPLACEMENT);

  const create = async (
    category: EquipmentCategoriesQuery_equipmentCategories_results
  ) => {
    if (loading) return;

    const { data } = await mutation({
      variables: {
        input: {
          informations: "",
          floorId,
          categoryId: category.id,
        },
      },
    });

    if (data?.createEmplacement.ok) {
      const floor = client.readFragment({
        id: `Floor:${floorId}`, // The value of the to-do item's cache ID
        fragment: gql`
          fragment MyFloor${floorId} on Floor {
            id
            emplacements {
              id
              category {
                id
                name
              }
            }
          }
        `,
      });

      client.writeFragment({
        id: `Floor:${floorId}`,
        fragment: gql`
          fragment UpdateedFloor on Floor {
            emplacements
          }
        `,
        data: {
          emplacements: [
            ...floor.emplacements,
            {
              __typename: "Emplacement",
              id: data?.createEmplacement?.id,
              category,
            },
          ],
        },
      });
    }
  };

  return (
    <Card>
      <div className=" ">
        {categoryData?.equipmentCategories?.results?.map((category) => (
          <div
            className="  cursor-pointer p-2 flex  items-center  "
            onClick={() => create(category)}
          >
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6413 9.65837C10.5396 9.61788 10.4308 9.59783 10.3213 9.59937C10.2118 9.60091 10.1036 9.624 10.003 9.66734C9.90243 9.71067 9.81135 9.7734 9.73499 9.85193C9.65864 9.93046 9.5985 10.0233 9.55801 10.125C9.51752 10.2268 9.49747 10.3356 9.49901 10.4451C9.50054 10.5546 9.52364 10.6628 9.56697 10.7634C9.61031 10.864 9.67303 10.955 9.75156 11.0314C9.8301 11.1077 9.9229 11.1679 10.0247 11.2084C11.2413 11.6917 11.9997 12.4417 11.9997 13.1667C11.9997 14.35 9.94967 15.6667 6.99967 15.6667C4.04967 15.6667 1.99967 14.35 1.99967 13.1667C1.99967 12.4417 2.75801 11.6917 3.97467 11.2084C4.18022 11.1266 4.34486 10.9665 4.43237 10.7634C4.51989 10.5602 4.52312 10.3306 4.44134 10.125C4.35957 9.91949 4.19949 9.75486 3.99632 9.66734C3.79316 9.57982 3.56355 9.5766 3.35801 9.65837C1.46634 10.4084 0.333008 11.7167 0.333008 13.1667C0.333008 15.5 3.25801 17.3334 6.99967 17.3334C10.7413 17.3334 13.6663 15.5 13.6663 13.1667C13.6663 11.7167 12.533 10.4084 10.6413 9.65837ZM6.16634 7.2167V13.1667C6.16634 13.3877 6.25414 13.5997 6.41042 13.756C6.5667 13.9122 6.77866 14 6.99967 14C7.22069 14 7.43265 13.9122 7.58893 13.756C7.74521 13.5997 7.83301 13.3877 7.83301 13.1667V7.2167C8.61856 7.01388 9.30316 6.53151 9.75851 5.86003C10.2139 5.18855 10.4087 4.37405 10.3064 3.5692C10.2042 2.76436 9.81196 2.02443 9.2032 1.4881C8.59445 0.951778 7.81098 0.655884 6.99967 0.655884C6.18836 0.655884 5.4049 0.951778 4.79615 1.4881C4.18739 2.02443 3.79514 2.76436 3.69291 3.5692C3.59068 4.37405 3.7855 5.18855 4.24084 5.86003C4.69618 6.53151 5.38079 7.01388 6.16634 7.2167ZM6.99967 2.33337C7.32931 2.33337 7.65154 2.43112 7.92562 2.61425C8.19971 2.79739 8.41333 3.05769 8.53947 3.36223C8.66562 3.66677 8.69862 4.00189 8.63432 4.32519C8.57001 4.64849 8.41127 4.94546 8.17818 5.17855C7.9451 5.41164 7.64813 5.57037 7.32482 5.63468C7.00152 5.69899 6.66641 5.66598 6.36187 5.53984C6.05732 5.41369 5.79703 5.20007 5.61389 4.92599C5.43076 4.65191 5.33301 4.32967 5.33301 4.00004C5.33301 3.55801 5.5086 3.13409 5.82116 2.82153C6.13372 2.50896 6.55765 2.33337 6.99967 2.33337Z"
                fill="#C2C9D2"
              ></path>
            </svg>
            <span className="ml-1 text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
