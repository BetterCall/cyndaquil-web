import { useLazyQuery, useQuery } from "@apollo/client";
import { EQUIPMENTS } from '../equipments.queries';
import { EquipmentsQuery, EquipmentsQueryVariables } from '../../../__generated__/EquipmentsQuery';

export const useEquipments = (variables: EquipmentsQueryVariables) => {
    return useQuery<EquipmentsQuery, EquipmentsQueryVariables>(EQUIPMENTS, { variables });
}

export const useLazyEquipments = () => {
    return useLazyQuery<EquipmentsQuery, EquipmentsQueryVariables>(EQUIPMENTS);
}