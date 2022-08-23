import React from 'react'
import { useQuery } from "@apollo/client";
import { EQUIPMENT_CATEGORIES } from '../queries/equipment-categories.queries';
import { EquipmentCategoriesQuery } from '../__generated__/EquipmentCategoriesQuery';


export const useEquipmentCategories = () => {
    return useQuery<EquipmentCategoriesQuery>(EQUIPMENT_CATEGORIES);
}