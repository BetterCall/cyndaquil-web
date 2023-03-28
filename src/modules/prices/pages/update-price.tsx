import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { DashboardIcon } from "../../../components/icons";
import { PriceForm } from "../components";
import { usePrice, useUpdatePriceRule } from "../hooks";

type IPriceParams = {
  id: string;
};

export const UpdatePrice: React.FC = () => {
  const { id } = useParams<IPriceParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/price-rules");
    }
  }, []);

  const { data, refetch } = usePrice(+id!);
  const { form, submit, loading } = useUpdatePriceRule({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("Le tarif spécial a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.priceRule) {
      const {
        priceRule: { result },
      } = data;
      form.setValue("amount", result?.amount);
      form.setValue("type", result?.type);
      form.setValue("description", result?.description);
      form.setValue("benefitId", result?.benefit?.id);
      form.setValue("customerCategoryId", result?.customerCategory?.id);
      form.setValue("equipmentCategoryId", result?.equipmentCategory?.id);
      form.setValue("customerId", result?.customer?.id);
    }
  }, [data]);

  return (
    <>
      <Header
        title="Règle de tarification"
        subtitle="Modification Règle de tarification"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/prices",
            icon: <DashboardIcon />,
          },
        ]}
      />
      <div className="main-container">
        <PriceForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={["categoryId", "benefitId", "customerId"]}
        />
      </div>
    </>
  );
};
