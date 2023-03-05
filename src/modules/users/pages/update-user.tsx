import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Loading } from "../../../components/loading";

import { UserForm } from "../components";
import { useUpdateUser, useUser } from "../hooks";

type IUpdateUser = {
  id: string;
};

export const UpdateUser: React.FC = () => {
  const { id } = useParams<IUpdateUser>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useUser(+id!);
  const { form, submit, loading } = useUpdateUser({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("L'utilisateur a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.user?.ok && data?.user?.result) {
      const { result } = data?.user;
      form.setValue("email", result.email);
      form.setValue("firstname", result.firstname);
      form.setValue("lastname", result.lastname);
      form.setValue("role", result.role);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title={`${data?.user?.result?.firstname} ${data?.user?.result?.lastname}`}
        subtitle={data?.user?.result?.email}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/user/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <CardHeader title="Modifier un Utilisateur" />
          <UserForm loading={loading} form={form} submit={submit} />
        </div>
      </div>
    </>
  );
};
