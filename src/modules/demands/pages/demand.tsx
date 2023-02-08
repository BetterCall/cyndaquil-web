import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { useDemand } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { useMe } from "../../users/hooks/useMe";
import { ResolveDemand } from "../components/resolve-demand";

type IDemandParams = {
  id: string;
};

export const Demand: React.FC = () => {
  const { id } = useParams<IDemandParams>();
  const { data: meData } = useMe();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/demands");
    }
  }, []);

  const { data, loading, refetch } = useDemand(+id!);
  if (loading) return <Loading />;

  const renderRepport = () => {
    if (data?.demand?.result?.treated && data?.demand?.result?.report) {
      return (
        <div className="flex flex-col">
          <p className="mb-2">{data?.demand?.result?.report}</p>
        </div>
      );
    } else if (meData?.me?.id === data?.demand.result?.targetUser.id) {
      return (
        <ResolveDemand
          id={+id!}
          treated={data?.demand?.result?.treated}
          report={data?.demand?.result?.report}
        />
      );
    } else {
      return <EmptyList text="Demande non traitée" />;
    }
  };

  return (
    <>
      <Header
        title={data?.demand?.result?.object || ""}
        subtitle={data?.demand?.result?.openedBy?.firstname}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "red",
            textColor: "white",
            link: `/demand/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <div className="section">
          <div className="left">
            <div className="card mb-2">
              <CardHeader title="Demande" />
              <p className="mb-2">
                <div className="label">Objet :</div>
                {data?.demand?.result?.object}
              </p>
              <p className="mb-2">
                <div className="label">Receptionné Par : </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/demands?openedById=${data?.demand?.result?.openedBy.id}`
                    )
                  }
                >
                  {data?.demand?.result?.openedBy.firstname}{" "}
                  {data?.demand?.result?.openedBy.lastname}
                </div>
              </p>

              <p className="mb-2">
                <div className="label">A l'intention de : </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/demands?targetUserId=${data?.demand?.result?.targetUser?.id}`
                    )
                  }
                >
                  {data?.demand?.result?.targetUser.firstname}{" "}
                  {data?.demand?.result?.targetUser.lastname}
                </div>
              </p>

              {data?.demand?.result?.customer ? (
                <p className="mb-2">
                  <div className="label">Client : </div>
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/demands?customerId=${data?.demand?.result?.customer?.id}`
                      )
                    }
                  >
                    {data?.demand?.result?.customer.name}{" "}
                  </div>
                </p>
              ) : null}

              {data?.demand?.result?.site ? (
                <p className="mb-2">
                  <div className="label">Copropriété : </div>

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/demands?siteId=${data?.demand?.result?.site?.id}`
                      )
                    }
                  >
                    {data?.demand?.result?.site.name}
                    {"-"}
                    {data?.demand?.result?.site.city}{" "}
                  </div>
                </p>
              ) : null}

              <p className="mb-2 ">
                <div className="label">Support : </div>

                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/demands?type=${data?.demand?.result?.type}`)
                  }
                >
                  {data?.demand?.result?.type}
                </div>
              </p>

              <p className="mb-2  ">
                <div className="label">Message : </div>
                {data?.demand?.result?.message}
              </p>
            </div>
          </div>

          <div className="right">
            <div className="card mb-2">
              <CardHeader title="Rapport" />
              {renderRepport()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
