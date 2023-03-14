import { ErrorMessage } from "@hookform/error-message";
import { DatePicker, Modal, TimePicker } from "antd";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { useGenerateFromContract } from "../hooks/useGenerateFromContract";
import { WorkOrderTypeSelect } from "./work-order-type-select";

interface IGenerateFromContractBtn {
  contractId: number;
}

export const GenerateFromContractBtn: React.FC<IGenerateFromContractBtn> = ({
  contractId,
}) => {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = React.useState(false);

  const { submit, loading, form } = useGenerateFromContract({
    contractId,
    onCompleted: async (id) => {
      toast.success("Bon d'intervention généré avec succès");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(`/work-order/${id}`);
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  const date = form.watch("date");
  console.log("dater", date);

  return (
    <>
      <div
        className="btn cursor-pointer mt-2"
        onClick={() => {
          setIsOpened(true);
        }}
      >
        {loading ? "Chargement ..." : "Générer un BI "}
      </div>

      <Modal
        open={isOpened}
        onCancel={() => setIsOpened(false)}
        onOk={() => setIsOpened(false)}
        style={{
          width: "90%",
        }}
        footer={null}
      >
        <div className="mb-3">
          <CardHeader title="Générer un bon d'intervention" />
          <WorkOrderTypeSelect
            form={form}
            error="Selectionner le type d'intervention"
          />

          <p className="label  mt-3">Description</p>
          <textarea
            {...form.register("description")}
            className="w-full input"
            placeholder="Description"
          />

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
                    console.log("e", e);
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

        <Button
          actionText="Valider"
          canClick={!loading}
          loading={loading}
          onClick={() => submit()}
        />
      </Modal>
    </>
  );
};
