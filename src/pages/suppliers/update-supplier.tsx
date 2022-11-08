import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { Loading } from "../../components/loading";
import { UpdateSupplierInput } from "../../__generated__/globalTypes";
import { UPDATE_SUPPLIER, SUPPLIER } from "../../queries/suppliers.queries";
import {
  SupplierQuery,
  SupplierQueryVariables,
} from "../../__generated__/SupplierQuery";
import {
  UpdateSupplierMutation,
  UpdateSupplierMutationVariables,
} from "../../__generated__/UpdateSupplierMutation";
import { SupplierForm } from "../../components/suppliers";

type IUpdateSupplier = {
  id: string;
};

export const UpdateSupplier = () => {
  const { id } = useParams<IUpdateSupplier>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateSupplierInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<SupplierQuery, SupplierQueryVariables>(
    SUPPLIER,
    {
      variables: {
        id: +id!,
      },
    }
  );

  useEffect(() => {
    if (data?.supplier?.ok && data?.supplier?.result) {
      const { result } = data?.supplier;
      form.setValue("name", result.name);
      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);
      form.setValue("postal", result.postal);
      form.setValue("street", result.street);
      form.setValue("streetNumber", result.streetNumber);
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateSupplierMutation,
    UpdateSupplierMutationVariables
  >(UPDATE_SUPPLIER);

  const submit = async () => {
    if (loading) return;
    const input = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input,
      },
    });

    if (data?.updateSupplier.ok) {
      await refetch();
      navigate(`/suppliers`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title="Modifier le fournisseur"
        subtitle="Modifier les informations du fournisseur"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/suppliers`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SupplierForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
