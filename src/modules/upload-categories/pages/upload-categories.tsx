import React from "react";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useUploadCategories } from "../hooks";

export const UploadCategories: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useUploadCategories();

  console.log(data, error);

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.uploadCategories?.results?.length === 0) {
      return <EmptyList text="Aucune Catégorie d'upload" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="padding-table   font-medium">Nom</th>
          </tr>
        </thead>
        <tbody>
          {data?.uploadCategories?.results?.map((category, index) => (
            <tr
              key={`category-${category.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex py-3 padding-table  ">
                <div>
                  <p
                    className="font-medium  cursor-pointer"
                    onClick={() => navigate(`/uploads/category/${category.id}`)}
                  >
                    {category?.name || "-"}
                  </p>
                  <p className="text-gray-500">
                    {/* {upload.referencesCount} références{" "} */}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Header
        title="Categories de Uploads"
        subtitle={`Liste des categories de uploads`}
        buttons={[
          {
            actionText: "Nouvelle Catégorie",
            bgColor: "indigo",
            textColor: "white",
            link: "/uploads/category/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="w-full mb-4 md:mb-0">
          <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
            {renderList()}
          </div>
        </div>
      </div>
    </>
  );
};
