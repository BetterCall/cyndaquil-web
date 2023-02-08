import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";

import { CardHeader } from "../../../components/cards";
import { CustomerInput } from "../../customer/components";

interface ITransferFormProps {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const TransferForm: React.FC<ITransferFormProps> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  const additionalInformations: string = form.watch("description");
  const rows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;

  return (
    <div className="card">
      <div className="w-full">
        <CardHeader title="Informations Générales" />

        <div className="w-full  mb-3">
          <p className="mb-1.5 font-medium text-base text-coolGray-800">
            Montant
          </p>
          <input
            className="w-full input"
            {...form.register("amount", {
              required: "Le montant est necessaire",
            })}
            placeholder="Montant"
          />
        </div>

        <div className="w-full  mb-3">
          <p className="mb-1.5 font-medium text-base text-coolGray-800">IBAN</p>
          <input
            className="w-full input"
            {...form.register("object", {
              required: "Le IBAN est necessaire",
            })}
            placeholder="IBAN"
          />
        </div>

        <div className="w-full ">
          <p className="mb-1.5 font-medium text-base text-coolGray-800">
            Commentaire
          </p>
          <textarea
            style={{ height: "auto" }}
            rows={rows}
            {...form.register("comment", {})}
            placeholder="Commentaire"
            className="input w-full "
          />
        </div>

        <CustomerInput
          form={form}
          disabled={disabledFields.includes("customerId")}
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
