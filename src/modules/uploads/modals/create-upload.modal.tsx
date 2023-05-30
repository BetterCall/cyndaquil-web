import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useCreateUpload } from "../hooks";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Button, Loading } from "../../../components";
import { InlineSelectUploadCategory } from "../../upload-categories/components";
import { useUploadCategories } from "../../upload-categories/hooks";

interface IProps {
  defaultValues?: any;
  children?: any;
}

export const CreateUploadModal: React.FC<IProps> = ({
  defaultValues,
  children,
}) => {
  const { refetch } = useUploadCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { form, submit, loading } = useCreateUpload({
    defaultValues,
    onCompleted: async () => {
      await refetch();
      toast.success("Le Fichier a été uploadé avec succès");
      setIsModalOpen(false);
      form.setValue("informations", "");
      form.setValue("file", "");
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset();
      form.setValue(
        "url",
        window.location.pathname + "" + window.location.search
      );
      form.setValue("critical", false);
    }
  }, [isModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [preview, setPreview] = useState<any>(null);
  const file = form.watch("file");
  useEffect(() => {
    let objectUrl: any;

    try {
      if (file) {
        // create the preview
        objectUrl = URL.createObjectURL(file[0]);
        setPreview(objectUrl);
      } else {
        URL.revokeObjectURL(objectUrl);
      }
    } catch (error) {}

    // free memory when ever this component is unmounted
    return () => {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch (error) {}
    };
  }, [file]);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>{children}</div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CardHeader title="Upload un fichier" />

        {loading ? (
          <Loading />
        ) : (
          <section className="mt-10">
            <div className="w-full mb-3">
              <p className="label">Fichier</p>
              <input
                className="w-full input"
                type="file"
                accept="image/*"
                {...form.register("file", { required: true })}
              />

              {file && <img src={preview} />}
            </div>

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
            <div className="flex justify-center">
              <div className="w-1/4">
                <Button
                  full
                  canClick={form.formState.isValid}
                  loading={loading}
                  actionText="Valider"
                  onClick={submit}
                />
              </div>
            </div>
          </section>
        )}
      </Modal>
    </>
  );
};
