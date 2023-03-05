import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useControls } from "../hooks";
import { EmptyList, Loading } from "../../../components";
import { ControlFiltersInput } from "../../../__generated__/globalTypes";

interface ICustomersPreviewProps {
  limit?: number;
  where: ControlFiltersInput;
  message?: string;
}

export const ControlsPreview: React.FC<ICustomersPreviewProps> = ({
  limit = 100,
  where,
  message = "Aucune Verfication",
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useControls({
    limit,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.controls?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  console.log("data", data);
  console.log("error", error);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Faite Par</th>
            <th className=" font-medium padding-table text-right ">Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.controls?.results?.map((control, index) => (
            <tr
              key={`control-${control.id}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="flex padding-table ">
                <div>
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => navigate(`/control/${control.id}`)}
                  >
                    {control?.user?.firstname} {control?.user?.lastname}
                  </p>
                </div>
              </td>
              <td className="font-medium padding-table text-right ">
                {moment(control?.createdAt).format("dddd LL")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
