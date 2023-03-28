import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { Button } from "../../../components/button";

interface IBugForm {
  loading: boolean;
  submit: any;
  form: UseFormReturn<any, any>;
}

export const BugForm: React.FC<IBugForm> = ({ loading, submit, form }) => {
  return (
    <div className="w-full">
      <div className="w-full mb-3">
        <label className="label">
          <input {...form.register("critical")} type="checkbox" />
          <span className="ml-2">Bug Critique</span>
        </label>
        <div className="text-gray-500">
          Ne cochez cette case que lorsque le bug est critique et/ou bloquant.
          <br />
          Vous pouvez rapporter toutes les autres erreurs sans cocher cette
          case.
        </div>
      </div>

      <div className="w-full mb-3">
        <p className="label">url</p>
        <input
          className="w-full input"
          type="text"
          {...form.register("url", {
            required: "l'url est requise",
            minLength: 5,
          })}
          placeholder="https://......"
        />

        <ErrorMessage
          errors={form.formState?.errors}
          name="url"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full mb-3">
        <p className="label">object</p>
        <input
          className="w-full input"
          {...form.register("object", {
            required: "L'objet de l'erreur est requis",
          })}
          placeholder="object"
        />

        <ErrorMessage
          errors={form.formState?.errors}
          name="object"
          render={({ message }) => <p className="error-message">{message}</p>}
        />
      </div>

      <div className="w-full mb-3">
        <p className="label">description</p>
        <textarea
          className="w-full input"
          {...form.register("description")}
          placeholder="Description du bug ou de l'erreur"
        />
      </div>

      <div className="cardFooter">
        <div className="w-full md:w-1/2 px-2">
          <Button
            canClick={form.formState.isValid}
            loading={loading}
            actionText="Valider"
            onClick={submit}
            full={true}
          />
        </div>
      </div>
    </div>
  );
};
