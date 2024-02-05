import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CardHeader } from "../../../../components/cards";
import { Header } from "../../../../components/header";
import { SendIcon } from "../../../../components/icons";
import { Loading } from "../../../../components";
import {
  EmplacementForm,
  DuplicateEmplacementsForm,
} from "../../../emplacements/components";
import {
  useCreateEmplacement,
  useEmplacements,
} from "../../../emplacements/hooks";
import { useSite } from "../../hooks";
import { EmplacementPreview } from "../../../emplacements/modals";

type ISiteParams = {
  id: string;
};

export const SiteEmplacements: React.FC = () => {
  const { id } = useParams<ISiteParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const {
    data: siteData,
    loading: siteLoading,
    refetch: siteRefetch,
  } = useSite(+id!);
  const { data, refetch } = useEmplacements({ where: { siteId: +id! } });
  const {
    form,
    submit,
    loading: mLoading,
  } = useCreateEmplacement({
    defaultValues: { siteId: +id! },
    onCompleted: (id) => {
      toast.success("Emplacement créé avec succès");
      refetch();
    },
    onError: (message) => {
      toast.error(message);
    },
  });

  const [buildings, setBuildings] = useState({});

  useEffect(() => {
    if (data?.emplacements?.results) {
      let emplacements = {};
      data?.emplacements?.results.map((emplacement) => {
        console.log(emplacement);

        if (!emplacements.hasOwnProperty(emplacement.building)) {
          emplacements[emplacement.building] = {};
        }
        if (
          !emplacements[emplacement.building].hasOwnProperty(
            emplacement.entrance
          )
        ) {
          emplacements[emplacement.building][
            emplacement.entrance ?? "Principal"
          ] = [];
        }

        emplacements[emplacement.building][
          emplacement.entrance ?? "Principal"
        ].push(emplacement);
      });

      console.log(emplacements);
      setBuildings({ ...emplacements });
    }
  }, [data?.emplacements?.results]);

  if (siteLoading) return <Loading />;
  return (
    <>
      <Header
        title="Immeuble"
        subtitle={siteData?.site?.result?.name || ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "red",
            textColor: "white",
            link: `/site/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="section">
          <div className="element">
            <div className="card mb-3">
              <CardHeader title="Raccourcis" />

              <p className="text-sm font-medium  text-gray-500 -mb-3 ">
                Dupliquer un batiment ou une entrée pour un site. <br />
              </p>

              <DuplicateEmplacementsForm siteId={+id!} refetch={refetch} />
            </div>
          </div>
          <div className="element">
            <div className="card mb-3">
              <CardHeader title="Nouvel Emplacement" />
              <EmplacementForm
                form={form}
                submit={submit}
                loading={mLoading}
                disabledFields={["siteId"]}
              />
            </div>
          </div>
        </div>
        {Object.keys(buildings).map((key, index) => {
          return (
            <>
              <ExpendableLink title={`Batiment ${key}`}>
                {Object.keys(buildings[key]).map((key2, index2) => {
                  let emplacements = buildings[key][key2];

                  console.log(key2);
                  return (
                    <div className="w-full px-2 ">
                      <ExpendableLink title={`Entrée ${key2}`}>
                        <div className="w-full px-2 ">
                          <table className="table-auto w-full bg-white px-2">
                            <thead>
                              <tr className="text-xs text-gray-500 text-left">
                                <th className="  padding-table font-medium text-center">
                                  Etage
                                </th>
                                <th className="  padding-table font-medium text-center">
                                  Catégorie
                                </th>
                                <th className="  padding-table font-medium text-center">
                                  Code Emplacement
                                </th>
                                <th className="  padding-table font-medium text-center">
                                  Code Equipement
                                </th>
                                <th className="  padding-table font-medium text-center">
                                  Detail
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {emplacements?.map((emplacement, index) => (
                                <tr
                                  key={`emplacement-${emplacement.id}`}
                                  className={`text-xs   ${
                                    index % 2 ? "" : "bg-gray-50"
                                  } `}
                                >
                                  <td className="padding-table font-medium text-center">
                                    {emplacement?.floor || "-"}
                                  </td>

                                  <td className="padding-table  font-medium text-center ">
                                    {emplacement.category?.name}
                                  </td>
                                  <td className="padding-table text-center font-medium">
                                    {emplacement.code ?? "-"}
                                  </td>
                                  <td className="padding-table font-medium text-center ">
                                    {emplacement?.equipment?.code ?? "-"}
                                  </td>
                                  <td className="padding-table font-medium text-center ">
                                    <EmplacementPreview
                                      emplacementId={emplacement.id}
                                    >
                                      Voir Plus
                                    </EmplacementPreview>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </ExpendableLink>
                    </div>
                  );
                })}
              </ExpendableLink>
            </>
          );
        })}
        <div className="section"></div>
      </div>
    </>
  );
};

interface IExpendableLink {
  title: string;
  children: any;
  color?: string;
}

const ExpendableLink: React.FC<IExpendableLink> = ({
  title,
  children,
  color = "white",
}) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <div>
      <div
        className={`shadow relative flex mb-3 items-center cursor-pointer pl-3 py-1 h-full justify-between ${
          isOpened ? "text-black bg-gray-200 " : `bg-${color} hover:bg-gray-50`
        } 
        
        rounded`}
      >
        <div
          className=" flex flex-1  py-3 "
          onClick={() => setIsOpened((prev) => !prev)}
        >
          {/* <span className="inline-block font-extralight mr-3 ">{icon}</span> */}
          <span className=" font-bold ">{title}</span>
        </div>

        <span
          className={`inline-block ml-auto transition-all p-2 ${
            isOpened ? "" : " -rotate-90"
          }`}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <svg
            className="text-gray-400 w-3 h-3"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </div>
      <div className={` ${isOpened ? " mb-3" : "hidden "} `}>
        <div className="section">{children}</div>
      </div>
    </div>
  );
};

// {emplacements.map((emplacement) => {
//   return (
//     <div className="">
//       <EmplacementPreview
//         emplacementId={emplacement.id}
//       >
//         <div className="flex ">
//           <div className="w-1/2 mr-1">
//             <div className="w-full mb-1">
//               <p className="label">Etage</p>
//               <input
//                 className="input w-full"
//                 type="text"
//                 value={emplacement.floor ?? ""}
//                 disabled
//               />
//             </div>
//           </div>

//           <div
//             className="w-1/2 ml-1 "
//             onClick={() => {}}
//           >
//             <div className="w-full mb-1">
//               <p className="label">Catégorie</p>
//               <input
//                 className="input w-full"
//                 type="text"
//                 value={
//                   emplacement.category?.name ?? ""
//                 }
//                 disabled
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex ">
//           <div className="w-1/2 mr-1">
//             <div className="w-full mb-3">
//               <p className="label">
//                 Code Emplacement
//               </p>
//               <input
//                 className="input w-full"
//                 type="text"
//                 value={emplacement.code ?? "-"}
//                 disabled
//               />
//             </div>
//           </div>

//           <div
//             className="w-1/2 ml-1 "
//             onClick={() => {}}
//           >
//             <div className="w-full mb-3">
//               <p className="label">
//                 Code Equipment
//               </p>
//               <input
//                 className="input w-full"
//                 type="text"
//                 value={
//                   emplacement.equipment?.code ??
//                   "-"
//                 }
//                 disabled
//               />
//             </div>
//           </div>
//         </div>

//         {emplacement.informations?.lenght > 0 ? (
//           <div className="w-full mb-3">
//             <p className="label">Informations</p>
//             <textarea
//               className="input w-full"
//               value={
//                 emplacement.informations ?? ""
//               }
//               disabled
//             />
//           </div>
//         ) : null}
//       </EmplacementPreview>
//       <div className="w-full flex items-center justify-center mb-4">
//         <div className="border-b-2 border-blue-500 w-1/2 "></div>
//       </div>
//     </div>
//   );
// })}

// <div className="section">
// {Object.keys(buildings[key]).map((key2, index2) => {
//   let emplacements = buildings[key][key2];

//   console.log(key2);
//   return (
//     <div className="element">
//       <div className="card">
//         <CardHeader title={`Entrée ${key2}`} />
//         {emplacements.map((emplacement) => {
//           return (
//             <div className="">
//               <EmplacementPreview
//                 emplacementId={emplacement.id}
//               >
//                 <div className="flex ">
//                   <div className="w-1/2 mr-1">
//                     <div className="w-full mb-1">
//                       <p className="label">Etage</p>
//                       <input
//                         className="input w-full"
//                         type="text"
//                         value={emplacement.floor ?? ""}
//                         disabled
//                       />
//                     </div>
//                   </div>

//                   <div
//                     className="w-1/2 ml-1 "
//                     onClick={() => {}}
//                   >
//                     <div className="w-full mb-1">
//                       <p className="label">Catégorie</p>
//                       <input
//                         className="input w-full"
//                         type="text"
//                         value={emplacement.category?.name ?? ""}
//                         disabled
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex ">
//                   <div className="w-1/2 mr-1">
//                     <div className="w-full mb-3">
//                       <p className="label">Code Emplacement</p>
//                       <input
//                         className="input w-full"
//                         type="text"
//                         value={emplacement.code ?? "-"}
//                         disabled
//                       />
//                     </div>
//                   </div>

//                   <div
//                     className="w-1/2 ml-1 "
//                     onClick={() => {}}
//                   >
//                     <div className="w-full mb-3">
//                       <p className="label">Code Equipment</p>
//                       <input
//                         className="input w-full"
//                         type="text"
//                         value={
//                           emplacement.equipment?.code ?? "-"
//                         }
//                         disabled
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {emplacement.informations?.lenght > 0 ? (
//                   <div className="w-full mb-3">
//                     <p className="label">Informations</p>
//                     <textarea
//                       className="input w-full"
//                       value={emplacement.informations ?? ""}
//                       disabled
//                     />
//                   </div>
//                 ) : null}
//               </EmplacementPreview>
//               <div className="w-full flex items-center justify-center mb-4">
//                 <div className="border-b-2 border-blue-500 w-1/2 "></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// })}
// </div>
