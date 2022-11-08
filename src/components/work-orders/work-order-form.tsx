import React from "react";
import moment from "moment";
import { Controller, UseFormReturn } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";

import { AddressInputs } from "../address-inputs";
import { Button } from "../button";

import {
  CreateWorkOrderInput,
  UpdateWorkOrderInput,
} from "../../__generated__/globalTypes";
import { CustomerInput } from "../customers";
import { SiteInput } from "../sites/site-input";
import { FormHeader } from "../form";
import { Card, CardHeader } from "../cards";
import { WorkOrdersList } from "./work-orders-list";
import { useUsers } from "../../hooks/useUsers";
import { WorkOrderTypeSelect } from "./work-order-type-select";

interface IWorkOrderFormProps {
  loading: boolean;
  submit: any;

  form:
    | UseFormReturn<CreateWorkOrderInput, any>
    | UseFormReturn<UpdateWorkOrderInput, any>;
}

export const WorkOrderForm: React.FC<IWorkOrderFormProps> = ({
  loading,
  submit,
  form,
}) => {
  // @ts-ignore
  const additionalInformations: string = form.watch("additionalInformations");
  const rows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;

  // @ts-ignore
  const { date, userId } = form.watch();
  const { data: usersData } = useUsers({});

  return (
    <div className="w-full">
      <div className="flex flex-wrap  -m-3">
        <div className="w-full xl:w-1/2 p-3">
          <Card>
            <FormHeader
              title="Informations Générales"
              subtitle="Update your billing details and address."
            />
            <div className="w-full  mb-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Nom
              </p>
              <input
                className="w-full input"
                {...form.register("name", { required: "name required" })}
                placeholder="name"
              />
            </div>
            <WorkOrderTypeSelect form={form} />

            <CustomerInput form={form} />
            <SiteInput form={form} />

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
          </Card>
        </div>
        <div className="w-full xl:w-1/2 p-3">
          <Card>
            <AddressInputs form={form} />
          </Card>
        </div>

        <div className="w-full xl:w-1/2 p-3">
          <Card>
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
              render={({ field: { onChange } }) => (
                <DatePicker
                  onChange={(e) => {
                    onChange(moment(e).format("YYYY-MM-DD") ?? null);
                  }}
                  format="DD/MM/YYYY"
                  className="input w-full p-3 mb-3"
                />
              )}
            />

            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Heure Début
            </p>
            <TimePicker
              onChange={(e) =>
                form.setValue("start", moment(e).format("LT") ?? null)
              }
              className="input w-full p-3  mb-3"
              format={"HH:mm"}
            />
            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Heure Fin
            </p>
            <TimePicker
              onChange={(e) =>
                form.setValue("end", moment(e).format("LT") ?? null)
              }
              className="input w-full p-3  mb-3"
              format={"HH:mm"}
            />
          </Card>
        </div>
        <div className="w-full xl:w-1/2 p-3">
          <Card>
            <CardHeader title="Tech." />
            {usersData?.users?.results?.map((user) => {
              const isChecked = userId === user.id;
              return (
                <div className="flex items-center		" key={`user-row-${user.id}`}>
                  <input
                    type={"checkbox"}
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        form.setValue("userId", null);
                      } else {
                        form.setValue("userId", user.id);
                      }
                    }}
                  />
                  <span className="ml-2 font-medium">{user.firstname}</span>
                </div>
              );
            })}
          </Card>
        </div>
        {date &&
          usersData?.users?.results?.map((user) => (
            <div className="w-full xl:w-1/2 p-3">
              <WorkOrdersList userId={user.id} date={date} />
            </div>
          ))}
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
