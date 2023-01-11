import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const { form, submit, loading } = useUpdateContactCategory({
    id: +id!,
    onCompleted: async () => {
      await refetch();
      navigate(`/contacts/categories`);
    },
  });

  const { data, refetch } = useContactCategory(+id!);

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
        title="Liste des Contrats"
        subtitle="Un sous titre un peu long"
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
        <ContactCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
