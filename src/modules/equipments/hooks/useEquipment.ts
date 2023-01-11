import { useQuery } from "@apollo/client";
import { EQUIPMENT } from '../equipments.queries';
import { EquipmentQuery, EquipmentQueryVariables } from '../../../__generated__/EquipmentQuery';

export const useEquipment = (id: number) => {
    return useQuery<EquipmentQuery, EquipmentQueryVariables>(EQUIPMENT, { variables: { id } });
}

