import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SelectBenefit } from "../../components/benefits";
import { Button } from "../../components/button";
import { Card, CardHeader } from "../../components/cards";
import { CustomerInput } from "../../components/customers";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { SelectPrice } from "../../components/prices";
import { SiteInput } from "../../components/sites/site-input";
import { SelectTaxe } from "../../components/taxes";
import { parseSearchParams } from "../../helpers/clean-object";
import { useEquipmentCategories } from "../../hooks/useEquipementCategories";
import { GENERATE_CONTRACT } from "../../queries/contracts.queries";
import { SITE_EMPLACEMENTS } from "../../queries/sites.queries";
import {
  GenerateContractMutation,
  GenerateContractMutationVariables,
} from "../../__generated__/GenerateContractMutation";
import {
  SiteEmplacementsQuery,
  SiteEmplacementsQueryVariables,
} from "../../__generated__/SiteEmplacementsQuery";

interface ICreateForm {
  name: string;
  siteId: number;
  customerId: number;
}

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

  const form = useForm<ICreateForm>({
    mode: "all",
    defaultValues: {
      name: "",
      ...parseSearchParams(params),
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

  const [loadEmplacements, { data }] = useLazyQuery<
    SiteEmplacementsQuery,
    SiteEmplacementsQueryVariables
  >(SITE_EMPLACEMENTS);

  useEffect(() => {
    console.log(siteId);
    if (siteId) {
      loadEmplacements({
        variables: {
          id: siteId,
        },
      });
    }
  }, [siteId]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [mutate, { loading }] = useMutation<
    GenerateContractMutation,
    GenerateContractMutationVariables
  >(GENERATE_CONTRACT);
  const generate = async () => {
    if (loading) return;

    try {
      const filteredRow = Object.values(rows).filter(
        (row) => row.emplacementIds.length > 0 && row.benefitId !== -1
      );
      const { name, siteId, customerId } = form.getValues();

      const { data: mData, errors } = await mutate({
        variables: {
          input: {
            name,
            siteId: parseInt(customerId + ""),
            rows: filteredRow.map(({ name, ...row }) => row),
          },
        },
      });

      if (mData?.generateContract?.ok) {
        console.log("DONE", mData?.generateContract?.id);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleRow = (emplacementId, categoryId) => {
    console.log("ROWS ", rows);
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
    data?.siteEmplacements?.result?.buildings?.forEach((building) => {
      building?.entrances?.forEach((entrance) => {
        entrance?.floors?.forEach((floor) => {
          floor?.emplacements?.forEach((emplacement) => {
            if (emplacement.category?.id === id) {
              rowsAdded.push(emplacement.id);
            }
          });
        });
      });
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
    return Object.keys(rows).map((key) => (
      <div className="w-full px-4  ">
        <Card>
          <div className="mb-4">
            <div className="flex flex-wrap items-center border-b mb-3">
              <div className="flex justify-items-center items-center w-full pb-3 mb-3">
                <input
                  type="checkbox"
                  className="cursor-pointer "
                  onChange={(event) => {
                    //@ts-ignore
                    console.log(event.target.checked);
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
                      console.log(e.target.value);
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
                      console.log(e.target.value);
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
                      console.log(newRows);
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
                    console.log(parseFloat(e.target.value));
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
        </Card>
      </div>
    ));
  };

  return (
    <>
      <Header
        title="Nouveau Contrat"
        subtitle="Un sous titre un peu long"
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

      <div className="main-container">
        <div className="w-full  mb-4 md:mb-0">
          <Card>
            <CardHeader title="Information Générales" />
            <input
              {...form.register("name", { required: "name required" })}
              placeholder="Nom du contrat"
              className="input w-full mb-5"
            />
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
          </Card>
        </div>

        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full    mb-4 md:mb-0">{renderRows()}</div>

          {data?.siteEmplacements?.result?.buildings?.map((building) => (
            <div className="w-full px-4  ">
              <Card>
                <CardHeader title={`Batiment ${building.name}`} />
                {building?.entrances?.map((entrance) => (
                  <div className="px-4 border-b mb-4 pb-2">
                    <div className="text-xl mb-2">Entrée {entrance.name}</div>
                    {entrance?.floors?.map((floor) => (
                      <div className="px-4 mb-2">
                        {floor.emplacements?.length > 0 && (
                          <div className="font-bold mb-1">
                            Etage : {floor.name} :
                          </div>
                        )}

                        {floor.emplacements?.map((emplacement) => {
                          const index =
                            rows[
                              "" + emplacement?.category?.id
                            ]?.emplacementIds.findIndex(
                              (id) => id === emplacement.id
                            ) ?? -1;

                          return (
                            <div className=" flex row mb-2">
                              <input
                                checked={index !== -1}
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

                              <div className="flex row justify-around w-full">
                                <div className="w-full md:mr-2">
                                  <div className="relative">
                                    <select
                                      className="input appearance-none w-full "
                                      disabled
                                    >
                                      <option
                                        value={"row.emplacement.category.name}"}
                                      >
                                        {emplacement.category?.name}
                                      </option>
                                    </select>
                                  </div>
                                </div>

                                <div className="w-full"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </Card>
            </div>
          ))}
        </div>
        <Button
          onClick={generate}
          canClick={true}
          loading={loading}
          actionText={"Générer le contrat"}
        />
      </div>

      <Modal
        title="Basic Modal"
        visible={isModalOpen}
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
