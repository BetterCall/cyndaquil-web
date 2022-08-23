import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
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
import { FloorType } from "../../__generated__/globalTypes";

interface ICreateEmplacement {
  entranceId: number;
  floorId: number;
  type: FloorType;
}

export const CreateEmplacement: React.FC<ICreateEmplacement> = ({
  floorId,
  entranceId,
  type,
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

    console.log(data);

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

      console.log("floor 41", floor);

      client.writeFragment({
        id: `Floor:${floorId}`,
        fragment: gql`
          fragment EditedFloor on Floor {
            emplacements
          }
        `,
        data: {
          emplacements: [
            {
              __typename: "Emplacement",
              id: data?.createEmplacement?.id,
              category,
            },
            ...floor.emplacements,
          ],
        },
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="px-6  ">
        {loading && <div>Chargement</div>}
        {categoryData?.equipmentCategories?.results?.map((category) => (
          <div
            className="px-2 mt-2.5 bg-gray-400 cursor-pointer "
            onClick={() => create(category)}
          >
            + {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};
