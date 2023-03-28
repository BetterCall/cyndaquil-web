import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useCreateWorkOrder, useLazyWorkOrder } from "../hooks";

import { WorkOrderForm } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";
import { useLazySite } from "../../sites/hooks";

export const CreateWorkOrder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [fetchWorkOrder] = useLazyWorkOrder();
  const [fetchSite] = useLazySite();

  const { form, submit, loading } = useCreateWorkOrder({
    defaultValues: {
      ...parseSearchParams(searchParams),
      rows: [],
    },
    onCompleted: (id) => {
      toast.success("Le BI a été créée avec succès");
      setTimeout(() => {
        navigate(`/work-order/${id}`);
      }, 1000);
    },
    onError: (msg) => toast.error(msg),
  });

  useEffect(() => {
    // get search params and fill form
    // if siteid is present, get customer id and fill form
    // if workorderid is present, get workorder and fill form
    const loadData = async () => {
      const { workOrderId, siteId } = parseSearchParams(searchParams);
      if (workOrderId) {
        const { data } = await fetchWorkOrder({
          variables: { id: +workOrderId },
        });

        const keys = [
          "lat",
          "lng",
          "streetNumber",
          "street",
          "postal",
          "city",
          "object",
          "description",
          "type",
          "customerId",
          "siteId",
          "userId",
        ];
        Object.keys(data?.workOrder?.result ?? {}).forEach((key) => {
          if (
            keys.includes(key) &&
            data?.workOrder?.result &&
            data?.workOrder?.result[key]
          ) {
            // @ts-ignore
            form.setValue(key, data?.workOrder?.result[key]);
          }
        });
        form.setValue("workOrderId", workOrderId);
        console.log(data);
      }
      if (siteId) {
        const { data } = await fetchSite({ variables: { id: +siteId } });
        if (data?.site?.result?.customerId) {
          form.setValue("customerId", data?.site?.result?.customerId);
        }
      }
    };

    loadData(); // run it, run it
  }, [searchParams]);

  return (
    <>
      <Header
        title={"Bon d'intervention"}
        subtitle="Creer un nouveau bon d'intervention"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-orders`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <WorkOrderForm
          loading={loading}
          submit={submit}
          form={form}
          disabledFields={Object.keys(parseSearchParams(searchParams))}
        />
      </div>
    </>
  );
};
