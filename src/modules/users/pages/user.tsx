import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useUser } from "../hooks";

type IUserParams = {
  id: string;
};

export const User: React.FC = () => {
  const { id } = useParams<IUserParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, loading } = useUser(+id!);
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
            link: `/user/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
