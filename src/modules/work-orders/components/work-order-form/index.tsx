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
import { CreateEmplacement } from "../../../emplacements/modals";
import { useApolloClient } from "@apollo/client";
import { EMPLACEMENTS } from "../../../emplacements/emplacements.queries";
import { ErrorMessage } from "@hookform/error-message";

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
  const client = useApolloClient();
  const { workOrderId } = form.watch();
  const additionalInformations: string = form.watch("additionalInformations");
  const inputRows =
    additionalInformations?.split("\n").length > 4
      ? additionalInformations?.split("\n").length
      : 4;

  // @ts-ignore
  const { date, userId, siteId, rows = [] } = form.watch();
  const { data: usersData } = useUsers({ where: {} });

  useEffect(() => {
    if (!siteId) {
      form.setValue("rows", []);
      form.setValue("lat", null);
      form.setValue("lng", null);
      form.setValue("streetNumber", null);
      form.setValue("street", null);
      form.setValue("postal", null);
      form.setValue("city", null);
      form.setValue("customerId", null);
    }
  }, [siteId]);

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
    if (rows.length === 0) {
      toast.error("Veuillez sélectionner au moins un emplacement");
      return;
    }

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
        <div className="element">
          <div className="card mb-2">
            <CardHeader title="Informations Générales" />

            <Controller
              // @ts-ignore
              control={form.control}
              name="imperative"
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="flex items-center mt-3 mb-3 ">
                    <input
                      type={"checkbox"}
                      checked={value}
                      onChange={() => {
                        onChange(!value);
                      }}
                    />
                    <span className="ml-2 font-medium ">
                      Intervention Impérative
                    </span>
                  </div>
                );
              }}
            />

            <div className="w-full mb-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                *Objet
              </p>
              <input
                className="w-full input"
                {...form.register("object", {
                  required: "L'objet du Bon est Requis",
                })}
                placeholder="Objet de l'intervention"
              />
              <ErrorMessage
                errors={form.formState?.errors}
                name="object"
                render={({ message }) => (
                  <p className="error-message">{message}</p>
                )}
              />
            </div>

            <div className="w-full mb-3 ">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                *Informations
              </p>
              <textarea
                style={{ height: "auto" }}
                rows={inputRows}
                {...form.register("description", {
                  required: "La description est requise, Pensez au Tech ;)",
                })}
                placeholder="Informations"
                className="input w-full "
              />

              <ErrorMessage
                errors={form.formState?.errors}
                name="description"
                render={({ message }) => (
                  <p className="error-message">{message}</p>
                )}
              />
            </div>
            <div className="w-full mb-3">
              <WorkOrderStatusSelect form={form} />
            </div>

            <div className="w-full mb-3">
              <WorkOrderTypeSelect form={form} />
            </div>

            <div className="w-full mb-3">
              <SiteInput
                form={form}
                canSelectAddress={true}
                setCustomer={!disabledFields.includes("siteId")}
                disabled={disabledFields.includes("siteId")}
              />
            </div>
            <div className="w-full mb-3">
              <CustomerInput form={form} disabled />
            </div>
          </div>

          <div className="card mb-2">
            <CardHeader title="Adresse" />
            <AddressInputs form={form} />
          </div>
        </div>

        <div className="element">
          {siteId ? (
            <div className="card mb-4">
              <CardHeader title="Nouvel Emplacement" />

              <CreateEmplacement
                defaultValues={{
                  siteId: siteId,
                }}
                onCompleted={async (emplacement) => {
                  await client.cache.updateQuery(
                    { query: EMPLACEMENTS, variables: { where: { siteId } } },
                    (data) => {
                      console.log(data);
                      console.log(emplacement);
                      return {
                        ...data,
                        emplacements: {
                          ...data.emplacements,

                          results: [
                            {
                              ...emplacement,
                              __typename: "Emplacement",
                            },
                            ...data.emplacements?.results,
                          ],
                        },
                      };
                    }
                  );
                  toggleRow({
                    emplacementId: emplacement.id,
                  });
                }}
              />
            </div>
          ) : null}

          <div className="card mb-4">
            <CardHeader title="Emplacements" />
            {workOrderId ? (
              <WorkOrderRowsSelect
                workOrderId={workOrderId}
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

        <div className="element">
          <div className="card mb-4">
            <FormHeader
              title="Date"
              subtitle="Update your billing details and address."
            />

            <Controller
              // @ts-ignore
              control={form.control}
              name="appointment"
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="flex items-center mt-3 mb-3 ">
                    <input
                      type={"checkbox"}
                      checked={value}
                      onChange={() => {
                        onChange(!value);
                      }}
                    />
                    <span className="ml-2 font-medium ">Rendez vous</span>
                  </div>
                );
              }}
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
                    value={value ? moment(value, "YYYY-MM-DD") : null}
                    onChange={(e) => {
                      console.log("e ", e);
                      if (e) {
                        onChange(moment(e).format("YYYY-MM-DD"));
                      } else {
                        onChange(null);
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
                    onChange={(e) => {
                      if (e) {
                        onChange(moment(e).format("LT"));
                      } else {
                        onChange(null);
                      }
                    }}
                    value={value ? moment(value, "LT") : null}
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
                    onChange={(e) => {
                      if (e) {
                        onChange(moment(e).format("LT"));
                      } else {
                        onChange(null);
                      }
                    }}
                    value={value ? moment(value, "LT") : null}
                    format={"HH:mm"}
                    className="input w-full p-3 mb-3"
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="element">
          <div className="card mb-4">
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
                  <span className="ml-2 font-medium text-lg ">
                    {user.firstname}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {date ? (
          usersData?.users?.results?.map((user) => {
            if (userId) {
              if (userId !== user.id) return null;
            }
            return (
              <div className="element" key={`user-user.${user.id}`}>
                <div className="card">
                  <CardHeader title={`${user.firstname} ${user.lastname}`} />
                  <div className="w-full mb-3">
                    <WorkOrdersPreview userId={user.id} date={date} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full px-2">
            <div className=" card mb-4">
              <EmptyList text="Selectionnez une date" />
            </div>
          </div>
        )}
      </div>

      <div className="w-full ">
        <Button
          canClick={form.formState.isValid}
          loading={loading}
          actionText="Valider"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
