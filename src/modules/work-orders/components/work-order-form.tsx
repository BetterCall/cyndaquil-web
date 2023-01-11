import React, { useEffect, useState } from "react";
import moment from "moment";
import { Controller, UseFormReturn } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";

import { AddressInputs } from "../../../components/address-inputs";
import { Button } from "../../../components/button";

import { SiteInput } from "../../sites/components/site-input";
import { FormHeader } from "../../../components/form";
import { CardHeader } from "../../../components/cards";
import {
  WorkOrdersPreview,
  WorkOrderTypeSelect,
  WorkOrderStatusSelect,
} from "../components";
import { useUsers } from "../../users/hooks";
import { CustomerInput } from "../../customer/components";
import { useLazyEmplacements } from "../../emplacements/hooks";
import { EmptyList } from "../../../components";

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
  const additionalInformations: string = form.watch("additionalInformations");
  const rows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;

  // @ts-ignore
  const { date, userId, siteId, emplacementIds = [] } = form.watch();
  const { data: usersData } = useUsers({ where: {} });

  const [getEmplacements, { data: eData, called }] = useLazyEmplacements();
  useEffect(() => {
    if (!disabledFields.includes("siteId")) {
      form.setValue("emplacementIds", []);
    }
    getEmplacements({ variables: { where: { siteId } } });
  }, [siteId]);

  const toggleRow = (emplacementId: number) => {
    console.log("ROWS ", rows);
    const index = emplacementIds.findIndex((id) => id === emplacementId);
    let ids = emplacementIds;
    if (index === -1) {
      ids.push(emplacementId);
    } else {
      ids.splice(index, 1);
    }
    form.setValue("emplacementIds", ids);
  };

  return (
    <div className="w-full">
      <div className="section">
        <div className="left">
          <div className="card mb-2">
            <CardHeader title="Informations Générales" />
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
                <div className="w-full ">
                  <WorkOrdersPreview userId={user.id} date={date} />
                </div>
              ))
            ) : (
              <EmptyList text="Selectionnez uen date>" />
            )}
          </div>
        </div>

        <div className="right">
          <div className="card mb-2">
            <CardHeader title="Emplacements" />
            {!siteId ? (
              <EmptyList text="Selectionnez un site" />
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-xs text-gray-500 text-left">
                    <th className="padding-table font-medium "></th>
                    <th className="padding-table font-medium ">Catégorie</th>
                    <th className="padding-table font-medium text-center">
                      Batiment
                    </th>
                    <th className="padding-table font-medium text-center">
                      Entrée
                    </th>
                    <th className="padding-table font-medium text-center">
                      Etage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {eData?.emplacements.results?.map((emplacement, index) => {
                    const isSelected =
                      emplacementIds.findIndex((id) => id === emplacement.id) ??
                      -1;

                    return (
                      <tr
                        key={`emplacement-${emplacement.id}`}
                        className={`text-xs   ${
                          index % 2 ? "" : "bg-gray-50"
                        } `}
                      >
                        <td className="padding-table ">
                          <input
                            checked={isSelected !== -1}
                            type="checkbox"
                            className="mr-2 cursor-pointer "
                            onClick={() => toggleRow(emplacement.id)}
                            id={`emplacement-${emplacement.id}`}
                          />
                        </td>
                        <td className="padding-table font-medium">
                          {emplacement.category?.name} {emplacement.id}
                        </td>

                        <td className="padding-table font-medium text-center">
                          {emplacement.building}
                        </td>
                        <td className="padding-table font-medium text-center ">
                          {emplacement.entrance}
                        </td>
                        <td className="padding-table  font-medium text-center ">
                          {emplacement.floor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
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
