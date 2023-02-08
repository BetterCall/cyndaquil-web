import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { CustomerCategoryForm } from "../components";
import { useCustomerCategory, useUpdateCustomerCategory } from "../hooks";

type IUpdateCustomerCategory = {
  id: string;
};

export const UpdateCustomerCategory: React.FC = () => {
  const { id } = useParams<IUpdateCustomerCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useCustomerCategory(+id!);
  const { form, submit, loading } = useUpdateCustomerCategory({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("La catégorie a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.customerCategory?.ok && data?.customerCategory?.result) {
      const { result } = data?.customerCategory;
      form.setValue("name", result.name);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier la Catégorie de client"
        subtitle="Modifier la Catégorie"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers/categories",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
