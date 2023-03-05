import { useLazyQuery, useQuery } from "@apollo/client";
import { CONTROLS } from '../controls.queries';
import { ControlsQuery, ControlsQueryVariables } from '../../../__generated__/ControlsQuery';

export const useControls = (variables: ControlsQueryVariables) => {
    return useQuery<ControlsQuery, ControlsQueryVariables>(CONTROLS, { variables });
}

export const useLazyControls = () => {
    return useLazyQuery<
        ControlsQuery,
        ControlsQueryVariables
    >(CONTROLS);
}