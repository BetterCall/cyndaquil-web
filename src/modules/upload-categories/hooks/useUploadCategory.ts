import { useQuery } from "@apollo/client";
import { UPLOAD_CATEGORY } from '../upload-categories.queries';
import { UploadCategoryQuery, UploadCategoryQueryVariables } from '../../../__generated__/UploadCategoryQuery';

export const useUploadCategory = (id: number) => {
    return useQuery<UploadCategoryQuery, UploadCategoryQueryVariables>(UPLOAD_CATEGORY, { variables: { id } });
}

