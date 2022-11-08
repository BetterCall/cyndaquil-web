import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { emplacementIdsVar } from "../../../apollo";
import { SelectBenefit } from "../../../components/benefits";
import { Button } from "../../../components/button";
import { Card, CardHeader } from "../../../components/cards";
import { FormHeader } from "../../../components/form";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useEquipmentCategories } from "../../../hooks/useEquipementCategories";
import { GENERATE_CONTRACT } from "../../../queries/contracts.queries";
import { SITE_EMPLACEMENTS } from "../../../queries/sites.queries";
import {
  GenerateContractMutation,
  GenerateContractMutationVariables,
} from "../../../__generated__/GenerateContractMutation";
import {
  SiteEmplacementsQuery,
  SiteEmplacementsQueryVariables,
} from "../../../__generated__/SiteEmplacementsQuery";

type ICreateContractParams = {
  id: string;
};

interface ICreateForm {
  name: string;
}

type RowType = {
  emplacementId: number;
  benefitId: number;
  categoryId: number;
};

export const CreateContract = () => {
  const navigate = useNavigate();
  const { data: categoriesData } = useEquipmentCategories();

  const [rows, setRows] = useState<RowType[]>([]);

  const { id } = useParams<ICreateContractParams>();
  useEffect(() => {
    emplacementIdsVar([]);
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const { data } = useQuery<
    SiteEmplacementsQuery,
    SiteEmplacementsQueryVariables
  >(SITE_EMPLACEMENTS, { variables: { id: +id! } });

  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<ICreateForm>({
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const [mutate, { loading }] = useMutation<
    GenerateContractMutation,
    GenerateContractMutationVariables
  >(GENERATE_CONTRACT);
  const generate = async () => {
    if (loading) return;

    const { name } = getValues();

    console.log("input ", {
      name,
      rows: rows.map((row) => ({
        emplacementId: parseInt(row.emplacementId + ""),
        benefitId: parseInt(row.benefitId + ""),
      })),
      siteId: +id!,
    });

    // const { data: mData } = await mutate({
    //   variables: {
    //     input: {
    //       name,
    //       rows: rows.map((row) => ({
    //         emplacementId: parseInt(row.emplacementId + ""),
    //         benefitId: parseInt(row.benefitId + ""),
    //       })),
    //       siteId: +id!,
    //     },
    //   },
    // });

    // if (mData?.generateContract?.ok) {
    // }
  };

  const toggleRow = (emplacementId, categoryId) => {
    console.log("ROWS ", rows);
    var index = rows.findIndex(
      (element) => element?.emplacementId === emplacementId
    );
    console.log("INDEX ", index);
    let newArray: any[] = [];
    if (index === -1) {
      newArray = [...rows, { emplacementId, categoryId, benefitId: -1 }];
    } else {
      newArray = rows;
      newArray = newArray.filter(
        (element) => element.emplacementId !== emplacementId
      );
    }

    setRows([...newArray]);
  };

  const toggleCategoryId = (id: number, checked: boolean) => {
    const rowsAdded: any = [];
    data?.siteEmplacements?.result?.buildings?.forEach((building) => {
      building?.entrances?.forEach((entrance) => {
        entrance?.floors?.forEach((floor) => {
          floor?.emplacements?.forEach((emplacement) => {
            if (emplacement.category?.id === id) {
              rowsAdded.push({
                emplacementId: emplacement.id,
                benefitId: -1,
                categoryId: id,
              });
            }
          });
        });
      });
    });

    // TO DO
    let newArray: any[] = [];
    if (checked) {
      newArray = [...rowsAdded, ...rows];
      // @ts-ignore
      newArray = [...new Set(newArray)];
    } else {
      newArray = rows;
      newArray = newArray.filter((row) => {
        console.log("row ", row);
        return row.categoryId !== id;
      });
    }

    setRows([...newArray]);
  };

  return (
    <>
      <Header
        title={data?.siteEmplacements?.result?.name ?? ""}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/sites/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="w-full  mb-4 md:mb-0">
          <Card>
            <CardHeader title="Information Générales" />
            <input
              {...register("name", { required: "name required" })}
              placeholder="Nom du contrat"
              className="input w-full mb-5"
            />
            <textarea className="input w-full" rows={4} />
          </Card>
        </div>

        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full px-4 mb-4 md:mb-0 relative">
            <Card>
              <FormHeader subtitle="" title="Selection Rapide" />

              <table className="table-auto w-full">
                <thead>
                  <tr className="text-xs text-gray-500">
                    <th className="padding-table  font-medium text-left w-25">
                      Tous
                    </th>
                    <th className="padding-table  font-medium text-center">
                      Nombre
                    </th>
                    <th className="padding-table  font-medium text-center ">
                      Type
                    </th>
                    <th className="padding-table  font-medium text-center ">
                      Service
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesData?.equipmentCategories?.results?.map(
                    (category, index) => (
                      <tr
                        key={`category-${category.id}`}
                        className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
                      >
                        <td className="flex padding-table">
                          <input
                            type="checkbox"
                            className="cursor-pointer "
                            onChange={(event) => {
                              //@ts-ignore
                              console.log(event.target.checked);
                              toggleCategoryId(
                                category.id,
                                event.target.checked
                              );
                            }}
                          />
                        </td>

                        <td className="padding-table text-center">
                          <input
                            className="input"
                            disabled
                            value={
                              rows.filter(
                                (row) => row.categoryId === category.id
                              ).length
                            }
                          />
                        </td>
                        <td className="padding-table text-center">
                          <div className="relative">{category?.name}</div>
                        </td>
                        <td className="padding-table text-center">
                          <SelectBenefit
                            error={false}
                            categoryId={category?.id || -1}
                            setValue={(e) => {
                              const newRows = rows;
                              newRows.map((row) => {
                                if (row.categoryId === category.id) {
                                  row.benefitId = e.target.value;
                                }
                              });
                              console.log(newRows);
                              setRows([...newRows]);
                            }}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </div>

          {data?.siteEmplacements?.result?.buildings?.map((building) => (
            <div className="w-full px-4  ">
              <Card>
                <CardHeader title={`Batiment ${building.name}`} />
                {building?.entrances?.map((entrance) => (
                  <div className="px-4 border-b mb-4 pb-2">
                    <div className="text-xl mb-2">Entrée {entrance.name}</div>
                    {entrance?.floors?.map((floor) => (
                      <div className="px-4 mb-2">
                        <div className="font-bold mb-1">
                          Etage : {floor.name} :
                        </div>
                        {floor.emplacements?.map((emplacement) => {
                          const index = rows.findIndex(
                            (row) => row?.emplacementId === emplacement.id
                          );

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
                                        {emplacement.category?.name} {index}{" "}
                                        {rows[index]?.benefitId} dsd
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                {index !== -1 ? (
                                  <SelectBenefit
                                    error={rows[index].benefitId === -1}
                                    categoryId={emplacement.category?.id || -1}
                                    value={rows[index].benefitId}
                                    setValue={(e) => {
                                      const newRows = rows;
                                      newRows[index].benefitId = e.target.value;
                                      setRows([...newRows]);
                                    }}
                                  />
                                ) : (
                                  <div className="w-full"></div>
                                )}
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
    </>
  );
};
