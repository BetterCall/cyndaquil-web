import React, { useEffect, useState } from "react";
import { cleanObject } from "../../../helpers/clean-object";
import { formatHour } from "../../../helpers/date";
import { useLazyWorkOrders } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Row } from "../../../components/tables";
import {
  WorkOrderFiltersInput,
  WorkOrderStatus,
} from "../../../__generated__/globalTypes";

interface WordOrderProps extends WorkOrderFiltersInput {
  title?: string;
  subtitle?: string;
}

export const WorkOrdersPreview: React.FC<WordOrderProps> = ({
  title,
  subtitle,
  date,
  ...where
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [search, { data, loading, error }] = useLazyWorkOrders();

  console.log(data, error);

  useEffect(() => {
    if (filters === where) {
      return;
    }
    setFilters(where);
    const filter = cleanObject(where);
    if (Object.keys(filter).length === 0) {
      return;
    }
    search({
      variables: {
        where: { date, ...filter },
      },
    });
  }, [date]);

  const renderList = () => {
    if (loading) return <Loading />;

    if (data?.workOrders?.results?.length === 0) {
      return <EmptyList text="Aucun Bon" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Objet</th>
              <th className="padding-table font-medium text-center">Etat</th>
              <th className="padding-table font-medium text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.workOrders?.results?.map((workOrder, index) =>
              index < 5 ? (
                <Row index={index} key={`workOrder-${workOrder.id}`}>
                  <td className="padding-table flex">
                    <div>
                      <p
                        className="font-medium cursor-pointer"
                        onClick={() => navigate(`/work-order/${workOrder.id}`)}
                      >
                        {workOrder.object}
                      </p>
                      <p className="text-gray-500">
                        {workOrder.streetNumber} {workOrder.street}
                      </p>
                    </div>
                  </td>
                  <td className="padding-table text-center ">
                    {workOrder.status}
                  </td>
                  <td className="padding-table text-center ">
                    {workOrder?.status === WorkOrderStatus.Pending
                      ? "-"
                      : formatHour(
                          workOrder.date + " " + workOrder.start ?? ""
                        )}
                  </td>
                </Row>
              ) : null
            )}
          </tbody>
        </table>
      );
    }
  };

  return renderList();
};
