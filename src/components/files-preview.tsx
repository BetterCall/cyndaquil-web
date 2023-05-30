import React from "react";
import { useUploadCategories } from "../modules/upload-categories/hooks";
import { useUploads } from "../modules/uploads/hooks";
import { UploadsQueryVariables } from "../__generated__/UploadsQuery";
import { EmptyList } from "./empty-list";
import { File } from "./file";
import { Loading } from "./loading";

interface IProps extends UploadsQueryVariables {
  withoutFilters?: boolean;
}

export const FilesPreview: React.FC<IProps> = ({
  withoutFilters,
  ...variables
}) => {
  const { data, loading } = useUploads(variables);

  const { data: categoryData } = useUploadCategories();
  const [selectedCategory, setSelectedCategory] = React.useState<number[]>([]);
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const renderList = () => {
    if (loading) {
      return <Loading />;
    }

    if (
      data?.uploads?.results?.length === 0 ||
      (!showAll && selectedCategory?.length === 0)
    ) {
      return <EmptyList text="Aucun fichier trouvé" />;
    } else {
      return (
        <div className="flex flex-wrap items-center w-full">
          {data?.uploads?.results?.map((upload) => {
            if (
              (showAll && !upload.categoryId) ||
              (upload.categoryId &&
                selectedCategory?.includes(upload.categoryId))
            ) {
              return (
                <div
                  className="w-1/4 flex items-center justify-center p-2"
                  key={`upload-${upload.id}`}
                >
                  <File
                    url={upload?.url}
                    publicLink={upload?.publicLink + "/download"}
                    informations={upload?.informations}
                  />
                </div>
              );
            }
          })}
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full flex flex-wrap mb-2 ">
        {!withoutFilters ? (
          <>
            <div
              className="px-3 py-1 bg-gray-200 mr-2 rounded font-bold text-sm text-gray-700 cursor-pointer hover:bg-gray-300"
              onClick={() => {
                if (selectedCategory?.length > 0) {
                  setSelectedCategory([]);
                  setShowAll(false);
                } else {
                  setSelectedCategory(
                    categoryData?.uploadCategories?.results?.map(
                      (category) => category.id
                    ) || []
                  );
                  setShowAll(true);
                }
              }}
            >
              {selectedCategory?.length > 0
                ? "Masquer tous les fichiers"
                : "Afficher tous les fichiers"}
            </div>

            <div
              className={`px-3 py-1 bg-gray-200 mr-2 rounded font-bold text-sm text-gray-700 cursor-pointer hover:bg-gray-300 ${
                showAll ? "bg-blue-500" : ""
              } `}
              onClick={() => {
                setShowAll(!showAll);
              }}
            >
              {"Sans Catégorie"}
            </div>

            {categoryData?.uploadCategories?.results?.map((category) => {
              if (
                data?.uploads?.results
                  ?.map((upload) => upload.categoryId)
                  .includes(category.id)
              ) {
                return (
                  <div
                    className={`px-3 py-1 bg-gray-200 mr-2 rounded font-bold text-sm text-gray-700 cursor-pointer hover:bg-gray-300 ${
                      selectedCategory.includes(category.id)
                        ? "bg-blue-500"
                        : ""
                    }`}
                    key={category.id}
                    onClick={() => {
                      if (selectedCategory.includes(category.id)) {
                        setSelectedCategory(
                          selectedCategory.filter((id) => id !== category.id)
                        );
                      } else {
                        setSelectedCategory([...selectedCategory, category.id]);
                      }
                    }}
                  >
                    {category.name}
                  </div>
                );
              }
            })}
          </>
        ) : null}
      </div>
      {renderList()}
    </>
  );
};
