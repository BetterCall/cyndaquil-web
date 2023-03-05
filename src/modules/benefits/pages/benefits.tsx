import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { useLazyBenefit } from "../hooks";

export const Benefits = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, { data, loading, fetchMore }] = useLazyBenefit();

  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  return (
    <>
      <Header
        title={"Liste des Services"}
        subtitle={""}
        buttons={[
          {
            actionText: "Nouveau Service",
            bgColor: "indigo",
            textColor: "white",
            link: `/benefit/create`,
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
              </tr>
            </thead>
            <tbody>
              {data?.benefits?.results?.map((benefit, index) => (
                <tr
                  key={`benefit-${benefit.id}`}
                  className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="flex py-3 padding-table  ">
                    <div>
                      <p
                        className="font-medium  cursor-pointer"
                        onClick={() => navigate(`/benefit/${benefit.id}`)}
                      >
                        {benefit?.name || "-"}
                      </p>
                      <p className="text-gray-500">fd</p>
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
