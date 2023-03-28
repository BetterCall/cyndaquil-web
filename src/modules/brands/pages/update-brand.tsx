import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { BrandForm } from "../components";
import { useBrand, useUpdateBrand } from "../hooks";

type IUpdateBrand = {
  id: string;
};

export const UpdateBrand = () => {
  const { id } = useParams<IUpdateBrand>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, refetch } = useBrand(+id!);

  const { form, submit, loading } = useUpdateBrand({
    id: +id!,
    onCompleted: () => {
      toast.success("La marque a été modifié avec succès");
      refetch();
    },
    onError: (msg) => toast.error(msg),
  });

  useEffect(() => {
    console.log(data);
    if (data?.brand?.ok && data?.brand?.result) {
      const input = form.getValues();
      const { result } = data?.brand;

      Object.keys(result).forEach((key) => {
        if (Object.keys(input).includes(key)) {
          // @ts-ignore
          form.setValue(key, result[key]);
        }
      });
    }
  }, [data]);

  return (
    <>
      <Header
        title="Marque"
        subtitle={`Modifier : ${data?.brand?.result?.name || "Marque"} `}
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/brands`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <BrandForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
