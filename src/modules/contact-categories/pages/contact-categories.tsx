import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useContactCategories } from "../hooks";

export const ContactCategories: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useContactCategories();

  console.log(data);

  return (
    <>
      <Header
        title="Categories de Contacts"
        subtitle={`Liste des categories de contacts`}
        buttons={[
          {
            actionText: "Nouvelle Catégorie",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts/category/create",
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="w-full mb-4 md:mb-0">
          <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="text-xs text-gray-500 text-left">
                  <th className=" font-medium padding-table ">Nom</th>
                </tr>
              </thead>
              <tbody>
                {data?.contactCategories?.results?.map((category, index) => (
                  <tr
                    key={`category-${category.id}`}
                    className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                  >
                    <td className="flex padding-table ">
                      <div>
                        <p
                          className="font-medium cursor-pointer"
                          onClick={() =>
                            navigate(`/contacts/category/${category.id}`)
                          }
                        >
                          {category.name}
                        </p>
                        <p
                          className="text-gray-500"
                          onClick={() =>
                            navigate(`/contacts?categoryId=${category.id}`)
                          }
                        >
                          {category.contactsCount} client{" "}
                        </p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
