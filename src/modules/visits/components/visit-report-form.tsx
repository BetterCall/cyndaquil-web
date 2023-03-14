import React, { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";

import { Button } from "../../../components/button";
import { useMe } from "../../users/hooks/useMe";
import { useVisit } from "../hooks";
import { useUpdateVisitReport } from "../hooks";
import { toast } from "react-toastify";
import { gql, useApolloClient } from "@apollo/client";
import { Loading } from "../../../components";
import { UserRole, VisitStatus } from "../../../__generated__/globalTypes";
import { VisitStatusSelect } from "./visit-status-select";

interface IVisitFormProps {
  id: number;
}

export const VisitReportForm: React.FC<IVisitFormProps> = ({ id }) => {
  const client = useApolloClient();
  const { data: meData } = useMe();
  const { data, loading: visitLoading } = useVisit(id);

  const { form, submit, loading } = useUpdateVisitReport({
    id,
    onCompleted: () => {
      toast.success("Le rapport est mis à jour");

      const { report, status } = form.getValues();
      client.writeFragment({
        id: `Visit:${id}`,
        fragment: gql`
          fragment VisitReported on Visit {
            report
            status
          }
        `,
        data: {
          report,
          status,
        },
      });
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("report", data?.visit?.result?.report ?? "");
      form.setValue("status", data?.visit?.result?.status ?? VisitStatus?.Done);
    }
  }, [data]);

  if (visitLoading) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  if (
    data?.visit?.result?.userId !== meData?.me?.id &&
    meData?.me?.role !== UserRole?.Admin
  ) {
    return (
      <div className="w-full">
        <textarea
          className="w-full input"
          value={
            data?.visit?.result?.report ??
            "Le Rapport n'as pas été encore saisi"
          }
        />
      </div>
    );
  }
  return (
    <div>
      <div className="w-full  mb-3">
        <p className="label">Etat</p>
        <VisitStatusSelect form={form} />
      </div>
      <div className="w-full  mb-3">
        <p className="label">Rapport</p>
        <textarea
          className="w-full input"
          {...form.register("report", {
            required: "L'objet de la visite est requis",
          })}
          placeholder="Objet de la visite"
        />
        <ErrorMessage
          errors={form.formState?.errors}
          name="report"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <Button
        canClick={form.formState.isValid}
        loading={loading}
        actionText="Valider"
        onClick={submit}
      />
    </div>
  );
};
