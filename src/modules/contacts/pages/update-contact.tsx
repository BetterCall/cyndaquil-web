import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";
import { ContactForm } from "../components";
import { useContact, useUpdateContact } from "../hooks";

type IUpdateCustomerCategory = {
  id: string;
};

export const UpdateContact: React.FC = () => {
  const { id } = useParams<IUpdateCustomerCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const [loaded, setLoaded] = useState(false);
  const { data, refetch } = useContact(+id!);

  const { form, submit, loading } = useUpdateContact({
    id: +id!,
    onCompleted: async () => {
      await refetch();
      alert("ok");
    },
  });

  useEffect(() => {
    if (data?.contact?.ok && data?.contact?.result) {
      const { result } = data?.contact;
      Object.keys(result).forEach((key) => {
        if (typeof result[key] !== "object" && key !== "id") {
          // @ts-ignore
          form.setValue(key, result[key]);
          console.log(key, result[key]);
        }
      });

      setLoaded(true);
    }
  }, [data]);

  if (!loaded) {
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
        <div className="card">
          <ContactForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
