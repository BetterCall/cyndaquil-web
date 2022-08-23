import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { DashboardLayout } from "../../../layouts/dashboard.layout";

import { CUSTOMER } from "../../../queries/customers.queries";
import {
  CustomerQuery,
  CustomerQueryVariables,
} from "../../../__generated__/CustomerQuery";
import { Card, CardHeader } from "../../../components/cards";
import { SitesList } from "../../../components/sites";
import { CallsList } from "../../../components/calls";
import { WorkOrdersList } from "../../../components/work-orders";
import { ContactsList } from "../../../components/contacts";

type ICustomerParams = {
  id: string;
};

export const Customer = () => {
  const { id } = useParams<ICustomerParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data, loading, refetch } = useQuery<
    CustomerQuery,
    CustomerQueryVariables
  >(CUSTOMER, {
    variables: {
      id: +id!,
    },
  });
  return (
    <DashboardLayout>
      <Header
        title={data?.customer?.result?.name ?? ""}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/customers/${data?.customer?.result?.id}/edit`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0">
            <SitesList customerId={+id!} />
            <WorkOrdersList />
          </div>
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0">
            <ContactsList customerId={+id!} />
            <CallsList customerId={+id!} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
