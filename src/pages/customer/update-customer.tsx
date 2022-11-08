import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../components/loading";
import { CustomerForm } from "../../components/customers";

import { CUSTOMER, UPDATE_CUSTOMER } from "../../queries/customers.queries";
import {
  CustomerQuery,
  CustomerQueryVariables,
} from "../../__generated__/CustomerQuery";
import {
  UpdateCustomerMutation,
  UpdateCustomerMutationVariables,
} from "../../__generated__/UpdateCustomerMutation";
import { UpdateCustomerInput } from "../../__generated__/globalTypes";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

type IUpdateCustomer = {
  id: string;
};

export const UpdateCustomer = () => {
  const { id } = useParams<IUpdateCustomer>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const form = useForm<UpdateCustomerInput>({
    mode: "all",
  });

  const { data, refetch } = useQuery<CustomerQuery, CustomerQueryVariables>(
    CUSTOMER,
    {
      variables: {
        id: +id!,
      },
    }
  );

  const calledOnce = React.useRef(false);
  useEffect(() => {
    if (calledOnce.current) {
      return;
    }

    if (data?.customer?.ok && data?.customer?.result) {
      const { result } = data?.customer;
      form.setValue("name", result.name);
      form.setValue("email", result.email);
      form.setValue("phone", result.phone);
      form.setValue("categoryId", result.category?.id);

      form.setValue("streetNumber", result.streetNumber);
      form.setValue("street", result.street);
      form.setValue("city", result.city);
      form.setValue("postal", result.postal);
      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);

      calledOnce.current = true;
    }
  }, [data]);

  const [mutation, { loading }] = useMutation<
    UpdateCustomerMutation,
    UpdateCustomerMutationVariables
  >(UPDATE_CUSTOMER);

  const submit = async () => {
    if (loading) return;
    const { categoryId, ...input } = form.getValues();

    const { data } = await mutation({
      variables: {
        id: +id!,
        input: {
          categoryId: +categoryId!,
          ...input,
        },
      },
    });

    if (data?.updateCustomer.ok) {
      refetch();
      navigate(`/customers`);
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <Header
        title={data?.customer?.result?.name ?? ""}
        subtitle="Modifier les informations du client"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/customers/${data?.customer?.result?.id}`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerForm loading={loading} form={form} submit={submit} />
      </div>
    </>
  );
};
