import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";
import { UploadCategoryForm } from "../components";
import { useUploadCategory } from "../hooks";
import { useUpdateUploadCategory } from "../hooks/useUpdateUploadCategory";

type IUpdateUploadCategory = {
  id: string;
};

export const UpdateUploadCategory = () => {
  const { id } = useParams<IUpdateUploadCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/uploads");
    }
  }, []);
  const { data, refetch } = useUploadCategory(+id!);
  const { form, submit, loading } = useUpdateUploadCategory({
    id: +id!,
    onCompleted: async () => {
      await refetch();
      toast.success("La catégorie a été modifié avec succès");
      navigate(`/uploads/category/${id}`);
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (data?.uploadCategory?.ok && data?.uploadCategory?.result) {
      const { result } = data?.uploadCategory;
      form.setValue("name", result.name);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Type de Contats"
        subtitle="Modifier un Type de Upload"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/uploads",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <UploadCategoryForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
