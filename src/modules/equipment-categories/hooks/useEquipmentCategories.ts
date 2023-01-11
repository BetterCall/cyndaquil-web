import { useLazyQuery, useQuery } from "@apollo/client";
import { EQUIPMENT_CATEGORIES } from '../equipment-categories.queries';
import { EquipmentCategoriesQuery } from '../../../__generated__/EquipmentCategoriesQuery';

export const useEquipmentCategories = () => {
    return useQuery<EquipmentCategoriesQuery>(EQUIPMENT_CATEGORIES);
}

export const useLazyEquipmentCategories = () => {
    return useLazyQuery<EquipmentCategoriesQuery>(EQUIPMENT_CATEGORIES);
}