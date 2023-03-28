import React from "react";
import moment from "moment";
import { Controller, UseFormReturn } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";

import { AddressInputs } from "../../../components/address-inputs";
import { Button } from "../../../components/button";

import { CardHeader } from "../../../components/cards";
import { VisitStatusSelect } from ".";
import { CustomerInput } from "../../customer/components";
import { ErrorMessage } from "@hookform/error-message";

interface IVisitFormProps {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const VisitForm: React.FC<IVisitFormProps> = ({
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
    <div className="w-full">
      <div className="section">
        <div className="element">
          <div className="card mb-2">
            <CardHeader title="Informations Générales" />
            <div className="w-full  mb-3">
              <p className="label">Objet de la visite</p>
              <input
                className="w-full input"
                {...form.register("object", {
                  required: "L'objet de la visite est requis",
                })}
                placeholder="Objet de la visite"
              />

              <ErrorMessage
                errors={form.formState?.errors}
                name="object"
                render={({ message }) => (
                  <p className="error-message">{message}</p>
                )}
              />
            </div>

            <div className="w-full ">
              <p className="label">Informations</p>
              <textarea
                style={{ height: "auto" }}
                rows={rows}
                {...form.register("description")}
                placeholder="Informations"
                className="input w-full "
              />
            </div>

            <VisitStatusSelect form={form} />
            <div className="w-full mt-3">
              <CustomerInput
                error="Le Choix du client est requis"
                form={form}
                canSelectAddress={true}
                disabled={disabledFields.includes("customerId")}
              />
            </div>
          </div>

          <div className="card mb-2">
            <CardHeader title="Date" />

            <p className="label">Jour</p>
            <Controller
              // @ts-ignore
              control={form.control}
              name="date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    value={moment(value ?? "2023-01-01", "YYYY-MM-DD")}
                    onChange={(e) => {
                      if (e) {
                        onChange(moment(e).format("YYYY-MM-DD"));
                      } else {
                        onChange(moment(undefined).format("YYYY-MM-DD"));
                      }
                    }}
                    format="DD/MM/YYYY"
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />
            <ErrorMessage
              errors={form.formState?.errors}
              name="date"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />

            <p className="label">Heure Début</p>

            <Controller
              // @ts-ignore
              control={form.control}
              name="start"
              render={({ field: { onChange, value } }) => {
                return (
                  <TimePicker
                    onChange={(e) => {
                      if (e) {
                        form.setValue("start", moment(e).format("LT"));
                      } else {
                        form.setValue("start", moment(undefined).format("LT"));
                      }
                    }}
                    value={moment(value ?? "08:00:00", "LT")}
                    format={"HH:mm"}
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />
          </div>
        </div>
        <div className="element">
          <div className="card mb-2">
            <CardHeader title="Adresse" />
            <AddressInputs form={form} />
          </div>
        </div>
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
