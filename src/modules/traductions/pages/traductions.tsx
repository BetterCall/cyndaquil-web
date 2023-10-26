import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useLazyTraductions } from "../hooks";

import { parseSearchParams } from "../../../helpers/clean-object";

import { Header } from "../../../components/header";
import { CreateTraductionButton } from "../buttons";

export const Traductions: React.FC = () => {
  const [search, { data, loading, fetchMore, error }] = useLazyTraductions();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    search({
      fetchPolicy: "network-only",
      variables: {
        where: parseSearchParams(searchParams),
      },
    });
  }, [searchParams]);
  return (
    <>
      <Header title={"Traductions"} subtitle={"Liste des traductions"} />

      <div className="main-container">
        <div className="flex">
          <CreateTraductionButton />
        </div>

        <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-xs text-gray-500 text-left">
                <th className="padding-table font-medium text-left">Key</th>
                <th className="padding-table font-medium text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {data?.traductions?.results?.map((traduction, index) => (
                <tr
                  key={`traduction-${traduction.id}`}
                  className={`text-xs ${index % 2 ? "" : "bg-gray-50"} `}
                >
                  <td className="flex padding-table ">
                    <div>
                      <p className="font-medium cursor-pointer">
                        {traduction?.key}
                      </p>
                    </div>
                  </td>

                  <td className="text-right padding-table ">
                    <div>
                      <p className="font-medium cursor-pointer">
                        {traduction?.value}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
