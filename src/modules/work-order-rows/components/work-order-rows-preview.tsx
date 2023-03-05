import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkOrderRows } from "../hooks";

import { formatHour } from "../../../helpers/date";
import { EmptyList, Loading } from "../../../components";
import { Row } from "../../../components/tables";
import { WorkOrderRowFiltersInput } from "../../../__generated__/globalTypes";

interface IProps {
  where: WorkOrderRowFiltersInput;
}

export const WorkOrderRowsPreview: React.FC<IProps> = ({ where }) => {
  const navigate = useNavigate();
  const { data, loading } = useWorkOrderRows({ where, limit: 5, offset: 0 });

  const renderList = () => {
    if (loading) return <Loading />;

    if (data?.workOrderRows?.results?.length === 0) {
      return <EmptyList text="Aucun Bon" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">N° BI</th>
              <th className="padding-table font-medium text-center">Service</th>
              <th className="padding-table font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.workOrderRows?.results?.map((row, index) => (
              <Row index={index} key={`row-${row.id}`}>
                <td className="padding-table flex">
                  <div>
                    <p
                      className="font-medium  cursor-pointer"
                      onClick={() => navigate(`/work-order-row/${row.id}`)}
                    >
                      {row.workOrder?.id}
                    </p>
                    <p className="text-gray-500"></p>
                  </div>
                </td>
                <td className="padding-table text-center ">
                  {row.benefit?.name}
                </td>
                <td className="padding-table text-right ">
                  {row.workOrder?.date &&
                    formatHour(row.workOrder.date + " " + row.workOrder.start)}
                </td>
              </Row>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return renderList();
};
