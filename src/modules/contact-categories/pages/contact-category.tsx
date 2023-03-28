import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

// TO DO CHANGE
import { RemoveBenefitModal } from "../../benefits/components";

import { useContactCategory } from "../hooks";

type IContactCategory = {
  id: string;
};

export const ContactCategory: React.FC = () => {
  const { id } = useParams<IContactCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/contacts");
    }
  }, []);

  const { data, refetch } = useContactCategory(+id!);

  return (
    <>
      <Header
        subtitle={data?.contactCategory?.result?.name ?? ""}
        title={"Types de contact"}
        buttons={[]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0"></div>
      </div>
    </>
  );
};
