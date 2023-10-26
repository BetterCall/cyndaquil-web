import React from "react";
import { EmptyList } from "../../../components";
import { InvoiceFiltersInput } from "../../../__generated__/globalTypes";
import { useInvoices } from "../hooks";

interface IInvoicesPreviewProps {
  where: InvoiceFiltersInput;
  emptyText?: string;
}

export const InvoicesPreview: React.FC<IInvoicesPreviewProps> = ({
  where,
  emptyText,
}) => {
  const { data, loading } = useInvoices({
    limit: 15,
    offset: 0,
    where,
  });

  if (loading) {
    return <div className="flex justify-center align-middle ">Loading</div>;
  }

  if (data?.invoices?.results?.length === 0) {
    return <EmptyList text={emptyText ?? "Aucune Facture"} />;
  }

  return (
    <ul>
      {data?.invoices?.results?.map((invoice) => (
        <li className="mb-5">{-`${invoice.status} ${invoice.id}`}-</li>
      ))}
    </ul>
  );
};
