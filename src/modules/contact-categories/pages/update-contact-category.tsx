import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";
import { ContactCategoryForm } from "../components";
import { useContactCategory } from "../hooks";
import { useUpdateContactCategory } from "../hooks/useUpdateContactCategory";

type IUpdateContactCategory = {
  id: string;
};

export const UpdateContactCategory = () => {
  const { id } = useParams<IUpdateContactCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/contacts");
    }
  }, []);
  const { data, refetch } = useContactCategory(+id!);
  const { form, submit, loading } = useUpdateContactCategory({
    id: +id!,
    onCompleted: async () => {
      await refetch();
      toast.success("La catégorie a été modifié avec succès");
      navigate(`/contacts/category/${id}`);
    },
    onError: (msg) => {
      toast.error(msg);
    },
  });

  useEffect(() => {
    if (data?.contactCategory?.ok && data?.contactCategory?.result) {
      const { result } = data?.contactCategory;
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
        subtitle="Modifier un Type de Contact"
        buttons={[
          {
            actionText: "Nouveau Contrat",
            bgColor: "indigo",
            textColor: "white",
            link: "/contacts",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <ContactCategoryForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
