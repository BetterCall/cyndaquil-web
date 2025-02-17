import React from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { parseSearchParams } from "../../../helpers/clean-object";
import { BenefitForm } from "../components";
import { useCreateBenefit } from "../hooks";

export const CreateBenefit: React.FC = () => {
  const [params] = useSearchParams();

  const { form, submit, loading } = useCreateBenefit({
    defaultValues: parseSearchParams(params),
    onCompleted: () => {
      toast.success("Le service a été créé avec succès");
    },
  });

  return (
    <>
      <Header title="Service" subtitle="Creer un nouveau service" />
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
