import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { useUpdateBug } from "../hooks";
import { BugStatusSelect } from "./bug-status-select";

interface IProps {
  bugId: number;
}

export const ReportBugForm: React.FC<IProps> = ({ bugId }) => {
  const client = useApolloClient();
  const { form, submit, loading } = useUpdateBug({
    id: bugId,
    onCompleted: () => {
      toast.success("Le bug a été mis à jour avec succès");
      const { status, report } = form.getValues();
      client.writeFragment({
        id: "Bug:" + bugId,
        fragment: gql`
          fragment MyBug on Bug {
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

  return (
    <div className="w-full mt-3">
      <div className="w-full mb-3">
        <BugStatusSelect form={form} />
      </div>

      <div className="w-full mb-3">
        <label className="label">Rapport</label>
        <textarea {...form.register("report")} className="input w-full" />
      </div>

      <div className="w-full">
        <Button
          onClick={submit}
          actionText="Valider"
          canClick={form.formState.isValid}
          loading={loading}
        />
      </div>
    </div>
  );
};
