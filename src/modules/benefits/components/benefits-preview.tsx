import React from "react";
import { useNavigate } from "react-router-dom";

import { BenefitFiltersInput } from "../../../__generated__/globalTypes";
import { useBenefits } from "../hooks";
import { EmptyList, Loading } from "../../../components";

interface IProps {
  where: BenefitFiltersInput;
  message?: string;
}

export const BenefitsPreview: React.FC<IProps> = ({
  where,
  message = "Aucun Service",
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useBenefits({
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.benefits?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left padding-table ">
          <th className=" font-medium padding-table ">Catégorie</th>
          <th className=" font-medium padding-table text-center ">Service</th>
          <th className=" font-medium padding-table text-center ">Tarif</th>
          <th className=" font-medium padding-table text-right ">-</th>
        </tr>
      </thead>
      <tbody>
        {data?.benefits?.results?.map((benefit, index) => (
          <tr
            key={`benefit-${benefit.id}`}
            className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="flex padding-table ">
              <div
                className="font-medium cursor-pointer"
                onClick={() => navigate(`/benefit/${benefit.id}`)}
              >
                {benefit.category?.name}
              </div>
            </td>
            <td className="font-medium padding-table text-center ">
              {benefit.name}
            </td>
            <td className="font-medium padding-table text-center ">
              {benefit.price}€
            </td>
            <td className="font-medium padding-table text-right ">-</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
