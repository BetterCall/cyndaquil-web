import React from "react";
import { EmptyList, Loading } from "../../../components";
import { PaymentFiltersInput } from "../../../__generated__/globalTypes";
import { usePayments } from "../hooks";

export const PaymentsPreview: React.FC<PaymentFiltersInput> = (where) => {
  const { data, loading } = usePayments({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.payments?.results?.length === 0) {
    return <EmptyList text="Aucun Paiement" />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left">
          <th className="padding-table font-medium">Type</th>
          <th className="padding-table font-medium text-center">N° Facture</th>
          <th className="padding-table font-medium text-center ">Saisie Par</th>
          <th className="padding-table font-medium text-center ">Client</th>
          <th className="padding-table font-medium text-right ">Site</th>
        </tr>
      </thead>
      <tbody>
        {data?.payments?.results?.map((payment, index) => (
          <tr
            key={`payments-${payment.id}`}
            className={`text-xs  ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="padding-table ">{payment.type}</td>
            <td className="padding-table ">{payment.invoiceId}</td>
            <td className="padding-table text-center">
              {`${payment.recordedBy?.firstname} ${payment.recordedBy?.lastname}`}
            </td>
            <td className="padding-table text-center">
              {payment.customer?.name || "-"}
            </td>
            <td className="padding-table text-right ">
              {payment.invoice?.site?.name || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
