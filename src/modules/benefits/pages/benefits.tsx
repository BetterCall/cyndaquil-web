import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { CreateBenefitButton } from "../buttons";
import { useLazyBenefit } from "../hooks";

export const Benefits = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, { data, loading, fetchMore, error }] = useLazyBenefit();

  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  console.log(data, error);
  console.log({ where: parseSearchParams(searchParams) });

  return (
    <>
      <Header title={"Services"} subtitle={"Afficher la liste des services"} />

      <div className="main-container">
        <div className="flex">
          <CreateBenefitButton />
        </div>

        <div className="p-4 mb-1 bg-white shadow rounded overflow-x-auto">
          {/* {data?.benefits?.total} resultats */}
        </div>

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table font-medium">Nom</th>
              </tr>
            </thead>
            <tbody>
              {data?.benefits?.results?.map((benefit, index) => (
                <tr
                  key={`benefit-${benefit.id}`}
                  className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="flex py-3 padding-table">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/benefit/${benefit.id}`)}
                      >
                        {benefit?.category?.name} - {benefit?.name || "-"}
                      </p>
                      <p className="text-gray-500">{benefit?.price}€</p>
                    </div>
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
