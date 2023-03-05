import { useQuery } from "@apollo/client";
import { CONTROL } from '../controls.queries';
import { ControlQuery, ControlQueryVariables } from '../../../__generated__/ControlQuery';

export const useControl = (id: number) => {
    return useQuery<ControlQuery, ControlQueryVariables>(CONTROL, { variables: { id } });
}

