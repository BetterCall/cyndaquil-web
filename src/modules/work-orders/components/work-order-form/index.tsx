import React, { useEffect } from "react";
import moment from "moment";
import { Controller, UseFormReturn } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";
import { toast } from "react-toastify";

import { EmplacementsSelect } from "./emplacements-select";
import { WorkOrderRowsSelect } from "./work-order-rows-select";

import { AddressInputs } from "../../../../components/address-inputs";
import { Button } from "../../../../components/button";

import { SiteInput } from "../../../sites/components/site-input";
import { FormHeader } from "../../../../components/form";
import { CardHeader } from "../../../../components/cards";
import {
  WorkOrdersPreview,
  WorkOrderTypeSelect,
  WorkOrderStatusSelect,
} from "..";
import { useUsers } from "../../../users/hooks";
import { CustomerInput } from "../../../customer/components";
import { EmptyList } from "../../../../components";

interface IWorkOrderFormProps {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
  disabledFields?: string[];
}

export const WorkOrderForm: React.FC<IWorkOrderFormProps> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  const { fromWorkOrderId } = form.watch();
  const additionalInformations: string = form.watch("additionalInformations");
  const inputRows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;

  // @ts-ignore
  const { date, userId, siteId, rows = [] } = form.watch();
  const { data: usersData } = useUsers({ where: {} });

  // const toggleRow = (emplacementId: number) => {
  //   const index = rows.findIndex((row) => row.emplacementId === emplacementId);
  //   let newRows = rows;
  //   if (index === -1) {
  //     newRows.push({ emplacementId, benefitId: null });
  //   } else {
  //     newRows.splice(index, 1);
  //   }
  //   form.setValue("rows", newRows);
  // };

  const toggleRow = (nRow) => {
    console.log(nRow);
    console.log(rows);
    const index = rows.findIndex(
      (row) => row.emplacementId === nRow.emplacementId
    );
    let newRows = rows;
    console.log(index);
    if (index === -1) {
      newRows.push({
        ...(nRow.rowId && { rowId: nRow.rowId }),
        emplacementId: nRow.emplacementId,
        benefitId: nRow.benefitId,
      });
    } else {
      newRows.splice(index, 1);
    }
    console.log("rows", newRows);
    form.setValue("rows", newRows);
  };

  const setRowBenefit = (emplacementId: number, benefitId: number) => {
    const index = rows.findIndex((row) => row.emplacementId === emplacementId);
    console.log(index);
    let newRows = rows;
    if (index !== -1) {
      newRows[index].benefitId = benefitId;
    }
    form.setValue("rows", newRows);
  };

  const onSubmit = () => {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].benefitId === null) {
        toast.error("Veuillez sélectionner un service pour chaque emplacement");
        return;
      }
    }
    submit();
  };

  return (
    <div className="w-full">
      <div className="section">
        <div className="left">
          <div className="card mb-2">
            <CardHeader title="Informations Générales" />
            <div className="w-full  mb-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Objet
              </p>
              <input
                className="w-full input"
                {...form.register("object", { required: "name required" })}
                placeholder="Objet de l'intervention"
              />
            </div>

            <div className="w-full ">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Informations
              </p>
              <textarea
                style={{ height: "auto" }}
                rows={inputRows}
                {...form.register("description", {
                  required: "name required",
                })}
                placeholder="Informations"
                className="input w-full "
              />
            </div>

            <WorkOrderStatusSelect form={form} />
            <WorkOrderTypeSelect form={form} />

            <SiteInput
              form={form}
              canSelectAddress={true}
              setCustomer={!disabledFields.includes("siteId")}
              disabled={disabledFields.includes("siteId")}
            />
            <CustomerInput form={form} disabled />
          </div>
        </div>
        <div className="right">
          <div className="card mb-2">
            <CardHeader title="Adresse" />
            <AddressInputs form={form} />
          </div>
        </div>
      </div>
      <section className="section">
        <div className="left">
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
                      console.log("e ", e);
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

            <p className="mb-1.5 font-medium text-base text-coolGray-800">
              Heure Fin
            </p>

            <Controller
              // @ts-ignore
              control={form.control}
              name="end"
              render={({ field: { onChange, value } }) => {
                return (
                  <TimePicker
                    onChange={(e) =>
                      form.setValue("end", moment(e).format("LT") ?? null)
                    }
                    value={moment(value ?? "08:00:00", "LT")}
                    format={"HH:mm"}
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />
          </div>

          <div className="card mb-2">
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
          </div>

          <div className="card mb-2">
            {date ? (
              usersData?.users?.results?.map((user) => (
                <div className="w-full mb-2" key={`user-user.${user.id}`}>
                  <label className="label">
                    {user.firstname} {user.lastname}
                    {" :"}
                  </label>
                  <WorkOrdersPreview userId={user.id} date={date} />
                </div>
              ))
            ) : (
              <EmptyList text="Selectionnez une date" />
            )}
          </div>
        </div>

        <div className="right">
          <div className="card mb-2">
            <CardHeader title="Emplacements" />
            {fromWorkOrderId ? (
              <WorkOrderRowsSelect
                workOrderId={fromWorkOrderId}
                emplacementsSelected={rows}
                toggleRow={toggleRow}
              />
            ) : !siteId ? (
              <EmptyList text="Selectionnez un site" />
            ) : (
              <EmplacementsSelect
                setRowBenefit={setRowBenefit}
                siteId={siteId}
                emplacementsSelected={rows}
                toggleRow={toggleRow}
              />
            )}
          </div>
        </div>
      </section>

      <Button
        canClick={form.formState.isValid}
        loading={loading}
        actionText="Valider"
        onClick={onSubmit}
      />
    </div>
  );
};
