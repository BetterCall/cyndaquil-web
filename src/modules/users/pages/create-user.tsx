import React from "react";
import { useCreateUser } from "../hooks";

import { UserForm } from "../components";
import { SendIcon } from "../../../components/icons";
import { Header } from "../../../components/header";
import { CardHeader } from "../../../components/cards";

export const CreateUser: React.FC = () => {
  const { form, submit, loading } = useCreateUser({
    defaultValues: {},
    onCompleted: () => alert("ok"),
  });

  return (
    <>
      <Header
        title="Nouvel Utilisateur"
        subtitle="Creer un nouvel utilisateur"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/users`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader title="Nouvel Utilisateur" />
          <UserForm loading={loading} submit={submit} form={form} />
        </div>
      </div>
    </>
  );
};
