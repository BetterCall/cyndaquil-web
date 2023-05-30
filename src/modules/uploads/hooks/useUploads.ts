import { useLazyQuery, useQuery } from "@apollo/client";
import { UPLOADS } from '../uploads.queries';
import { UploadsQuery, UploadsQueryVariables } from '../../../__generated__/UploadsQuery';

export const useUploads = (variables: UploadsQueryVariables, skip = false) => {
    return useQuery<UploadsQuery, UploadsQueryVariables>(UPLOADS, { variables, skip });
}

export const useLazyUploads = () => {
    return useLazyQuery<UploadsQuery, UploadsQueryVariables>(UPLOADS);
}