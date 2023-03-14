import React, { useState } from "react";
import { Modal } from "antd";
import { useUpdateEmplacement } from "../hooks";
import { CardHeader } from "../../../components/cards";
import { toast } from "react-toastify";
import { EquipmentInput } from "../../equipments/components";

interface IProps {
  id: number;
  defaultValues: any;
}

export const UpdateEmplacementCode: React.FC<IProps> = ({
  id,
  defaultValues,
}) => {
  const { form, submit, loading } = useUpdateEmplacement({
    id,
    defaultValues,
    onCompleted: () => toast.success("ok"),
    onError: (message) => toast.error(message),
  });

  console.log("vbalues", form.getValues());
  return (
    <div className="w-full">
      <CardHeader title="Code de l'emplacement" />

      <div className="w-full mt-3">
        <p className="label">Code</p>
        <input className="input w-full" {...form.register("code")} disabled />
      </div>
      <div className="w-full mt-3">
        <EquipmentInput form={form} />
      </div>
    </div>
  );
};
