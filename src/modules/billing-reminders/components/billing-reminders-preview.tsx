import React from "react";
import { EmptyList } from "../../../components";
import { BillingRemindersFiltersInput } from "../../../__generated__/globalTypes";
import { useBillingReminders } from "../hooks";

interface IBillingRemindersPreviewProps {
  where: BillingRemindersFiltersInput;
  emptyText?: string;
}

export const BillingRemindersPreview: React.FC<
  IBillingRemindersPreviewProps
> = ({ where, emptyText }) => {
  const { data, loading } = useBillingReminders({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <div className="flex justify-center align-middle ">Loading</div>;
  }

  if (data?.billingReminders?.results?.length === 0) {
    return <EmptyList text={emptyText ?? "Aucune Relance"} />;
  }

  return (
    <ul>
      {data?.billingReminders?.results?.map((r) => (
        <li className="mb-5">{`${r.id}`}</li>
      ))}
    </ul>
  );
};
