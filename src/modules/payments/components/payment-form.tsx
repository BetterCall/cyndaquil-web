import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormError } from "../../../components/form-error";

import { Button } from "../../../components/button";
import { CardHeader } from "../../../components/cards";
import { PaymentTypeSelect } from "./payment-type-select";
import { InvoiceInput } from "../../invoices/components/invoice-input";

interface IPaymentForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const PaymentForm: React.FC<IPaymentForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  return (
    <div className="">
      <InvoiceInput
        form={form}
        disabled={disabledFields.includes("invoiceId")}
      />
      <div className="card">
        <div className="w-full">
          <p className="label">Montant</p>
          <input
            className="w-full input"
            {...form.register("amount", {
              required: "Le montant du reglement est requis",
            })}
            placeholder="Montant"
          />
        </div>
        <div className="w-full mt-2">
          <PaymentTypeSelect form={form} />
        </div>
        <div className="w-full py-3">
          <Button
            canClick={form.formState.isValid}
            loading={loading}
            actionText="Valider"
            onClick={submit}
          />
        </div>
      </div>
    </div>
  );
};
