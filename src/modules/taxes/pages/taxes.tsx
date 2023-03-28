import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useLazyTaxes } from "../hooks";

export const Taxes: React.FC = () => {
  const navigate = useNavigate();
  const [search, { data }] = useLazyTaxes();

  useEffect(() => {
    search({
      fetchPolicy: "network-only",
    });
  }, []);

  return (
    <>
      <Header
        title={"Taxes"}
        subtitle={"Liste des Taxes"}
        buttons={[
          {
            actionText: "Nouvelle Taxe",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxe/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table   font-medium">Nom</th>
                <th className="padding-table   font-medium text-center">
                  Valeur
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.taxes?.results?.map((taxe, index) => (
                <tr
                  key={`taxe-${taxe.id}`}
                  className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="  py-3 padding-table  ">
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/taxe/${taxe.id}`)}
                    >
                      {taxe?.name}
                    </p>
                  </td>

                  <td className="py-3 padding-table text-center ">
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/taxe/${taxe.id}`)}
                    >
                      {taxe?.value} %
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
