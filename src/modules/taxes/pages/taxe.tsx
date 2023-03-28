import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useTaxe } from "../hooks";

type ITaxe = {
  id: string;
};

export const Taxe: React.FC = () => {
  const { id } = useParams<ITaxe>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useTaxe(+id!);

  return (
    <>
      <Header
        title="Taxe"
        subtitle=""
        buttons={[
          {
            actionText: "Modifier la Taxe",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxe/update/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">TO DO</div>
    </>
  );
};
