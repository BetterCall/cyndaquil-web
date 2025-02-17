import { useQuery } from "@apollo/client";
import { ME_QUERY } from '../user.queries';
import { MeQuery } from '../../../__generated__/MeQuery';

export const useMe = () => {
    return useQuery<MeQuery>(ME_QUERY);
}
