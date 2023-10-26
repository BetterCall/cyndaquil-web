import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import { CardHeader } from "../../../../components/cards";
import { Header } from "../../../../components/header";
import { SendIcon } from "../../../../components/icons";
import { parseSearchParams } from "../../../../helpers/clean-object";
import { useDebounce } from "../../../../hooks/useDebounce";
import { SiteInput } from "../../../sites/components/site-input";
import { useLazyWorkOrders } from "../../../work-orders/hooks";
import { InvoicePreview } from "./invoice-preview";

type IInvoiceParams = {
  workOrderId?: string;
};

export const CreateInvoice: React.FC = () => {
  const [params] = useSearchParams();
  console.log("params ", params);
  const { workOrderId } = parseSearchParams(params);
  console.log("workOrderId ", workOrderId);

  const form = useForm({
    defaultValues: {
      search: "",
      siteId: null,
    },
  });

  const { siteId, search } = form.watch();

  const [getWorkOrders, { data, loading, error }] = useLazyWorkOrders();
  const [ids, setIds] = useState<number[]>([]);

  const toggleId = (id) => {
    if (ids.includes(id)) {
      setIds(ids.filter((i) => i !== id));
    } else {
      setIds([...ids, id]);
    }
  };

  useEffect(() => {
    console.log("Site Chnaged", siteId);
    if (siteId) {
      form.setValue("search", "");
      getWorkOrders({ variables: { where: { siteId, billed: false } } });
    }
  }, [siteId]);

  const debouncedSearchTerm = useDebounce(search, 500);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        form.setValue("siteId", null);
        console.log("debounced");
        getWorkOrders({ variables: { where: { billed: false, search } } });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (workOrderId) {
      form.setValue("search", workOrderId);
      setIds([workOrderId]);
      console.log({ variables: { where: { billed: false, search } } });
      getWorkOrders({
        variables: { where: { billed: false, search: "" + workOrderId } },
      });
    }
  }, [workOrderId]);

  return (
    <>
      <Header
        title="Facture"
        subtitle="Nouvelle Facture"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/invoices`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container ">
        <section className="section">
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Rechercher les Bons d'intervention" />
              <div className="w-full p-3">
                <label className="label">
                  Rechercher un bon{" "}
                  <span className="text-gray-600 text-xs">
                    vous pouvez saisir sur numero
                  </span>
                </label>
                <input
                  className="input w-full"
                  type="text"
                  {...form.register("search")}
                />
              </div>
              <div className="w-full p-3">
                <SiteInput form={form} />
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader
                title="Liste des bons d'intervention"
                subtitle="Seuls les bons non facturés sont listés"
              />
              {data?.workOrders?.results?.map((workOrder) => (
                <div
                  key={workOrder.id}
                  className="flex justify-items-center items-center w-full pb-3  "
                >
                  <input
                    checked={ids.includes(workOrder.id)}
                    type="checkbox"
                    className="cursor-pointer "
                    onChange={(event) => {
                      //@ts-ignore
                      toggleId(workOrder.id);
                    }}
                  />
                  <span className="text font-semibold ml-2">
                    {workOrder?.id} - {workOrder?.object}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <div className="card">
              <CardHeader title="Détails" />
              <InvoicePreview ids={ids} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
