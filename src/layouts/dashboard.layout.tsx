import { useReactiveVar } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  adminTokenVar,
  authTokenVar,
  godModeVar,
  isLoggedInVar,
} from "../apollo";
import { DashboardIcon, FileIcon, SendIcon } from "../components/icons";
import { SelectUserConnected } from "../components/select-user-connected";
import { LOCALSTORAGE_TOKEN } from "../contants";
import { CreateBugModal } from "../modules/bugs/modals";
import { CreateDemandModal } from "../modules/demands/modals";
import { useMe } from "../modules/users/hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import { Link } from "./link";
interface ILink {
  icon: any;
  title: string;
  url: string;
  newPage?: boolean;
  submenus?: ILink[];
  setOpened?: any;
}

const ExpendableLink: React.FC<ILink> = ({
  icon,
  title,
  url,
  submenus = [],
  setOpened = () => null,
}) => {
  const location = useLocation();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const submenuIsOpened = submenus
      ?.map((menu) => menu.url)
      .includes(location.pathname);

    if (submenuIsOpened) {
      setIsOpened(true);
      setOpened(true);
    }
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  return (
    <div>
      <div
        className={`relative flex items-center cursor-pointer pl-3 py-1 h-full justify-between ${
          location.pathname === url
            ? "text-white bg-gray-200 "
            : "text-gray-500 hover:bg-gray-50"
        } 
        
        rounded`}
      >
        <Link to={url} className=" flex flex-1  py-3 ">
          {/* <span className="inline-block font-extralight mr-3 ">{icon}</span> */}
          <span className=" font-normal text-sm ">{title}</span>
        </Link>

        {submenus?.length > 0 && (
          <span
            className={`inline-block ml-auto transition-all p-2 ${
              isOpened ? "" : " -rotate-90"
            }`}
            onClick={() => setIsOpened((prev) => !prev)}
          >
            <svg
              className="text-gray-400 w-3 h-3"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.08329 0.666626C8.74996 0.333293 8.24996 0.333293 7.91663 0.666626L4.99996 3.58329L2.08329 0.666626C1.74996 0.333293 1.24996 0.333293 0.916626 0.666626C0.583293 0.999959 0.583293 1.49996 0.916626 1.83329L4.41663 5.33329C4.58329 5.49996 4.74996 5.58329 4.99996 5.58329C5.24996 5.58329 5.41663 5.49996 5.58329 5.33329L9.08329 1.83329C9.41663 1.49996 9.41663 0.999959 9.08329 0.666626Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        )}
      </div>
      <div className={` ${isOpened ? "" : "hidden "} pl-3 my-2 `}>
        {submenus?.map((menu, index) => (
          <ExpendableLink
            key={`${menu.url}-${index}`}
            setOpened={setIsOpened}
            icon={menu.icon}
            title={menu.title}
            url={menu.url}
            submenus={menu.submenus}
            newPage={menu.newPage || false}
          />
        ))}
      </div>
    </div>
  );
};

export const DashboardLayout: React.FC<any> = ({ children }) => {
  const { data, refetch } = useMe();
  const [isOpened, setIsOpened] = useState(false);
  const godMode = useReactiveVar(godModeVar);

  const logout = async () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar();
    isLoggedInVar(false);
    await refetch();
  };

  return (
    <div className=" bg-body ">
      <nav className="sticky top-0 z-50 py-3 px-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <Link to="/">
            <span className="text-xl  font-semibold">Cyndaquil</span>
            {data?.me?.email}
          </Link>

          <div className="flex w-1/3  xl:w-1/6 justify-end ">
            {godMode && <SelectUserConnected />}
            <button
              onClick={() => {
                setIsOpened(true);
              }}
              className="xl:hidden navbar-burger flex items-center rounded focus:outline-none"
            >
              <svg
                className=" block h-8 w-8 p-2 rounded"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        id="content"
        className=" xl:ml-64 ml-0 pb-96 bg-body transition-all relative border-l z-10"
      >
        <div
          className={` ${
            isOpened ? "" : "hidden"
          }  xl:block navbar-menu relative z-400 transition-all`}
        >
          <div
            onClick={() => {
              setIsOpened(false);
            }}
            className="navbar-backdrop fixed xl:hidden inset-0 opacity-10 z-50"
          ></div>
          <nav className="fixed z-50 top-14 overflow-hidden overflow-y-auto  left-0 bottom-0 flex flex-col w-3/4 xl:w-64 sm:max-w-xs pt-4 pb-8 bg-white transition-all">
            <div className="px-4 pb-6">
              <div className="mb-8 text-sm font-medium">
                <ExpendableLink
                  icon={<DashboardIcon />}
                  title="Dashboard"
                  url="/"
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Salariés"
                  url="/users"
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Services"
                  url="/benefits"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Service",
                      url: "/benefit/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Clients"
                  url="/customers"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Catégories",
                      url: "/customers/categories",
                      submenus: [
                        {
                          icon: <SendIcon />,
                          title: "Catégories",
                          url: "/customers/category/create",
                        },
                      ],
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Equipement"
                  url="/equipments"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Catégories",
                      url: "/equipments/categories",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Rendez-vous"
                  url="/visits"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Rendez-vous",
                      url: "/visit/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Sites"
                  url="/sites"
                />

                <ExpendableLink
                  icon={<FileIcon />}
                  title="Contrats"
                  url="/contracts"
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Contacts"
                  url="/contacts"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Catégories",
                      url: "/contacts/categories",
                    },
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Contact",
                      url: "/contact/create",
                      newPage: true,
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Bons d'intervention"
                  url="/work-orders"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau BI",
                      url: "/work-order/create",
                    },
                    {
                      icon: <SendIcon />,
                      title: "A Facturer",
                      url: "/work-orders?status=Reviewed",
                    },
                    {
                      icon: <SendIcon />,
                      title: "A Programmer",
                      url: "/work-orders?status=Pending",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Demandes"
                  url="/demands"
                />
                <ExpendableLink
                  icon={<SendIcon />}
                  title="Fournisseurs"
                  url="/suppliers"
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Références"
                  url="/references"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle Référence",
                      url: "/reference/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Marques"
                  url="/brands"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle Marque",
                      url: "/brand/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Tarifs"
                  url="/prices"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle règle",
                      url: "/price/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Taxes"
                  url="/taxes"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle Taxe",
                      url: "/taxe/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Factures"
                  url="/invoices"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle Facture",
                      url: "/invoice/create",
                    },
                    {
                      icon: <SendIcon />,
                      title: "Impayées",
                      url: "/invoices?status=Unpaid",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Règlements"
                  url="/payments"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Règlement",
                      url: "/payment/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Relances"
                  url="/billing-reminders"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouvelle Relance",
                      url: "/billing-reminder/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Remboursements"
                  url="/transfers"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Remboursement",
                      url: "/transfer/create",
                    },
                  ]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Uploads"
                  url="/uploads"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Catégories",
                      url: "/uploads/categories",
                    },
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Contact",
                      url: "/upload/create",
                      newPage: true,
                    },
                  ]}
                />
              </div>
              <h3 className="mb-2 text-xs uppercase text-gray-500 font-medium">
                Secondary
              </h3>
              <div className="text-sm font-medium">
                <ExpendableLink
                  icon={<SendIcon />}
                  title="Permissions"
                  url="/permissions"
                  submenus={[]}
                />

                <ExpendableLink
                  icon={<SendIcon />}
                  title="Bugs"
                  url="/bugs"
                  submenus={[
                    {
                      icon: <SendIcon />,
                      title: "Nouveau Contact",
                      url: "/bug/create",
                    },
                  ]}
                />
              </div>
              <div className="pt-8">
                {(data?.me?.role === UserRole.Admin || godMode) && (
                  <div
                    onClick={() => {
                      godModeVar(!godMode);
                      adminTokenVar(authTokenVar() ?? "");
                    }}
                    className={`${
                      godMode ? "bg-amber-500 " : ""
                    } cursor-pointer flex items-center pl-3 py-3 pr-2 hover:bg-amber-300 rounded `}
                  >
                    <span className="inline-block mr-4">
                      <svg
                        className="text-gray-600 w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.7666 7.9583L16.1916 7.4333L16.9333 5.94996C17.0085 5.7947 17.0336 5.61993 17.0053 5.44977C16.9769 5.27961 16.8964 5.12245 16.775 4.99996L15 3.22496C14.8768 3.1017 14.7182 3.02013 14.5463 2.99173C14.3743 2.96333 14.1979 2.98953 14.0416 3.06663L12.5583 3.8083L12.0333 2.2333C11.9778 2.06912 11.8726 1.92632 11.7322 1.82475C11.5918 1.72319 11.4232 1.66792 11.25 1.66663H8.74996C8.57526 1.66618 8.40483 1.72064 8.26277 1.82233C8.12071 1.92402 8.0142 2.06778 7.9583 2.2333L7.4333 3.8083L5.94996 3.06663C5.7947 2.99145 5.61993 2.9663 5.44977 2.99466C5.27961 3.02302 5.12245 3.10349 4.99996 3.22496L3.22496 4.99996C3.1017 5.1231 3.02013 5.28177 2.99173 5.45368C2.96333 5.62558 2.98953 5.80205 3.06663 5.9583L3.8083 7.44163L2.2333 7.96663C2.06912 8.02208 1.92632 8.12732 1.82475 8.26772C1.72319 8.40812 1.66792 8.57668 1.66663 8.74996V11.25C1.66618 11.4247 1.72064 11.5951 1.82233 11.7372C1.92402 11.8792 2.06778 11.9857 2.2333 12.0416L3.8083 12.5666L3.06663 14.05C2.99145 14.2052 2.9663 14.38 2.99466 14.5502C3.02302 14.7203 3.10349 14.8775 3.22496 15L4.99996 16.775C5.1231 16.8982 5.28177 16.9798 5.45368 17.0082C5.62558 17.0366 5.80205 17.0104 5.9583 16.9333L7.44163 16.1916L7.96663 17.7666C8.02253 17.9321 8.12904 18.0759 8.2711 18.1776C8.41317 18.2793 8.58359 18.3337 8.7583 18.3333H11.2583C11.433 18.3337 11.6034 18.2793 11.7455 18.1776C11.8875 18.0759 11.9941 17.9321 12.05 17.7666L12.575 16.1916L14.0583 16.9333C14.2126 17.0066 14.3856 17.0307 14.5541 17.0024C14.7225 16.9741 14.8781 16.8947 15 16.775L16.775 15C16.8982 14.8768 16.9798 14.7182 17.0082 14.5463C17.0366 14.3743 17.0104 14.1979 16.9333 14.0416L16.1916 12.5583L17.7666 12.0333C17.9308 11.9778 18.0736 11.8726 18.1752 11.7322C18.2767 11.5918 18.332 11.4232 18.3333 11.25V8.74996C18.3337 8.57526 18.2793 8.40483 18.1776 8.26277C18.0759 8.12071 17.9321 8.0142 17.7666 7.9583ZM16.6666 10.65L15.6666 10.9833C15.4367 11.0579 15.2257 11.1816 15.0483 11.3459C14.871 11.5102 14.7315 11.711 14.6395 11.9346C14.5475 12.1582 14.5053 12.3991 14.5158 12.6406C14.5262 12.8821 14.5891 13.1185 14.7 13.3333L15.175 14.2833L14.2583 15.2L13.3333 14.7C13.1196 14.5935 12.8855 14.5342 12.6469 14.526C12.4083 14.5179 12.1707 14.5611 11.9502 14.6528C11.7298 14.7445 11.5316 14.8824 11.3691 15.0573C11.2066 15.2322 11.0835 15.44 11.0083 15.6666L10.675 16.6666H9.34996L9.01663 15.6666C8.94204 15.4367 8.81832 15.2257 8.65404 15.0483C8.48977 14.871 8.28888 14.7315 8.06531 14.6395C7.84174 14.5475 7.60084 14.5053 7.35932 14.5158C7.11779 14.5262 6.88143 14.5891 6.66663 14.7L5.71663 15.175L4.79996 14.2583L5.29996 13.3333C5.41087 13.1185 5.47373 12.8821 5.48417 12.6406C5.49461 12.3991 5.45238 12.1582 5.36041 11.9346C5.26845 11.711 5.12894 11.5102 4.95158 11.3459C4.77422 11.1816 4.56325 11.0579 4.3333 10.9833L3.3333 10.65V9.34996L4.3333 9.01663C4.56325 8.94204 4.77422 8.81832 4.95158 8.65404C5.12894 8.48977 5.26845 8.28888 5.36041 8.06531C5.45238 7.84174 5.49461 7.60084 5.48417 7.35932C5.47373 7.11779 5.41087 6.88143 5.29996 6.66663L4.82496 5.74163L5.74163 4.82496L6.66663 5.29996C6.88143 5.41087 7.11779 5.47373 7.35932 5.48417C7.60084 5.49461 7.84174 5.45238 8.06531 5.36041C8.28888 5.26845 8.48977 5.12894 8.65404 4.95158C8.81832 4.77422 8.94204 4.56325 9.01663 4.3333L9.34996 3.3333H10.65L10.9833 4.3333C11.0579 4.56325 11.1816 4.77422 11.3459 4.95158C11.5102 5.12894 11.711 5.26845 11.9346 5.36041C12.1582 5.45238 12.3991 5.49461 12.6406 5.48417C12.8821 5.47373 13.1185 5.41087 13.3333 5.29996L14.2833 4.82496L15.2 5.74163L14.7 6.66663C14.5935 6.88033 14.5342 7.11442 14.526 7.35304C14.5179 7.59165 14.5611 7.82924 14.6528 8.0497C14.7445 8.27016 14.8824 8.46835 15.0573 8.63086C15.2322 8.79337 15.44 8.9164 15.6666 8.99163L16.6666 9.32496V10.65ZM9.99996 6.66663C9.34069 6.66663 8.69623 6.86213 8.14806 7.2284C7.5999 7.59467 7.17266 8.11526 6.92036 8.72435C6.66807 9.33344 6.60206 10.0037 6.73068 10.6503C6.8593 11.2969 7.17676 11.8908 7.64294 12.357C8.10911 12.8232 8.70306 13.1406 9.34966 13.2692C9.99626 13.3979 10.6665 13.3319 11.2756 13.0796C11.8847 12.8273 12.4053 12.4 12.7715 11.8519C13.1378 11.3037 13.3333 10.6592 13.3333 9.99996C13.3333 9.11591 12.9821 8.26806 12.357 7.64294C11.7319 7.01782 10.884 6.66663 9.99996 6.66663ZM9.99996 11.6666C9.67033 11.6666 9.34809 11.5689 9.07401 11.3857C8.79993 11.2026 8.58631 10.9423 8.46016 10.6378C8.33402 10.3332 8.30101 9.99811 8.36532 9.67481C8.42963 9.35151 8.58836 9.05454 8.82145 8.82145C9.05454 8.58836 9.35151 8.42963 9.67481 8.36532C9.99811 8.30101 10.3332 8.33402 10.6378 8.46016C10.9423 8.58631 11.2026 8.79993 11.3857 9.07401C11.5689 9.34809 11.6666 9.67033 11.6666 9.99996C11.6666 10.442 11.491 10.8659 11.1785 11.1785C10.8659 11.491 10.442 11.6666 9.99996 11.6666Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                    <span>Mode Test</span>
                  </div>
                )}

                <a
                  className="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
                  href="#"
                >
                  <span className="inline-block mr-4">
                    <svg
                      className="text-gray-600 w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.7666 7.9583L16.1916 7.4333L16.9333 5.94996C17.0085 5.7947 17.0336 5.61993 17.0053 5.44977C16.9769 5.27961 16.8964 5.12245 16.775 4.99996L15 3.22496C14.8768 3.1017 14.7182 3.02013 14.5463 2.99173C14.3743 2.96333 14.1979 2.98953 14.0416 3.06663L12.5583 3.8083L12.0333 2.2333C11.9778 2.06912 11.8726 1.92632 11.7322 1.82475C11.5918 1.72319 11.4232 1.66792 11.25 1.66663H8.74996C8.57526 1.66618 8.40483 1.72064 8.26277 1.82233C8.12071 1.92402 8.0142 2.06778 7.9583 2.2333L7.4333 3.8083L5.94996 3.06663C5.7947 2.99145 5.61993 2.9663 5.44977 2.99466C5.27961 3.02302 5.12245 3.10349 4.99996 3.22496L3.22496 4.99996C3.1017 5.1231 3.02013 5.28177 2.99173 5.45368C2.96333 5.62558 2.98953 5.80205 3.06663 5.9583L3.8083 7.44163L2.2333 7.96663C2.06912 8.02208 1.92632 8.12732 1.82475 8.26772C1.72319 8.40812 1.66792 8.57668 1.66663 8.74996V11.25C1.66618 11.4247 1.72064 11.5951 1.82233 11.7372C1.92402 11.8792 2.06778 11.9857 2.2333 12.0416L3.8083 12.5666L3.06663 14.05C2.99145 14.2052 2.9663 14.38 2.99466 14.5502C3.02302 14.7203 3.10349 14.8775 3.22496 15L4.99996 16.775C5.1231 16.8982 5.28177 16.9798 5.45368 17.0082C5.62558 17.0366 5.80205 17.0104 5.9583 16.9333L7.44163 16.1916L7.96663 17.7666C8.02253 17.9321 8.12904 18.0759 8.2711 18.1776C8.41317 18.2793 8.58359 18.3337 8.7583 18.3333H11.2583C11.433 18.3337 11.6034 18.2793 11.7455 18.1776C11.8875 18.0759 11.9941 17.9321 12.05 17.7666L12.575 16.1916L14.0583 16.9333C14.2126 17.0066 14.3856 17.0307 14.5541 17.0024C14.7225 16.9741 14.8781 16.8947 15 16.775L16.775 15C16.8982 14.8768 16.9798 14.7182 17.0082 14.5463C17.0366 14.3743 17.0104 14.1979 16.9333 14.0416L16.1916 12.5583L17.7666 12.0333C17.9308 11.9778 18.0736 11.8726 18.1752 11.7322C18.2767 11.5918 18.332 11.4232 18.3333 11.25V8.74996C18.3337 8.57526 18.2793 8.40483 18.1776 8.26277C18.0759 8.12071 17.9321 8.0142 17.7666 7.9583ZM16.6666 10.65L15.6666 10.9833C15.4367 11.0579 15.2257 11.1816 15.0483 11.3459C14.871 11.5102 14.7315 11.711 14.6395 11.9346C14.5475 12.1582 14.5053 12.3991 14.5158 12.6406C14.5262 12.8821 14.5891 13.1185 14.7 13.3333L15.175 14.2833L14.2583 15.2L13.3333 14.7C13.1196 14.5935 12.8855 14.5342 12.6469 14.526C12.4083 14.5179 12.1707 14.5611 11.9502 14.6528C11.7298 14.7445 11.5316 14.8824 11.3691 15.0573C11.2066 15.2322 11.0835 15.44 11.0083 15.6666L10.675 16.6666H9.34996L9.01663 15.6666C8.94204 15.4367 8.81832 15.2257 8.65404 15.0483C8.48977 14.871 8.28888 14.7315 8.06531 14.6395C7.84174 14.5475 7.60084 14.5053 7.35932 14.5158C7.11779 14.5262 6.88143 14.5891 6.66663 14.7L5.71663 15.175L4.79996 14.2583L5.29996 13.3333C5.41087 13.1185 5.47373 12.8821 5.48417 12.6406C5.49461 12.3991 5.45238 12.1582 5.36041 11.9346C5.26845 11.711 5.12894 11.5102 4.95158 11.3459C4.77422 11.1816 4.56325 11.0579 4.3333 10.9833L3.3333 10.65V9.34996L4.3333 9.01663C4.56325 8.94204 4.77422 8.81832 4.95158 8.65404C5.12894 8.48977 5.26845 8.28888 5.36041 8.06531C5.45238 7.84174 5.49461 7.60084 5.48417 7.35932C5.47373 7.11779 5.41087 6.88143 5.29996 6.66663L4.82496 5.74163L5.74163 4.82496L6.66663 5.29996C6.88143 5.41087 7.11779 5.47373 7.35932 5.48417C7.60084 5.49461 7.84174 5.45238 8.06531 5.36041C8.28888 5.26845 8.48977 5.12894 8.65404 4.95158C8.81832 4.77422 8.94204 4.56325 9.01663 4.3333L9.34996 3.3333H10.65L10.9833 4.3333C11.0579 4.56325 11.1816 4.77422 11.3459 4.95158C11.5102 5.12894 11.711 5.26845 11.9346 5.36041C12.1582 5.45238 12.3991 5.49461 12.6406 5.48417C12.8821 5.47373 13.1185 5.41087 13.3333 5.29996L14.2833 4.82496L15.2 5.74163L14.7 6.66663C14.5935 6.88033 14.5342 7.11442 14.526 7.35304C14.5179 7.59165 14.5611 7.82924 14.6528 8.0497C14.7445 8.27016 14.8824 8.46835 15.0573 8.63086C15.2322 8.79337 15.44 8.9164 15.6666 8.99163L16.6666 9.32496V10.65ZM9.99996 6.66663C9.34069 6.66663 8.69623 6.86213 8.14806 7.2284C7.5999 7.59467 7.17266 8.11526 6.92036 8.72435C6.66807 9.33344 6.60206 10.0037 6.73068 10.6503C6.8593 11.2969 7.17676 11.8908 7.64294 12.357C8.10911 12.8232 8.70306 13.1406 9.34966 13.2692C9.99626 13.3979 10.6665 13.3319 11.2756 13.0796C11.8847 12.8273 12.4053 12.4 12.7715 11.8519C13.1378 11.3037 13.3333 10.6592 13.3333 9.99996C13.3333 9.11591 12.9821 8.26806 12.357 7.64294C11.7319 7.01782 10.884 6.66663 9.99996 6.66663ZM9.99996 11.6666C9.67033 11.6666 9.34809 11.5689 9.07401 11.3857C8.79993 11.2026 8.58631 10.9423 8.46016 10.6378C8.33402 10.3332 8.30101 9.99811 8.36532 9.67481C8.42963 9.35151 8.58836 9.05454 8.82145 8.82145C9.05454 8.58836 9.35151 8.42963 9.67481 8.36532C9.99811 8.30101 10.3332 8.33402 10.6378 8.46016C10.9423 8.58631 11.2026 8.79993 11.3857 9.07401C11.5689 9.34809 11.6666 9.67033 11.6666 9.99996C11.6666 10.442 11.491 10.8659 11.1785 11.1785C10.8659 11.491 10.442 11.6666 9.99996 11.6666Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <span>Settings</span>
                </a>
                <div
                  className="flex items-center pl-3 py-3 pr-2 text-gray-50 hover:bg-gray-900 rounded"
                  onClick={() => {
                    logout();
                  }}
                >
                  <span className="inline-block mr-4"></span>
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="  bg-body ">
          <Outlet />

          <div className="fixed bottom-1 right-1">
            <div className="mb-2">
              <CreateBugModal />
            </div>
            <CreateDemandModal />
          </div>
        </div>
      </div>
    </div>
  );
};
