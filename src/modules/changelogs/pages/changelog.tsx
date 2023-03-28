import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { DemandsPreview } from "../../demands/components";
import { useChangelog } from "../hooks";

type IChangelogParams = {
  id: string;
};

export const Changelog = () => {
  const { id } = useParams<IChangelogParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/changelogs");
    }
  }, []);

  const { data, loading } = useChangelog(+id!);

  if (loading) return <Loading />;

  return (
    <>
      <Header
        title={`${data?.changelog?.result?.event} ${data?.changelog?.result?.database} `}
        subtitle={`Modification faite par : ${data?.changelog?.result?.user?.firstname} ${data?.changelog?.result?.user?.lastname}`}
      />
      <div className="main-container">
        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Informations Générales" />
            </div>
          </div>

          <div className="element">
            <div className="card mb-2">
              <CardHeader title="Client" />
            </div>

            <div className="card">
              <CardHeader title="Site" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
