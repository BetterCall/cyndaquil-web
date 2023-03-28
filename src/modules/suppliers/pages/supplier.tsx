import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useSupplier } from "../hooks";

type ISupplierParams = {
  id: string;
};

export const Supplier: React.FC = () => {
  const { id } = useParams<ISupplierParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data } = useSupplier(+id!);

  return (
    <>
      <Header
        title={"Fournisseur"}
        subtitle={data?.supplier?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/supplier/${data?.supplier?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0"></div>
        </div>
      </div>
    </>
  );
};
