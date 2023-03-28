import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyList } from "../../../components";
import { CardHeader } from "../../../components/cards";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { BugStatus, UserRole } from "../../../__generated__/globalTypes";
import { useMe } from "../../users/hooks/useMe";
import { ReportBugForm } from "../components";
import { useBug } from "../hooks";

type IBugParams = {
  id: string;
};

export const Bug = () => {
  const { data: meData } = useMe();
  const { id } = useParams<IBugParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/bugs");
    }
  }, []);

  const { data } = useBug(+id!);

  return (
    <>
      <Header
        title="Bug"
        subtitle={data?.bug?.result?.object ?? ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: "/bugs/update",
            icon: <SendIcon />,
          },
        ]}
      />

      {data?.bug?.result?.critical ? (
        <div className="p-3">
          <div className="p-6 bg-white border-l-4  border-red-500 shadow-md rounded-r-lg">
            <div className="flex items-center mb-2">
              <h3 className="text-red-800 font-medium">BUG CRITIQUE</h3>
            </div>
            <div className="pr-6">
              <p className="text-sm text-red-600">
                Le ticket est considéré comme critique, il est donc important de
                le traiter au plus vite.
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full px-3">
        <div className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Information" />
              <div className="w-full">
                <p className="label">Ouvert par</p>
                <div className="w-full">
                  <input
                    type="text "
                    className="input w-full"
                    disabled
                    value={`${data?.bug?.result?.user?.firstname} ${data?.bug?.result?.user?.lastname}`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <p className="label">Status</p>
                <input
                  type="text "
                  className="input w-full"
                  disabled
                  value={data?.bug?.result?.status}
                />
              </div>
              <div className="mt-3">
                <p className="label">Url</p>
                <input
                  type="text "
                  className="input w-full"
                  disabled
                  value={data?.bug?.result?.url}
                />
              </div>
              <div className="mt-3">
                <p className="label">Ouvert le</p>
                <input
                  type="text "
                  className="input w-full"
                  disabled
                  value={moment(data?.bug?.result?.createdAt).format("dddd LL")}
                />
              </div>

              <div className="mt-3">
                <p className="label">Description</p>
                <textarea
                  className="input w-full"
                  value={data?.bug?.result?.description ?? ""}
                  disabled
                ></textarea>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Rapport" />
              <p>
                {}

                {data?.bug?.result?.status === BugStatus.Pending ? (
                  <EmptyList text="Le ticket n'a pas été encore traité" />
                ) : (
                  <p>{data?.bug?.result?.report ?? "Aucun rapport"}</p>
                )}
              </p>
              {meData?.me?.role === UserRole.Admin ? (
                <ReportBugForm bugId={+id!} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
