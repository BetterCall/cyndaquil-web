import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";

interface ITraductionForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const TraductionForm: React.FC<ITraductionForm> = ({
  loading,
  submit,
  form,
}) => {
  return (
    <div className="card">
      <div className="w-full p-3">
        <p className="label">Key</p>
        <input
          className="w-full input"
          {...form.register("key", { required: "key required" })}
          placeholder="Key"
        />
      </div>

      <div className="w-full p-3">
        <p className="label">Value</p>
        <input
          className="w-full input"
          {...form.register("value", { required: "value required" })}
          placeholder="Value"
        />
      </div>

      <div className="w-full p-3">
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
