import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { FilesPreview } from "../../../components/files-preview";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Database } from "../../../__generated__/globalTypes";
import { PricesPreview } from "../../prices/components";
import { CreateUploadModal } from "../../uploads/modals";
import { EditBenefitButton } from "../buttons";
import { BenefitsPreview } from "../components";
import { useBenefit } from "../hooks";

type IBenefit = {
  id: string;
};

export const Benefit = () => {
  const { id } = useParams<IBenefit>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, loading, error } = useBenefit(+id!);

  if (loading) {
    return <Loading />;
  }

  if (data?.benefit?.result === null || error || data?.benefit?.ok === false) {
    console.log(error);
    return <div>Erreur</div>;
  }

  return (
    <>
      <Header
        title="Service"
        subtitle={`Service : ${data?.benefit?.result?.category?.name} - ${data?.benefit?.result?.name}`}
      />
      <div className="main-container">
        <div className="flex mb-3">
          <EditBenefitButton id={+id!} />
        </div>

        <div className="section">
          <div className="w-full mx-2 mb-3">
            <div className="card">
              <CardHeader title="Fichiers" />
              <FilesPreview
                where={{ database: Database.Benefits, objectId: +id! }}
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
                    defaultValues={{
                      database: Database.Benefits,
                      objectId: +id!,
                    }}
                  >
                    <div className="btn">Nouveau Fichier</div>
                  </CreateUploadModal>
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader title="Tarications" />
              <PricesPreview benefitId={+id!} />
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader
                title="Autre services"
                subtitle={`La liste des autres services pour : ${data?.benefit?.result?.category?.name}`}
              />
              {data?.benefit?.result?.categoryId ? (
                <BenefitsPreview
                  where={{ categoryId: data?.benefit?.result?.categoryId }}
                />
              ) : null}

              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <Link
                    to={`/benefits?categoryId=${data?.benefit?.result?.categoryId}`}
                  >
                    <div className="btn btn-primary">
                      Ajouter un nouveau service
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
