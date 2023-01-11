import { useQuery } from "@apollo/client";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SITE } from "../sites.queries";
import {
  SiteQuery,
  SiteQueryVariables,
} from "../../../__generated__/SiteQuery";

import { CompleteButton } from "./complete-button";

type ICreateEntranceParams = {
  id: string;
};

export const SiteInit = () => {
  const { id } = useParams<ICreateEntranceParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/sites");
    }
  }, []);

  const { data, error, refetch, networkStatus, loading } = useQuery<
    SiteQuery,
    SiteQueryVariables
  >(SITE, { variables: { id: +id! } });

  return (
    <>
      <div className="mb-8 p-8 bg-indigo-500  ">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <h2 className="text-3xl text-white font-bold">
              {data?.site?.result?.name}
            </h2>
            <p className="text-indigo-50">informations supplémentaires</p>
          </div>
          <div className="w-full lg:w-1/3 px-4 flex items-center"></div>
        </div>
      </div>
      <div className="main-container ">
        <section className="py-8">
          <div className="  ">
            <div className="flex flex-wrap -mx-4 mb-4">
              <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0 ">
                <section className="  ">
                  <div className="flex items-center w-full justify-between">
                    <div className="w-full lg:w-auto flex items-center mb-4 lg:mb-0">
                      <h2 className="text-2xl font-bold">Batiments</h2>
                    </div>
                  </div>
                </section>

                <div className={`bg-white p-3 rounded shadow`}></div>
              </div>

              <div className="w-full lg:w-6/12 px-4"></div>
            </div>

            <div className="flex flex-wrap -mx-4 ">
              <div className="w-full lg:w-6/12 px-4 mb-8 lg:mb-0 "></div>
            </div>
          </div>
        </section>

        <div className="w-full flex items-center justify-center">
          <CompleteButton siteId={+id!} />
        </div>
      </div>
    </>
  );
};
