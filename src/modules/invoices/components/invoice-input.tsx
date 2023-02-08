import moment from "moment";
import React, { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { EmptyList } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { useDebounce } from "../../../hooks/useDebounce";
import { useLazyInvoice } from "../hooks";

interface IInvoiceInput {
  form: UseFormReturn<any, any>;
  disabled?: boolean;
}

export const InvoiceInput: React.FC<IInvoiceInput> = ({
  form,
  disabled = false,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const [invoice, setInvoice] = useState<any>(null);

  const [searchFn, { data, loading, called, error }] = useLazyInvoice();
  const [search, setSearch] = useState("");
  const [hasBeenSelected, setSelected] = useState(false);

  const debouncedSearchTerm = useDebounce(search, 500);

  const invoiceId = form.getValues("invoiceId");

  useEffect(() => {
    const fetchData = async (id) => {
      const { data: r } = await searchFn({
        variables: { id: +id },
      });
      if (r?.invoice?.result) {
        setIsOpened(false);
        setSelected(true);
        setSearch(id);
        form.setValue("invoiceId", id);
        setInvoice(r?.invoice?.result);
      }
    };

    if (invoiceId) {
      fetchData(invoiceId);
    }
  }, [invoiceId]);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        try {
          const id = parseInt(search);
          console.log(id);
          setIsOpened(true);
          searchFn({ variables: { id } });
        } catch (error) {
          console.log(error);
        }
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  useEffect(() => {
    if (!hasBeenSelected) form.setValue("invoiceId", null);
  }, [hasBeenSelected]);

  return (
    <section className="section">
      <div className="left">
        <div className="card">
          <CardHeader title="Facture " />
          <div className="flex flex-col">
            <label className="text-sm font-bold">Facture</label>
            <input
              className="input mb-3"
              onChange={(e) => {
                setSearch(e.target.value);
                setSelected(false);
              }}
              value={search}
              disabled={disabled}
            />

            {isOpened && search !== "" && !hasBeenSelected && (
              <>
                <label className="text-sm font-bold">Résultats</label>
                <div className="input mb-3 ">
                  {loading && <h2>Chargement ...</h2>}

                  {called && data?.invoice?.error !== null && (
                    <>
                      <h2>Aucun resultat</h2>
                    </>
                  )}

                  {data?.invoice?.result ? (
                    <div
                      className="mb-3 cursor-pointer"
                      key={`invoice-${data?.invoice?.result.id}`}
                      onClick={() => {
                        setIsOpened(false);
                        setSearch(`${data?.invoice?.result?.id}`);
                        setSelected(true);
                        form.setValue("invoiceId", data?.invoice?.result?.id);
                      }}
                    >
                      <h2 className="">·{data?.invoice?.result?.site?.name}</h2>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
          {invoice ? (
            <div>
              n° de facture : {invoice?.id}
              <br /> immeuble : {invoice?.site?.name}
              <br /> adresse :{" "}
              {invoice?.site?.streetNumber + " " + invoice?.site?.street}
              <br /> code postal : {invoice?.site?.postal}
              <br /> ville : {invoice?.site?.city}
              <br /> date de facturation :{" "}
              {moment(invoice?.createdAt).format("dddd LL")}
            </div>
          ) : (
            <EmptyList text="Selectionnez le numéro de facture" />
          )}
        </div>
      </div>
      <div className="right">
        <div className="card">
          <CardHeader title="Client" />
          {invoice ? (
            <div>
              Nom : {invoice?.customer?.name}
              <br /> adresse :
              {invoice?.customer?.streetNumber +
                " " +
                invoice?.customer?.street}
              <br /> code postal : {invoice?.customer?.postal}
              <br /> ville : {invoice?.customer?.city}
            </div>
          ) : (
            <EmptyList text="Selectionnez le numéro de facture" />
          )}
        </div>
      </div>
    </section>
  );
};
