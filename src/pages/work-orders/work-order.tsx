import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { WORK_ORDER } from "../../queries/work-orders.queries";
import {
  WorkOrderQuery,
  WorkOrderQueryVariables,
} from "../../__generated__/WorkOrderQuery";

export const WorkOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/work-orders");
    }
  }, []);

  const { data, loading } = useQuery<WorkOrderQuery, WorkOrderQueryVariables>(
    WORK_ORDER,
    {
      variables: {
        id: +id!,
      },
    }
  );

  return (
    <div>
      <Link to={"edit"}>Modifier le bon</Link>
      {data?.workOrder?.result?.status}
      <br />
      <div>
        <h2>sites</h2>
      </div>
      {data?.workOrder?.result?.streetNumber}
      {data?.workOrder?.result?.street}
      {data?.workOrder?.result?.city}
      {data?.workOrder?.result?.postal}
      SITE
      {data?.workOrder?.result?.site?.name}
      CUSTOMER
      {data?.workOrder?.result?.customer?.name}
    </div>
  );
};
