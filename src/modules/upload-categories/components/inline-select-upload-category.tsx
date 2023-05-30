import React from "react";
import { useUploadCategories } from "../hooks";

interface IProps {
  form: any;
}

export const InlineSelectUploadCategory: React.FC<IProps> = ({ form }) => {
  const { data } = useUploadCategories();
  return (
    <div className="w-full flex flex-wrap mt-2 ">
      {data?.uploadCategories?.results?.map((category) => (
        <div
          className="px-3 py-1 bg-gray-200 mr-2 rounded font-bold text-sm text-gray-700 cursor-pointer hover:bg-gray-300"
          key={category.id}
          onClick={() => {
            form.setValue("category", category.name);
          }}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};
