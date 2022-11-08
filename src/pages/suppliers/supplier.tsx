import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { SUPPLIER } from "../../queries/suppliers.queries";
import {
  SupplierQuery,
  SupplierQueryVariables,
} from "../../__generated__/SupplierQuery";

type ISupplierParams = {
  id: string;
};

export const Supplier = () => {
  const { id } = useParams<ISupplierParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data, loading, refetch } = useQuery<
    SupplierQuery,
    SupplierQueryVariables
  >(SUPPLIER, {
    variables: {
      id: +id!,
    },
  });
  return (
    <>
      <Header
        title={data?.supplier?.result?.name ?? ""}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/suppliers/${data?.supplier?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
        </div>
      </div>
    </>
  );
};
