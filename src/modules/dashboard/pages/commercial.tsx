import React from "react";
import moment from "moment";
import { CardHeader } from "../../../components/cards";
import { ContractStatus } from "../../../__generated__/globalTypes";
import { ContactsPreview } from "../../contacts/components";
import { ContractsPreview } from "../../contracts/components";
import { useMe } from "../../users/hooks/useMe";

export const Commercial: React.FC = () => {
  const { data: meData, loading } = useMe();

  if (loading) return <div>Loading...</div>;
  if (!meData?.me) return <div>Not found</div>;

  return (
    <>
      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full md:w-1/3  px-4 mb-4 md:mb-0"></div>
        </div>
      </div>

      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card mb-2">
              <CardHeader title="Propositions en Attente" />

              <ContractsPreview
                where={{
                  madeById: meData?.me?.id,
                  status: ContractStatus.Pending,
                }}
              />
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader title="Anniversaire" />

              <ContactsPreview
                where={{ birthday: moment().format("yyyy-MM-DD").toString() }}
                hideCreateButton
                message="Aucun anniversaire aujourd'hui"
              />
            </div>
          </div>
        </section>
        <div className="flex flex-wrap  -m-3"></div>
      </div>
    </>
  );
};
