import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../components/header";

// TO DO CHANGE

import { useUploadCategory } from "../hooks";

type IUploadCategory = {
  id: string;
};

export const UploadCategory: React.FC = () => {
  const { id } = useParams<IUploadCategory>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/uploads");
    }
  }, []);

  const { data, refetch } = useUploadCategory(+id!);

  return (
    <>
      <Header
        subtitle={data?.uploadCategory?.result?.name ?? ""}
        title={"Types de upload"}
        buttons={[]}
      />

      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0"></div>
      </div>
    </>
  );
};
