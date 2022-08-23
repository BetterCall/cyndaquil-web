import { useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "../components/header";
import { DashboardLayout } from "../layouts/dashboard.layout";
import { ME_QUERY } from "../queries/user.queries";
import { MeQuery } from "../__generated__/MeQuery";

export const Home = () => {
  const { data } = useQuery<MeQuery>(ME_QUERY);
  console.log(data?.me);
  return (
    <DashboardLayout>
      <Header title="Dashboard" subtitle="Bonjour Bryann" buttons={[]} />
      <div className=" main-container ">
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

          <Link to="/customers" className="flex flex-col group items-center ">
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">
              clients
            </span>
          </Link>

          <Link
            to="/customers/categories"
            className="flex flex-col group items-center "
          >
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">
              Category client
            </span>
          </Link>

          <Link to="sites" className="flex flex-col group items-center ">
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">Sites</span>
          </Link>

          <Link
            to="/equipments/categories"
            className="flex flex-col group items-center "
          >
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">
              Equipement
              <br />
              catgorie
            </span>
          </Link>

          <Link to="/calls" className="flex flex-col group items-center ">
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">Calls</span>
          </Link>

          <Link to="/contracts" className="flex flex-col group items-center ">
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">
              Contracts
            </span>
          </Link>

          <Link to="/work-orders" className="flex flex-col group items-center ">
            <div
              className=" w-14 h-14 bg-cover group-hover:bg-gray-100 rounded-full"
              style={{
                backgroundImage: `url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebiconspng.com%2Fwp-content%2Fuploads%2F2016%2F12%2FPeople-Icon-File.png&f=1&nofb=1)`,
              }}
            ></div>
            <span className="mt-1 text-sm text-center font-medium">
              Work Order - BI
            </span>
          </Link>

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
    </DashboardLayout>
  );
};
