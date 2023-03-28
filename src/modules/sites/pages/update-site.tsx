import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "../../../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { SiteForm } from "../components";
import { useSite, useUpdateSite } from "../hooks";

type IUpdateSite = {
  id: string;
};

export const UpdateSite: React.FC = () => {
  const { id } = useParams<IUpdateSite>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const [loaded, setLoaded] = useState(false);
  const { data, refetch } = useSite(+id!);
  const { form, submit, loading } = useUpdateSite({
    id: +id!,
    onCompleted: () => {
      refetch();
      toast.success("L'immeuble a été modifié avec succès");
    },
  });

  useEffect(() => {
    if (data?.site?.ok && data?.site?.result && !loaded) {
      const { result } = data?.site;
      form.setValue("name", result.name);
      form.setValue("buildingsCount", result.buildingsCount);
      form.setValue("entrancesCount", result.entrancesCount);
      form.setValue("name", result.name);
      form.setValue("customerId", result.customer?.id);
      form.setValue("managerId", result.managerId);
      form.setValue("streetNumber", result.streetNumber);
      form.setValue("street", result.street);

      form.setValue("postal", result.postal);
      form.setValue("city", result.city);

      form.setValue("lat", result.lat);
      form.setValue("lng", result.lng);

      setLoaded(true);
    }
  }, [data]);

  if (!loaded) {
    return (
      <div className="main-container">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header
        title="Immeuble"
        subtitle="Modifier l'immeuble"
        buttons={[
          {
            actionText: "annuler",
            bgColor: "indigo",
            textColor: "white",
            link: `/site/${id}`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <SiteForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};
