import React, { useEffect, useState } from "react";
import moment from "moment";
import { Controller, UseFormReturn } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";

import { AddressInputs } from "../../../components/address-inputs";
import { Button } from "../../../components/button";

import { SiteInput } from "../../sites/components/site-input";
import { FormHeader } from "../../../components/form";
import { CardHeader } from "../../../components/cards";
import { VisitsPreview, VisitStatusSelect } from ".";
import { useUsers } from "../../users/hooks";
import { CustomerInput } from "../../customer/components";
import { useLazyEmplacements } from "../../emplacements/hooks";
import { EmptyList } from "../../../components";

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
        <div className="left">
          <div className="card mb-2">
            <CardHeader title="Informations Générales" />
            <div className="w-full  mb-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Objet de la visite
              </p>
              <input
                className="w-full input"
                {...form.register("object", {
                  required: "Le Motif est necessaire",
                })}
                placeholder="Objet de la visite"
              />
            </div>

            <div className="w-full ">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Informations
              </p>
              <textarea
                style={{ height: "auto" }}
                rows={rows}
                {...form.register("description", {
                  required: "name required",
                })}
                placeholder="Informations"
                className="input w-full "
              />
            </div>

            <VisitStatusSelect form={form} />
            <CustomerInput
              form={form}
              disabled={disabledFields.includes("customerId")}
            />
          </div>
        </div>
        <div className="right">
          <div className="card mb-2">
            <FormHeader
              title="Date"
              subtitle="Update your billing details and address."
            />
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Jour
            </p>
            <Controller
              // @ts-ignore
              control={form.control}
              name="date"
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    value={moment(value ?? "2023-01-01", "YYYY-MM-DD")}
                    onChange={(e) => {
                      onChange(moment(e).format("YYYY-MM-DD") ?? null);
                    }}
                    format="DD/MM/YYYY"
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />

            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Heure Début
            </p>

            <Controller
              // @ts-ignore
              control={form.control}
              name="start"
              render={({ field: { onChange, value } }) => {
                return (
                  <TimePicker
                    onChange={(e) =>
                      form.setValue("start", moment(e).format("LT") ?? null)
                    }
                    value={moment(value ?? "08:00:00", "LT")}
                    format={"HH:mm"}
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <section className="section">
        <div className="left"></div>

        <div className="right"></div>
      </section>

      <Button
        canClick={form.formState.isValid}
        loading={loading}
        actionText="Valider"
        onClick={submit}
      />
    </div>
  );
};
