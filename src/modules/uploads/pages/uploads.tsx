import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseSearchParams } from "../../../helpers/clean-object";
import FileViewer from "react-file-viewer";

import { useLazyUploads } from "../hooks";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { Row } from "../../../components/tables";
import { Button } from "../../../components/button";
import { EmptyList, Loading } from "../../../components";
import { File } from "../../../components/file";

export const Uploads: React.FC = () => {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const [search, { data, loading, fetchMore }] = useLazyUploads();

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

  const renderList = () => {
    if (loading) return <Loading />;

    if (data?.uploads?.results?.length === 0) {
      return <EmptyList text="Aucun Remboursement" />;
    } else {
      return (
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-xs text-gray-500 text-left">
              <th className="padding-table font-medium">Fichier</th>
              <th className="padding-table font-medium text-center">
                Utilisateur
              </th>
              <th className="padding-table font-medium text-center">
                Informations
              </th>
              <th className="padding-table font-medium text-center">
                télécharger
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.uploads?.results?.map((upload, index) => (
              <Row index={index} key={`upload-${upload.id}`}>
                <td className="padding-table  ">
                  <File
                    url={upload.url}
                    publicLink={upload.thumbnaiPublicLink + "/download"}
                  />
                </td>
                <td className="padding-table text-center">
                  <div>
                    Ajouté par : {upload.user?.firstname}{" "}
                    {upload.user?.lastname}
                  </div>
                  <div>date : 12/12/2012</div>
                </td>
                <td className="padding-table text-center">
                  <div>{upload.informations} </div>
                </td>
                <td className="padding-table text-center ">
                  <a href={upload.publicLink + "/download"}>Telecharger</a>
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
      <Header title={"Fichier"} subtitle="Liste des fichiers" buttons={[]} />
      <div className="main-container">
        {/* <SearchTransfersInput {...parseSearchParams(searchParams)} /> */}

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          {renderList()}
        </div>

        {data?.uploads?.hasMore && (
          <Button
            canClick={!loading}
            loading={loading}
            actionText="Plus"
            onClick={() => {
              fetchMore({
                variables: {
                  offset: data?.uploads?.results?.length,
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
