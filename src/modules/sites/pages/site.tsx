import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChangeCustomer, ChangeManager } from "../modals";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { ContractStatus, Database } from "../../../__generated__/globalTypes";
import { DemandsPreview } from "../../demands/components";
import { ContactsPreview } from "../../contacts/components";
import { ContractsPreview } from "../../contracts/components";
import { EmplacementsPreview } from "../../emplacements/components/preview";
import { CreateEmplacement } from "../../emplacements/modals";
import { WorkOrdersPreview } from "../../work-orders/components";
import { useSite } from "../hooks";
import { Button, EmptyList, Loading } from "../../../components";
import { FilesPreview } from "../../../components/files-preview";
import { CreateUploadModal } from "../../uploads/modals";

type ISiteParams = {
  id: string;
};

export const Site: React.FC = () => {
  const { id } = useParams<ISiteParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const { data, loading, refetch } = useSite(+id!);
  if (loading) return <Loading />;

  return (
    <>
      <Header
        title="Immeuble"
        subtitle={data?.site?.result?.name || ""}
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
        <div className="w-full bg-red-200 mb-4 card flex items-center justify-between">
          <p className="font-bold">
            Aucune étude n'a été réalisée pour ce site
          </p>
          <Button
            actionText="Completer le site"
            onClick={() => navigate(`/site/${id}/emplacements`)}
          />
        </div>
        <div className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations générales" />
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Numero de rue</p>

                    <input
                      className="w-full input"
                      placeholder="streetNumber"
                      disabled
                      value={data?.site?.result?.streetNumber}
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
                  value={data?.site?.result?.street}
                />
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mb-3">
                    <p className="label">Ville</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.site?.result?.city}
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mb-3">
                    <p className="label">Code Postal</p>
                    <input
                      className="w-full input"
                      disabled
                      value={data?.site?.result?.postal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card  ">
              <CardHeader title="Emplacements " />
              <EmplacementsPreview siteId={+id!} />
              <div className="flex flex-wrap -mx-2 mt-3">
                <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                  <div
                    className="btn"
                    onClick={() => navigate(`/site/${id}/emplacements`)}
                  >
                    <svg
                      className="mr-2"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99989 0.666687C7.90554 0.666687 6.82191 0.882235 5.81086 1.30102C4.79981 1.71981 3.88115 2.33364 3.10733 3.10746C1.54453 4.67027 0.666555 6.78988 0.666555 9.00002C0.65927 10.9243 1.32555 12.7905 2.54989 14.275L0.883222 15.9417C0.76759 16.0589 0.68926 16.2077 0.658115 16.3693C0.62697 16.531 0.644405 16.6983 0.708222 16.85C0.777437 17 0.889642 17.126 1.03059 17.212C1.17155 17.2981 1.33489 17.3403 1.49989 17.3334H8.99989C11.21 17.3334 13.3296 16.4554 14.8924 14.8926C16.4552 13.3298 17.3332 11.2102 17.3332 9.00002C17.3332 6.78988 16.4552 4.67027 14.8924 3.10746C13.3296 1.54466 11.21 0.666687 8.99989 0.666687V0.666687ZM8.99989 15.6667H3.50822L4.28322 14.8917C4.43843 14.7356 4.52555 14.5243 4.52555 14.3042C4.52555 14.084 4.43843 13.8728 4.28322 13.7167C3.19204 12.6267 2.51253 11.1921 2.36046 9.65735C2.20839 8.12256 2.59317 6.58253 3.44924 5.29962C4.30531 4.01672 5.57971 3.07032 7.05532 2.62166C8.53092 2.17301 10.1164 2.24986 11.5417 2.83911C12.967 3.42837 14.1439 4.49358 14.8719 5.85326C15.5999 7.21294 15.8339 8.78297 15.5342 10.2959C15.2344 11.8087 14.4193 13.1709 13.2278 14.1502C12.0364 15.1295 10.5422 15.6655 8.99989 15.6667V15.6667ZM13.1666 8.16669H4.83322C4.61221 8.16669 4.40025 8.25448 4.24397 8.41076C4.08769 8.56704 3.99989 8.77901 3.99989 9.00002C3.99989 9.22103 4.08769 9.433 4.24397 9.58928C4.40025 9.74556 4.61221 9.83335 4.83322 9.83335H13.1666C13.3876 9.83335 13.5995 9.74556 13.7558 9.58928C13.9121 9.433 13.9999 9.22103 13.9999 9.00002C13.9999 8.77901 13.9121 8.56704 13.7558 8.41076C13.5995 8.25448 13.3876 8.16669 13.1666 8.16669ZM11.4999 11.5H6.49989C6.27887 11.5 6.06691 11.5878 5.91063 11.7441C5.75435 11.9004 5.66655 12.1123 5.66655 12.3334C5.66655 12.5544 5.75435 12.7663 5.91063 12.9226C6.06691 13.0789 6.27887 13.1667 6.49989 13.1667H11.4999C11.7209 13.1667 11.9329 13.0789 12.0891 12.9226C12.2454 12.7663 12.3332 12.5544 12.3332 12.3334C12.3332 12.1123 12.2454 11.9004 12.0891 11.7441C11.9329 11.5878 11.7209 11.5 11.4999 11.5ZM6.49989 6.50002H11.4999C11.7209 6.50002 11.9329 6.41222 12.0891 6.25594C12.2454 6.09966 12.3332 5.8877 12.3332 5.66669C12.3332 5.44567 12.2454 5.23371 12.0891 5.07743C11.9329 4.92115 11.7209 4.83335 11.4999 4.83335H6.49989C6.27887 4.83335 6.06691 4.92115 5.91063 5.07743C5.75435 5.23371 5.66655 5.44567 5.66655 5.66669C5.66655 5.8877 5.75435 6.09966 5.91063 6.25594C6.06691 6.41222 6.27887 6.50002 6.49989 6.50002V6.50002Z"
                        fill="#8880EB"
                      ></path>
                    </svg>
                    <span>Tous</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <CreateEmplacement
                    onCompleted={refetch}
                    defaultValues={{ siteId: +id! }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Client" />
              {data?.site?.result?.customer ? (
                <div>
                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div
                        className="w-full mb-3 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/customer/${data?.site?.result?.customerId}`
                          )
                        }
                      >
                        <p className="label">Nom du client</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.name}
                          className="input w-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div
                        className="w-full mb-3 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/sites?customerId=${data?.site?.result?.customer?.id}`
                          )
                        }
                      >
                        <p className="label">Nb. d'immeuble en gestion</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.sitesCount}
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full mb-3 ">
                        <p className="label">Categorie de client</p>
                        <input
                          disabled
                          value={
                            data?.site?.result?.customer?.category?.name ?? ""
                          }
                          className="input w-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full mb-3 ">
                        <p className="label">Commercial</p>
                        <input
                          disabled
                          value={
                            data?.site?.result?.customer?.commercialId
                              ? `${data?.site?.result?.customer?.commercial?.firstname} ${data?.site?.result?.customer?.commercial?.lastname}`
                              : "Aucun Commercial assigné"
                          }
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full mb-3 ">
                        <p className="label">Téléphone</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.phone}
                          className="input w-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full mb-3 ">
                        <p className="label">Email</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.email ?? ""}
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full mb-3 ">
                    <p className="label">Informations Complémentaires</p>
                    <textarea
                      disabled
                      value={"TO DO"}
                      className="input w-full"
                    />
                  </div>
                </div>
              ) : (
                <EmptyList text="Aucun Client" />
              )}

              <div className="flex flex-wrap -mx-2 mt-3">
                <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                  <div className="btn">
                    <svg
                      className="mr-2"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99989 0.666687C7.90554 0.666687 6.82191 0.882235 5.81086 1.30102C4.79981 1.71981 3.88115 2.33364 3.10733 3.10746C1.54453 4.67027 0.666555 6.78988 0.666555 9.00002C0.65927 10.9243 1.32555 12.7905 2.54989 14.275L0.883222 15.9417C0.76759 16.0589 0.68926 16.2077 0.658115 16.3693C0.62697 16.531 0.644405 16.6983 0.708222 16.85C0.777437 17 0.889642 17.126 1.03059 17.212C1.17155 17.2981 1.33489 17.3403 1.49989 17.3334H8.99989C11.21 17.3334 13.3296 16.4554 14.8924 14.8926C16.4552 13.3298 17.3332 11.2102 17.3332 9.00002C17.3332 6.78988 16.4552 4.67027 14.8924 3.10746C13.3296 1.54466 11.21 0.666687 8.99989 0.666687V0.666687ZM8.99989 15.6667H3.50822L4.28322 14.8917C4.43843 14.7356 4.52555 14.5243 4.52555 14.3042C4.52555 14.084 4.43843 13.8728 4.28322 13.7167C3.19204 12.6267 2.51253 11.1921 2.36046 9.65735C2.20839 8.12256 2.59317 6.58253 3.44924 5.29962C4.30531 4.01672 5.57971 3.07032 7.05532 2.62166C8.53092 2.17301 10.1164 2.24986 11.5417 2.83911C12.967 3.42837 14.1439 4.49358 14.8719 5.85326C15.5999 7.21294 15.8339 8.78297 15.5342 10.2959C15.2344 11.8087 14.4193 13.1709 13.2278 14.1502C12.0364 15.1295 10.5422 15.6655 8.99989 15.6667V15.6667ZM13.1666 8.16669H4.83322C4.61221 8.16669 4.40025 8.25448 4.24397 8.41076C4.08769 8.56704 3.99989 8.77901 3.99989 9.00002C3.99989 9.22103 4.08769 9.433 4.24397 9.58928C4.40025 9.74556 4.61221 9.83335 4.83322 9.83335H13.1666C13.3876 9.83335 13.5995 9.74556 13.7558 9.58928C13.9121 9.433 13.9999 9.22103 13.9999 9.00002C13.9999 8.77901 13.9121 8.56704 13.7558 8.41076C13.5995 8.25448 13.3876 8.16669 13.1666 8.16669ZM11.4999 11.5H6.49989C6.27887 11.5 6.06691 11.5878 5.91063 11.7441C5.75435 11.9004 5.66655 12.1123 5.66655 12.3334C5.66655 12.5544 5.75435 12.7663 5.91063 12.9226C6.06691 13.0789 6.27887 13.1667 6.49989 13.1667H11.4999C11.7209 13.1667 11.9329 13.0789 12.0891 12.9226C12.2454 12.7663 12.3332 12.5544 12.3332 12.3334C12.3332 12.1123 12.2454 11.9004 12.0891 11.7441C11.9329 11.5878 11.7209 11.5 11.4999 11.5ZM6.49989 6.50002H11.4999C11.7209 6.50002 11.9329 6.41222 12.0891 6.25594C12.2454 6.09966 12.3332 5.8877 12.3332 5.66669C12.3332 5.44567 12.2454 5.23371 12.0891 5.07743C11.9329 4.92115 11.7209 4.83335 11.4999 4.83335H6.49989C6.27887 4.83335 6.06691 4.92115 5.91063 5.07743C5.75435 5.23371 5.66655 5.44567 5.66655 5.66669C5.66655 5.8877 5.75435 6.09966 5.91063 6.25594C6.06691 6.41222 6.27887 6.50002 6.49989 6.50002V6.50002Z"
                        fill="#8880EB"
                      ></path>
                    </svg>
                    <span>Message</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <ChangeCustomer onCompleted={refetch} siteId={+id!} />
                </div>
              </div>
            </div>
          </div>
          <div className="element ">
            <div className="card">
              <CardHeader title="Gestionnaire" />

              {data?.site?.result?.managerId ? (
                <div>
                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div
                        className="w-full mb-3 cursor-pointer"
                        onClick={() =>
                          navigate(`/contact/${data?.site?.result?.managerId}`)
                        }
                      >
                        <p className="label">Nom du Gestionnaire</p>
                        <input
                          disabled
                          value={`${data?.site?.result?.manager?.firstname} ${data?.site?.result?.manager?.lastname}`}
                          className="input w-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div
                        className="w-full mb-3 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/sites?managerId=${data?.site?.result?.manager?.id}`
                          )
                        }
                      >
                        <p className="label">Nb. d'immeuble en gestion</p>
                        <input
                          disabled
                          value={data?.site?.result?.manager?.sitesCount}
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 mr-1 ">
                      <div className="w-full mb-3 ">
                        <p className="label">Téléphone</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.phone}
                          className="input w-full"
                        />
                      </div>
                    </div>
                    <div className="w-1/2 ml-1">
                      <div className="w-full mb-3 ">
                        <p className="label">Email</p>
                        <input
                          disabled
                          value={data?.site?.result?.customer?.email ?? ""}
                          className="input w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-3 ">
                    <p className="label">Informations Supplementaires</p>
                    <textarea
                      disabled
                      value={data?.site?.result?.customer?.email ?? ""}
                      className="input w-full"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <EmptyList text="Aucun Gestionnaire" />
                </div>
              )}

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  {data?.site?.result?.customerId && (
                    <ChangeManager
                      onCompleted={refetch}
                      siteId={+id!}
                      customerId={data?.site?.result?.customerId}
                      managerId={data?.site?.result?.managerId}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card ">
              <CardHeader title="Contacts" />
              <ContactsPreview where={{ siteId: +id! }} />

              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/contact/create?siteId=${id}`)}
                  >
                    Nouveau Contact
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card ">
              <CardHeader title="Bons d'intervention" />
              <WorkOrdersPreview siteId={+id!} />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <CreateEmplacement
                    onCompleted={refetch}
                    defaultValues={{ siteId: +id! }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Demandes" />
              <DemandsPreview siteId={+id!} />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <CreateEmplacement
                    onCompleted={refetch}
                    defaultValues={{ siteId: +id! }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Contrats" />
              <ContractsPreview
                where={{
                  siteId: +id!,
                  status: ContractStatus.Accepted,
                }}
              />
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Proposition" />
              <ContractsPreview
                where={{
                  siteId: +id!,
                  status: ContractStatus.Pending,
                }}
              />
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Brouillon" />
              <ContractsPreview
                emptyText="Aucun Brouillon"
                where={{
                  siteId: +id!,
                  status: ContractStatus.Draft,
                }}
              />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/contract/create?siteId=${id}`)}
                  >
                    Nouvelle proposition
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Propositions Refusée" />
              <ContractsPreview
                emptyText="Aucune Proposition refusée"
                where={{
                  siteId: +id!,
                  status: ContractStatus.Declined,
                }}
              />
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Sites, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  {/* <div
                    className="btn"
                    onClick={() =>
                      navigate(`/upload/create?database=Sites&objectId=${id}`)
                    }
                  >
                    Nouveau Fichier
                  </div> */}
                  <CreateUploadModal
                    defaultValues={{ database: Database.Sites, objectId: +id! }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
