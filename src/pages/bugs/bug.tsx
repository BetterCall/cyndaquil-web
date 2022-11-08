import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

export const Bug = () => {
  type ICustomerParams = {
    id: string;
  };

  const { id } = useParams<ICustomerParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/bugs");
    }
  }, []);

  return (
    <>
      <Header
        title="Bug"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: "/bugs/update",
            icon: <SendIcon />,
          },
        ]}
      />
    </>
  );
};
