import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../../../components/button";
import { EquipmentCategoriesInput } from "../../equipment-categories/components";

import { SiteInput } from "../../sites/components/site-input";
import { useDuplicateBuildingEmplacements } from "../hooks/useDuplicateBuildingEmplacements";

interface IProps {
  siteId: number;
  refetch?: () => void;
}

export const DuplicateEmplacementsForm: React.FC<IProps> = ({
  siteId,
  refetch = () => null,
}) => {
  const { form, submit, loading } = useDuplicateBuildingEmplacements({
    defaultValues: {
      siteId,
    },
    onCompleted: () => {
      refetch();
      toast.success("Emplacement Dupliqué avec succès");
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  return (
    <div>
      <div className="w-full mt-3">
        <SiteInput form={form} disabled={true} />
      </div>

      <div className="w-full mt-3">
        <p className="label">Batiment</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("building", {
            required: "Ce champ est obligatoire",
          })}
          placeholder="Batiment"
        />
      </div>
      <ErrorMessage
        errors={form.formState?.errors}
        name="building"
        render={({ message }) => <p className="error-message">{message}</p>}
      />
      <div className="w-full mt-3">
        <p className="label">Entrée</p>
        <input
          className="w-full input"
          // @ts-ignore
          {...form.register("entrance")}
          placeholder="Entrée"
        />
      </div>

      <div className="w-full mt-3">
        <Button
          actionText="Valider"
          canClick={form.formState.isValid}
          onClick={submit}
          loading={loading}
        />
      </div>
    </div>
  );
};
