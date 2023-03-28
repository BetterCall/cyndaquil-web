import React from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useCustomerCategories } from "../hooks";

export const CustomerCategories: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading } = useCustomerCategories();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        title="Catégories de Client"
        subtitle="Liste des Categories de Client"
        buttons={[
          {
            actionText: "Nouvelle category",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers/category/create",
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
                {data?.customerCategories?.results?.map((category, index) => (
                  <tr
                    key={`category-${category.id}`}
                    className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                  >
                    <td className="flex padding-table ">
                      <div>
                        <p
                          className="font-medium cursor-pointer"
                          onClick={() =>
                            navigate(`/customers/category/${category.id}`)
                          }
                        >
                          {category.name}
                        </p>
                        <p
                          className="text-gray-500"
                          onClick={() =>
                            navigate(`/customers?categoryId=${category.id}`)
                          }
                        >
                          {category.customersCount} client{" "}
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
