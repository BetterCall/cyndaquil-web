import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../../../components/button";
import { CardHeader } from "../../../components/cards";
import { InlineSelectUploadCategory } from "../../upload-categories/components";

interface IUploadForm {
  loading: boolean;
  form: UseFormReturn<any, any>;
  submit: any;
  disabledFields?: string[];
}

export const UploadForm: React.FC<IUploadForm> = ({
  loading,
  submit,
  form,
  disabledFields = [],
}) => {
  const [preview, setPreview] = useState<any>(null);
  const file = form.watch("file");
  useEffect(() => {
    let objectUrl: any;
    if (file) {
      // create the preview
      objectUrl = URL.createObjectURL(file[0]);
      setPreview(objectUrl);
    } else {
      URL.revokeObjectURL(objectUrl);
    }

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <section className="section">
      <div className="element">
        <div className="card">
          <CardHeader title="Informations Générales" />

          <div className="w-full mb-3">
            <p className="label">Fichier</p>
            <input
              type="file"
              accept="image/*"
              {...form.register("file", { required: true })}
            />
          </div>
          {file && <img src={preview} />}
        </div>
      </div>

      <div className="element">
        <div className="card">
          <CardHeader title="Informations Générales" />

          <div className="w-full mb-3">
            <p className="label">Catégorie</p>
            <input
              className="w-full input"
              type="text"
              {...form.register("category")}
            />
            <InlineSelectUploadCategory form={form} />
          </div>

          <div className="w-full mb-3">
            <p className="label">Informations</p>
            <textarea
              className="w-full input"
              {...form.register("informations")}
            />
          </div>
          <div className="flex justify-between">
            <div />
            <div>
              <Button
                canClick={form.formState.isValid}
                loading={loading}
                actionText="Valider"
                onClick={submit}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
