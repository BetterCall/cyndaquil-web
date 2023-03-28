import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { EmptyList } from "../../../components";
import { Button } from "../../../components/button";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { SelectBenefit } from "../../benefits/components";
import { CustomerInput } from "../../customer/components";
import { useLazyEmplacements } from "../../emplacements/hooks";
import { useEquipmentCategories } from "../../equipment-categories/hooks";
import { SelectPrice } from "../../prices/components";
import { SiteInput } from "../../sites/components/site-input";
import { SelectTaxe } from "../../taxes/components";
import { useCreateContract } from "../hooks";

type RowType = {
  name: string;
  emplacementIds: number[];
  benefitId: number;
  categoryId: number;
  price: number;
  taxeId: number;
};

export const CreateContract = () => {
  const [params] = useSearchParams();

  const [, updateState] = React.useState();
  // @ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const navigate = useNavigate();
  const { data: categoriesData } = useEquipmentCategories();
  const [rows, setRows] = useState<{ [name: string]: RowType }>({});

  const { form, loading, mutate } = useCreateContract({
    defaultValues: {
      name: "",
      ...parseSearchParams(params),
    },
    onCompleted: () => {
      toast.success("La proposition a été créée avec succès");
    },
  });

  useEffect(() => {
    categoriesData?.equipmentCategories?.results?.map(
      ({ id, name }) =>
        (rows[id + ""] = {
          name,
          categoryId: id,
          benefitId: -1,
          emplacementIds: [],
          price: 0,
          taxeId: -1,
        })
    );

    forceUpdate();
  }, [categoriesData]);

  const siteId = form.watch("siteId");

  const [loadEmplacements, { data }] = useLazyEmplacements();

  useEffect(() => {
    if (siteId) {
      loadEmplacements({
        variables: {
          where: {
            siteId,
          },
        },
      });
    }
  }, [siteId]);

  const generate = async () => {
    if (loading) return;

    try {
      const filteredRow = Object.values(rows).filter(
        (row) => row.emplacementIds.length > 0 && row.benefitId !== -1
      );
      const { name, siteId } = form.getValues();

      const { data: mData, errors } = await mutate({
        variables: {
          input: {
            name,
            siteId: parseInt(siteId + ""),
            rows: filteredRow.map(({ name, ...row }) => row),
          },
        },
      });

      if (mData?.createContract?.ok) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRow = (emplacementId, categoryId) => {
    const index = rows["" + categoryId].emplacementIds.findIndex(
      (id) => id === emplacementId
    );
    if (index == -1) {
      rows["" + categoryId].emplacementIds.push(emplacementId);
    } else {
      rows["" + categoryId].emplacementIds.splice(index, 1);
    }

    forceUpdate();
  };

  const toggleCategoryId = (id: number, checked: boolean) => {
    const rowsAdded: number[] = [];

    data?.emplacements?.results?.map((emplacement) => {
      if (emplacement.category?.id === id) {
        rowsAdded.push(emplacement.id);
      }
    });

    // TO DO
    let newArray: any[] = [];
    if (checked) {
      rows["" + id].emplacementIds = [...rowsAdded];
    } else {
      rows["" + id].emplacementIds = [];
    }

    forceUpdate();
  };

  // Modal functions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    navigate(0);
    setIsModalOpen(false);
  };

  const renderRows = () => {
    if (!siteId) {
      return (
        <div className="card mb-2">
          <CardHeader title="Categorie" />
          <EmptyList text="Selectionnez un site" />
        </div>
      );
    }
    return Object.keys(rows).map((key) => {
      if (
        data?.emplacements.results
          ?.map((e) => e.category?.id)
          .includes(rows[key].categoryId)
      )
        return (
          <div className="card mb-2 ">
            <div className="mb-4">
              <div className="flex flex-wrap items-center border-b mb-3">
                <div className="flex justify-items-center items-center w-full pb-3 mb-3">
                  <input
                    type="checkbox"
                    className="cursor-pointer "
                    onChange={(event) => {
                      //@ts-ignore
                      toggleCategoryId(
                        rows[key].categoryId,
                        event.target.checked
                      );
                    }}
                  />
                  <h3 className="text-xl font-bold ml-2">{rows[key].name}</h3>
                </div>
              </div>
            </div>

            <div className=" ">
              <div className="mt-4 px-4">
                <div className="mb-2  flex justify-between">
                  <span>Quantité </span>
                  <div
                    style={{ width: "50%" }}
                    className="input w-1/2 text-right"
                  >
                    {rows[key].emplacementIds.length}
                  </div>
                </div>
                <div className="mb-2  flex justify-between  ">
                  <span>Service</span>
                  <div style={{ width: "50%" }} className="w-1/2 text-right">
                    <SelectBenefit
                      error={false}
                      categoryId={rows[key].categoryId || -1}
                      setValue={(e) => {
                        rows[key].benefitId = parseInt(e.target.value);
                        forceUpdate();
                      }}
                    />
                  </div>
                </div>
                <div className="mb-2  flex justify-between  ">
                  <span>Taxes</span>
                  <div style={{ width: "50%" }} className="w-1/2">
                    <SelectTaxe
                      error={false}
                      setValue={(e) => {
                        rows[key].taxeId = parseInt(e.target.value);
                        forceUpdate();
                      }}
                    />
                  </div>
                </div>

                <div className="mb-2  flex justify-between  ">
                  <span>Tarif</span>
                  <div style={{ width: "50%" }} className="w-1/2">
                    <SelectPrice
                      error={false}
                      categoryId={parseInt(rows[key].categoryId + "")}
                      benefitId={rows[key].benefitId}
                      setValue={(e) => {
                        const newRows = rows;
                        // setRows([...newRows]);
                      }}
                    />
                  </div>
                </div>
                <div className="mb-2  flex justify-between  border-b pb-2">
                  <span>Prix Unitaire </span>
                  <input
                    type={"number"}
                    style={{ width: "50%" }}
                    className="input w-1/2 text-right"
                    defaultValue={rows[key].price}
                    onChange={(e) => {
                      rows[key].price = parseFloat(e.target.value);
                      forceUpdate();
                    }}
                  />
                </div>

                <div className=" flex justify-between font-medium text-lg mt-2">
                  <span className=" font-medium">Montant Estimatif</span>
                  <span className=" font-medium">
                    {rows[key].price * rows[key].emplacementIds.length} € HT
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
    });
  };

  return (
    <>
      <Header
        title="Contrat"
        subtitle="Nouvelle Proposition"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/contracts`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container ">
        <div className="w-full mb-4 md:mb-0">
          <div className="card mb-2">
            <CardHeader title="Information Générales" />
            <p className="label">Objet du contrat</p>
            <input
              {...form.register("name", { required: "name required" })}
              placeholder="Objet du contrat"
              className="input w-full mb-5"
            />
            <p className="label">Note Interne</p>
            <textarea className="input w-full" rows={4} />

            <div className="w-full ">
              <CustomerInput
                form={form}
                disabled={Object.keys(parseSearchParams(params)).includes(
                  "customerId"
                )}
              />
            </div>

            <div className="w-full ">
              <SiteInput
                form={form}
                disabled={Object.keys(parseSearchParams(params)).includes(
                  "siteId"
                )}
              />
            </div>
          </div>
        </div>
        <section className="section ">
          <div className="element">{renderRows()}</div>
          <div className="right sticky top-0 z-50 ">
            <div className="card mb-2">
              <CardHeader title="Emplacements" />
              {!siteId ? (
                <EmptyList text="Selectionnez un site" />
              ) : (
                <table className="table-auto w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 text-left">
                      <th className="padding-table font-medium "></th>
                      <th className="padding-table font-medium ">Catégorie</th>
                      <th className="padding-table font-medium text-center">
                        Batiment
                      </th>
                      <th className="padding-table font-medium text-center">
                        Entrée
                      </th>
                      <th className="padding-table font-medium text-center">
                        Etage
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.emplacements.results?.map((emplacement, index) => {
                      const isSelected =
                        rows[
                          "" + emplacement?.category?.id
                        ]?.emplacementIds.findIndex(
                          (id) => id === emplacement.id
                        ) ?? -1;

                      return (
                        <tr
                          key={`emplacement-${emplacement.id}`}
                          className={`text-xs   ${
                            index % 2 ? "" : "bg-gray-50"
                          } `}
                        >
                          <td className="padding-table ">
                            <input
                              checked={isSelected !== -1}
                              type="checkbox"
                              className="mr-2 cursor-pointer "
                              onClick={() =>
                                toggleRow(
                                  emplacement.id,
                                  emplacement.category?.id
                                )
                              }
                              id={`emplacement-${emplacement.id}`}
                            />
                          </td>
                          <td className="padding-table font-medium">
                            {emplacement.category?.name} {emplacement.id}
                          </td>

                          <td className="padding-table font-medium text-center">
                            {emplacement.building}
                          </td>
                          <td className="padding-table font-medium text-center ">
                            {emplacement.entrance}
                          </td>
                          <td className="padding-table  font-medium text-center ">
                            {emplacement.floor}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </section>

        <Button
          onClick={generate}
          canClick={true}
          loading={loading}
          actionText={"Générer le contrat"}
        />
      </div>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="Reinitialiser"
        okText="Garder La selection"
      >
        <p>La Proposition a bien été créée</p>
        <p>
          Vous pouvez garder la selection active afin d'en creer une nouvelle ou
          bien la réinitialiser
        </p>
      </Modal>
    </>
  );
};
