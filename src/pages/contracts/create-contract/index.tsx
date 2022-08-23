import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { emplacementIdsVar } from "../../../apollo";
import { Button } from "../../../components/button";
import { Card } from "../../../components/cards";
import { FormHeader } from "../../../components/form";
import { FormError } from "../../../components/form-error";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useEquipmentCategories } from "../../../hooks/useEquipementCategories";
import { useSite } from "../../../hooks/useSite";
import { DashboardLayout } from "../../../layouts/dashboard.layout";
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
import { Building } from "./building";

type ICreateContractParams = {
  id: string;
};

interface ICreateForm {
  name: string;
}

export const CreateContract = () => {
  const navigate = useNavigate();
  const { data: categoriesData } = useEquipmentCategories();
  const emplacementIds = useReactiveVar(emplacementIdsVar);
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

    const { data: mData } = await mutate({
      variables: {
        input: {
          name,
          emplacementIds,
          siteId: +id!,
        },
      },
    });

    console.log(mData);
    if (mData?.generateContract?.ok) {
      console.log("ok");
    }
  };

  const toggleEmplacementId = (id: number) => {
    var index = emplacementIds.indexOf(id);
    let newArray = [];
    console.log("index ,n", index);
    if (index === -1) {
      newArray = [...emplacementIds, id];
    } else {
      newArray = emplacementIds.filter((i) => i !== id);
    }

    console.log("newArray ,", newArray);
    emplacementIdsVar([...newArray]);
    console.log("emplacementIds ", emplacementIds);
  };

  const toggleCategoryId = (id: number, checked: boolean) => {
    const emplacements: any = [];
    data?.siteEmplacements?.result?.buildings?.forEach((building) => {
      building?.entrances?.forEach((entrance) => {
        entrance?.floors?.forEach((floor) => {
          floor?.emplacements?.forEach((emplacement) => {
            if (emplacement.category?.id === id) {
              emplacements.push(emplacement.id);
            }
          });
        });
      });
    });

    console.log(emplacements);

    let newArray = [];
    if (checked) {
      newArray = [...emplacementIds, ...emplacements];
      // @ts-ignore
      newArray = [...new Set(newArray)];
    } else {
      newArray = emplacementIds.filter((i) => !emplacements.includes(i));
    }

    console.log("newArray ,", newArray);
    emplacementIdsVar([...newArray]);
    console.log("emplacementIds ", emplacementIds);
  };

  return (
    <DashboardLayout>
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
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/4 px-4 mb-4 md:mb-0 relative">
            <div className=" xl:h-screen  xl:sticky  xl:top-8">
              <Card>
                <FormHeader subtitle="" title="Selection Rapide" />
                {categoriesData?.equipmentCategories?.results?.map(
                  (category) => (
                    <div key={`category-${category.id}`}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        onClick={(event) => {
                          //@ts-ignore
                          toggleCategoryId(category.id, event.target.checked);
                        }}
                      />
                      {category.id} {category.name}
                    </div>
                  )
                )}
              </Card>
            </div>
          </div>
          <div className="w-full xl:w-1/4 px-4 mb-4 md:mb-0 relative">
            <div className=" xl:h-screen  xl:sticky  xl:top-8">
              <Card>
                <FormHeader subtitle="" title="Liste des equipements" />
                {data?.siteEmplacements?.result?.name} <br />
                emplacements : <br />
                {emplacementIds.map((id) => (
                  <div>{id}</div>
                ))}
                <Button
                  onClick={generate}
                  canClick={true}
                  loading={loading}
                  actionText={"Générer le contrat"}
                />
              </Card>
            </div>
          </div>
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0">
            <Card>
              <FormHeader subtitle="" title="Liste des equipements" />

              <input
                {...register("name", { required: "name required" })}
                placeholder="firstname"
                className="input w-full mb-5"
              />
              {errors.name?.message && (
                <FormError message={errors.name?.message} />
              )}
              {data?.siteEmplacements?.result?.buildings?.map((building) => (
                <div className="px-4">
                  <FormHeader subtitle={building.name} title="Batiment" />
                  {building?.entrances?.map((entrance) => (
                    <div className="px-4">
                      <FormHeader subtitle={entrance.name} title="Entrée" />
                      {entrance?.floors?.map((floor) => (
                        <div className="px-4">
                          <FormHeader subtitle={floor.name} title="Etage" />
                          {floor.emplacements?.map((emplacement) => (
                            <div>
                              <input
                                checked={emplacementIds.includes(
                                  emplacement.id
                                )}
                                type="checkbox"
                                className="mr-2"
                                onClick={() =>
                                  toggleEmplacementId(emplacement.id)
                                }
                              />
                              {emplacement.id} {emplacement.category?.name}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
