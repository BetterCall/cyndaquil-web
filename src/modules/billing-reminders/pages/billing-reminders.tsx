import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { Button } from "../../../components/button";
import { Header } from "../../../components/header";
import { parseSearchParams } from "../../../helpers/clean-object";
import { CreateBillingReminderButton } from "../buttons";
import { SearchBillingRemindersInput } from "../components";
import { useLazyBillingReminders } from "../hooks";

export const BillingReminders: React.FC = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [search, { data, loading, fetchMore, error }] =
    useLazyBillingReminders();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        limit,
        offset: 0,
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  console.log("error ", error);

  const renderList = () => {
    if (loading) return <Loading />;
    if (data?.billingReminders?.results?.length === 0) {
      return <EmptyList text="Aucun Contrat" />;
    }

    return (
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left">
            <th className="  padding-table font-medium text-left">Site</th>
            <th className="  padding-table font-medium text-center">Client</th>
            <th className="  padding-table font-medium text-center">Contact</th>
            <th className="  padding-table font-medium text-center">Type</th>
            <th className="  padding-table font-medium text-center">
              Faite Par
            </th>
            <th className="  padding-table font-medium text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.billingReminders?.results?.map((reminder, index) => (
            <tr
              onClick={() => navigate(`/billing-reminder/${reminder.id}`)}
              key={`reminder-${reminder.id}`}
              className={`text-xs  cursor-pointer ${
                index % 2 ? "" : "bg-gray-50"
              } `}
            >
              <td className="  padding-table  text-left ">
                {reminder?.site?.name ?? "-"}
              </td>
              <td className="   padding-table  text-center ">
                {reminder?.customer?.name ?? "-"}
              </td>
              <td className="  padding-table  text-center ">
                {reminder?.contact?.firstname ?? ""}{" "}
                {reminder?.contact?.lastname ?? "-"}
              </td>
              <td className="  padding-table  text-center ">
                {reminder?.type}
              </td>
              <td className="  padding-table  text-center ">
                {" "}
                {reminder?.madeBy?.firstname}
              </td>
              <td className="  padding-table  text-center">01/01/2022</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  return (
    <>
      <Header title="Relance" subtitle="Liste des relances" buttons={[]} />
      <div className="main-container">
        <div className="flex">
          <CreateBillingReminderButton />
        </div>
        <SearchBillingRemindersInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.billingReminders?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.billingReminders?.results?.length,
                  limit,
                  where: parseSearchParams(searchParams),
                },
              });
            }}
          />
        )}
      </div>
    </>
  );
};
