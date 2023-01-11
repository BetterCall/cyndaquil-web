import React from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { BenefitForm } from "../components";
import { useCreateBenefit } from "../hooks";

export const CreateBenefit: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateBenefit({
    defaultValues: parseSearchParams(params),
    onCompleted: () => alert("ok"),
  });

  return (
    <>
      <Header
        title="Nouveau Service"
        subtitle="Creer un nouveau service"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/benefices`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="card">
          <BenefitForm
            form={form}
            loading={loading}
            submit={submit}
            disabledFields={Object.keys(parseSearchParams(params))}
          />
        </div>
      </div>
    </>
  );
};
