import React from "react";
import { useNavigate } from "react-router-dom";

import { useCustomers } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { CustomerFiltersInput } from "../../../__generated__/globalTypes";

interface ICustomersPreviewProps {
  where: CustomerFiltersInput;
  message?: string;
  limit?: number;
}

export const CustomersPreview: React.FC<ICustomersPreviewProps> = ({
  where,
  message = "Aucun utilisateur",
  limit = 5,
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useCustomers({
    limit,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.customers?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  console.log("data", data);
  console.log("error", error);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Nom</th>
            <th className=" font-medium padding-table text-right ">Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.customers?.results?.map((customer, index) => (
            <tr
              key={`customer-${customer.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => navigate(`/customer/${customer.id}`)}
                  >
                    {customer.name}
                  </p>
                </div>
              </td>
              <td className="font-medium padding-table text-right ">
                {customer.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
