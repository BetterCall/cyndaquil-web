import { useQuery, useLazyQuery } from "@apollo/client";
import { EQUIPMENT } from '../equipments.queries';
import { EquipmentQuery, EquipmentQueryVariables } from '../../../__generated__/EquipmentQuery';
import { EquipmentInput } from "../../../__generated__/globalTypes";

export const useEquipment = (where: EquipmentInput) => {
    return useQuery<EquipmentQuery, EquipmentQueryVariables>(EQUIPMENT, { variables: { where } });
}

export const useLazyEquipment = () => {
    return useLazyQuery<
        EquipmentQuery,
        EquipmentQueryVariables
    >(EQUIPMENT);
}