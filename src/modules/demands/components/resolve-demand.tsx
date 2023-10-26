import { gql, useApolloClient } from "@apollo/client";
import React from "react";

import { Button } from "../../../components/button";
import { useResolveDemand } from "../hooks/useResolveDemand";

interface IResolveDemand {
  id: number;
  treated?: boolean;
  report?: string | null;
}

export const ResolveDemand: React.FC<IResolveDemand> = ({
  id,
  treated: defaultTreated,
  report: defaultReport,
}) => {
  const client = useApolloClient();

  const onCompleted = () => {
    // update cache
    const { treated, report } = form.getValues();
    client.writeFragment({
      id: `Demand:${id}`,
      fragment: gql`
        fragment resolvedDemand on Demand {
          treated
          report
        }
      `,
      data: {
        treated,
        report,
      },
    });
  };
  const { form, submit, loading } = useResolveDemand({
    id,
    defaultValues: {
      treated: defaultTreated ?? false,
      report: defaultReport ?? "",
    },
    onCompleted,
  });

  return (
    <div className="w-full">
      <div className="w-full flex items-center mb-3">
        <input
          type={"checkbox"}
          {...form.register("treated", {
            required: "Rapport requis",
          })}
        />
        <p className="label mb-0 ml-2">Traitée</p>
      </div>

      <div className="w-full mb-3">
        <p className="label">Rapport</p>
        <textarea
          {...form.register("report", {
            required: "Rapport requis",
          })}
          placeholder="Informations"
          className="input w-full"
        />
      </div>
      <div className="w-full ">
        <Button
          canClick={form.formState.isValid}
          loading={loading}
          actionText="Valider"
          onClick={submit}
        />
      </div>
    </div>
  );
};
