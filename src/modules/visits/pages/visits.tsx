import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";

import { useLazyVisits } from "../hooks";

import { SearchVisitsInput } from "../components";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Row } from "../../../components/tables";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";
import moment from "moment";

export const Visits: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore, error }] = useLazyVisits();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        limit,
        offset: 0,
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);

  console.log(data);
  console.log(error);

  const renderList = () => {
    if (loading) return <Loading />;

    if (data?.visits?.error || error) {
      return (
        <EmptyList error text={data?.visits?.error ?? error?.message ?? ""} />
      );
    }

    if (data?.visits?.results?.length === 0) {
      return <EmptyList text="Aucun Rendez-vous" />;
    } else {
      return (
        <table className="table-auto w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Utilisateur</th>
              <th className="padding-table font-medium text-center">Client</th>
              <th className="padding-table font-medium text-center">Etat</th>
              <th className="padding-table font-medium text-center">Object</th>
              <th className="padding-table font-medium text-center">Date</th>
              <th className="padding-table font-medium text-right">Heure</th>
            </tr>
          </thead>
          <tbody>
            {data?.visits?.results?.map((visit, index) => (
              <Row
                index={index}
                key={`visit-${visit.id}`}
                onClick={() => navigate(`/visit/${visit.id}`)}
              >
                <td className="padding-table flex">
                  <div>
                    <p className="font-medium cursor-pointer">
                      {visit.user?.firstname}
                    </p>
                  </div>
                </td>

                <td className="padding-table text-center ">
                  {visit.customer?.name}
                </td>

                <td className="padding-table text-center ">{visit.status}</td>
                <td className="padding-table text-center ">{visit?.object}</td>
                <td className="padding-table text-center ">
                  {moment(`${visit?.date} ${visit?.start}`).format("dddd LL")}
                </td>
                <td className="padding-table text-right ">
                  {moment(`${visit?.date} ${visit?.start}`).format("HH:mm")}
                </td>
              </Row>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <>
      <Header
        title={"Rendez-vous"}
        subtitle={"Liste des Rendez-vous"}
        buttons={[
          {
            actionText: "Nouveau Rendez-vous",
            bgColor: "indigo",
            textColor: "white",
            link: `/visit/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <SearchVisitsInput {...parseSearchParams(searchParams)} />

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>
        {data?.visits?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.visits?.results?.length,
                  limit,
                  where: parseSearchParams(searchParams),
                },
              });
            }}
          />
        )}
      </div>
    </>
  );
};
