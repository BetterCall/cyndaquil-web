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
      <div className="element">
        <div className="card">
          <CardHeader title="Facture " />
          <div className="flex flex-col">
            <label className="label">Facture</label>
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
                <label className="label">Résultats</label>
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
              <div className="w-full mb-3">
                <p className="label">Immeuble</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={invoice?.site?.name}
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Numero de rue</p>

                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.site?.streetNumber}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Complément</p>
                    <input
                      className="w-full input"
                      type="text"
                      placeholder="Bis"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="w-full input"
                  disabled
                  value={invoice?.site?.street}
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>
                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.site?.city}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.site?.postal}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-3">
                <p className="label">Date de facturation</p>
                <input
                  className="w-full input"
                  disabled
                  value={moment(invoice?.createdAt).format("dddd LL")}
                />
              </div>
            </div>
          ) : (
            <EmptyList text="Selectionnez le numéro de facture" />
          )}
        </div>
      </div>
      <div className="element">
        <div className="card">
          <CardHeader title="Client" />
          {invoice ? (
            <div>
              <div className="w-full mb-3">
                <p className="label">Nom</p>
                <input
                  type="text"
                  className="input w-full"
                  disabled
                  value={invoice?.customer?.name}
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Numero de rue</p>

                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.customer?.streetNumber}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Complément</p>
                    <input
                      className="w-full input"
                      type="text"
                      placeholder="Bis"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-3">
                <p className="label">Adresse</p>
                <input
                  className="w-full input"
                  disabled
                  value={invoice?.customer?.street}
                />
              </div>
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>
                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.customer?.city}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      disabled
                      value={invoice?.customer?.postal}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EmptyList text="Selectionnez le numéro de facture" />
          )}
        </div>
      </div>
    </section>
  );
};
