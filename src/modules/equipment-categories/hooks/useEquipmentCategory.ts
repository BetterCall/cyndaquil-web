import { useQuery } from "@apollo/client";
import { EQUIPMENT_CATEGORY } from '../equipment-categories.queries';
import { EquipmentCategoryQuery, EquipmentCategoryQueryVariables } from '../../../__generated__/EquipmentCategoryQuery';

export const useEquipmentCategory = (id: number) => {
    return useQuery<EquipmentCategoryQuery, EquipmentCategoryQueryVariables>(EQUIPMENT_CATEGORY, { variables: { id } });
}

