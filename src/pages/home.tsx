import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ME_QUERY } from "../queries/user.queries";
import { MeQuery } from "../__generated__/MeQuery";

export const Home = () => {
  const { data } = useQuery<MeQuery>(ME_QUERY);
  console.log(data?.me);
  return (
    <div className="max-w-screen-2xl mx-auto mt-8  ">
      <div className="flex justify-around max-w-2xl mx-auto ">
        <Link to="/users" className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </Link>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">clients</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>

        <div className="flex flex-col group items-center ">
          <div
            className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{
              backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
            }}
          ></div>
          <span className="mt-1 text-sm text-center font-medium">user</span>
        </div>
      </div>
    </div>
  );
};
