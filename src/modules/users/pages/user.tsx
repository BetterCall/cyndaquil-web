import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { ContractStatus, Database } from "../../../__generated__/globalTypes";
import { BugsPreview } from "../../bugs/components";
import { ContractsPreview } from "../../contracts/components";
import { CustomersPreview } from "../../customer/components/customers-preview";
import { DemandsPreview } from "../../demands/components";
import { PaymentsPreview } from "../../payments/components";
import { TransfersPreview } from "../../transfers/components";
import { CreateUploadModal } from "../../uploads/modals";
import { VisitsPreview } from "../../visits/components";
import { WorkOrdersPreview } from "../../work-orders/components";
import { EditUserButton } from "../buttons";
import { useUser } from "../hooks";

type IUserParams = {
  id: string;
};

export const User: React.FC = () => {
  const { id } = useParams<IUserParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, loading } = useUser(+id!);
  return (
    <>
      <Header
        title={`Utilisateur`}
        subtitle={`${data?.user?.result?.firstname} ${data?.user?.result?.lastname}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/user/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="flex mb-3">
          <EditUserButton id={+id!} />
        </div>

        <div className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations Générales" />
              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Nom</p>
                    <input
                      className="input w-full"
                      value={data?.user?.result?.lastname}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Prénom</p>
                    <input
                      className="input w-full"
                      value={data?.user?.result?.firstname}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-1/2 mr-1 ">
                  <div className="w-full mt-3">
                    <p className="label">Email</p>
                    <input
                      className="input w-full"
                      value={data?.user?.result?.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-1">
                  <div className="w-full mt-3">
                    <p className="label">Téléphone</p>
                    <input
                      className="input w-full"
                      value={data?.user?.result?.phone}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mt-3">
                <p className="label">Rôle</p>
                <input
                  disabled
                  className="input w-full"
                  value={data?.user.result?.role}
                />
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Clients" />
              <CustomersPreview where={{ commercialId: +id! }} />
              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/customers?commercialId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="targetedDemands " />

              <DemandsPreview targetUserId={+id!} />
              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/demands?targetUserId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="openedDemands" />

              <DemandsPreview openedById={+id!} />
              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/demands?openedById=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Bons d'intervention" />
              <WorkOrdersPreview userId={+id!} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/work-orders?userId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="contractsMade" />
              <ContractsPreview where={{ madeById: +id! }} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/contracts?madeById=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="bugsReported" />
              <BugsPreview where={{ userId: +id! }} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/bugs?userId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Bon d'intervertion" />
              <WorkOrdersPreview userId={+id!} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/work-orders?userId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Rendez vous Client" />
              <VisitsPreview userId={+id!} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/visits?userId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card mb-2">
              <CardHeader title="controls" />
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Remboursements Saisis" />
              <TransfersPreview recordedById={+id!} />

              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/visits?recordedById=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Paiements Saisis" />
              <PaymentsPreview recordedById={+id!} />
              <div className="grid -mx-2 mt-2 justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/visits?recordedById=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mx-2">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Users, objectId: +id! }}
              />
              <div className="grid -mx-2 mt-2  justify-items-center ">
                <div className="w-full md:w-1/4 px-2">
                  <CreateUploadModal
                    defaultValues={{
                      database: Database.Users,
                      objectId: +id!,
                    }}
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
