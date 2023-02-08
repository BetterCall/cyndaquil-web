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
  });

  useEffect(() => {
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
        title="Nouvelle Marque"
        subtitle="Creer une nouvelle copropriété"
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

// if (data?.updateBrand.ok) {
//   client.writeFragment({
//     id: `Brand:${id}`,
//     fragment: gql`
//       fragment UpdateedBrand on Brand {
//         name
//       }
//     `,
//     data: {
//       name: input.name,
//     },
//   });
//   navigate(`/brands`);
// }
