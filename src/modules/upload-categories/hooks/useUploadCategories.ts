import { useLazyQuery, useQuery } from "@apollo/client";
import { UPLOAD_CATEGORIES } from '../upload-categories.queries';
import { UploadCategoriesQuery } from '../../../__generated__/UploadCategoriesQuery';

export const useUploadCategories = () => {
    return useQuery<UploadCategoriesQuery>(UPLOAD_CATEGORIES);
}

export const useLazyUploadCategories = () => {
    return useLazyQuery<UploadCategoriesQuery>(UPLOAD_CATEGORIES);
}