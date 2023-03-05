import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptyList, Loading } from "../../../components";
import { Row } from "../../../components/tables";
import { ContractRowEmplacementFiltersInput } from "../../../__generated__/globalTypes";
import { useContractRowEmplacements } from "../hooks/useContractRowEmplacements";

interface IProps {
  where: ContractRowEmplacementFiltersInput;
}

export const ContractRowEmplacementsPreview: React.FC<IProps> = ({ where }) => {
  const navigate = useNavigate();
  const { data, loading } = useContractRowEmplacements({
    where,
    limit: 5,
    offset: 0,
  });

  const renderList = () => {
    if (loading) return <Loading />;

    if (data?.contractRowEmplacements?.results?.length === 0) {
      return <EmptyList text="Aucun Bon" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">N° Contrat</th>
              <th className="padding-table font-medium text-center">Service</th>
              <th className="padding-table font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.contractRowEmplacements?.results?.map((row, index) => (
              <Row index={index} key={`row-${row.id}`}>
                <td className="padding-table flex">
                  <div>
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/work-order-row/${row.id}`)}
                    >
                      {row.contractRow?.contractId}
                    </p>
                    <p className="text-gray-500"></p>
                  </div>
                </td>
                <td className="padding-table text-center "></td>
                <td className="padding-table text-right "></td>
              </Row>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return renderList();
};
