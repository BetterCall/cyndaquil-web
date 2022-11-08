import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader } from "../../components/cards";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { WorkOrdersList } from "../../components/work-orders";
import { objectMap } from "../../helpers/object";
import { CONTRACT } from "../../queries/contracts.queries";
import {
  ContractQuery,
  ContractQueryVariables,
} from "../../__generated__/ContractQuery";

type IContractParams = {
  id: string;
};

export const Contract = () => {
  const { id } = useParams<IContractParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/contracts");
    }
  }, []);

  const { data } = useQuery<ContractQuery, ContractQueryVariables>(CONTRACT, {
    variables: {
      id: +id!,
    },
  });

  const formatToEquipement = (arr) => {
    console.log("ARR ", arr);
    let sorted = arr.reduce((prev, curr) => {
      const temp = prev;
      const id = "" + curr.emplacement?.category?.id ?? "10";
      console.log("curr ", id);
      temp[id] = [...(temp[id] ?? []), curr];
      // @ts-ignore
      return temp;
    }, []);

    const formated: any[] = [];
    Object.keys(sorted).map((key) => {
      formated.push(sorted[key]);
    });

    console.log("formated ", formated);
    console.log("sorted ", sorted);

    return formated;
  };

  return (
    <>
      <Header
        subtitle={`${data?.contract?.result?.customer.name}`}
        title={`${data?.contract?.result?.site?.name}`}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/work-orders/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className=" p-4">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full xl:w-1/2 xl:pr-4 mb-4 md:mb-0">
              <Card>
                <CardHeader
                  title={data?.contract?.result?.customer?.name ?? ""}
                  button={{
                    title: "Fiche Client ",
                    icon: <SendIcon />,
                    url: `/customers/${data?.contract?.result?.customer?.id}`,
                  }}
                />

                <div className="mb-7">
                  <p className="text-sm"></p>
                </div>
                <div className="flex mb-4 justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block mr-2">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6413 9.65837C10.5396 9.61788 10.4308 9.59783 10.3213 9.59937C10.2118 9.60091 10.1036 9.624 10.003 9.66734C9.90243 9.71067 9.81135 9.7734 9.73499 9.85193C9.65864 9.93046 9.5985 10.0233 9.55801 10.125C9.51752 10.2268 9.49747 10.3356 9.49901 10.4451C9.50054 10.5546 9.52364 10.6628 9.56697 10.7634C9.61031 10.864 9.67303 10.955 9.75156 11.0314C9.8301 11.1077 9.9229 11.1679 10.0247 11.2084C11.2413 11.6917 11.9997 12.4417 11.9997 13.1667C11.9997 14.35 9.94967 15.6667 6.99967 15.6667C4.04967 15.6667 1.99967 14.35 1.99967 13.1667C1.99967 12.4417 2.75801 11.6917 3.97467 11.2084C4.18022 11.1266 4.34486 10.9665 4.43237 10.7634C4.51989 10.5602 4.52312 10.3306 4.44134 10.125C4.35957 9.91949 4.19949 9.75486 3.99632 9.66734C3.79316 9.57982 3.56355 9.5766 3.35801 9.65837C1.46634 10.4084 0.333008 11.7167 0.333008 13.1667C0.333008 15.5 3.25801 17.3334 6.99967 17.3334C10.7413 17.3334 13.6663 15.5 13.6663 13.1667C13.6663 11.7167 12.533 10.4084 10.6413 9.65837ZM6.16634 7.2167V13.1667C6.16634 13.3877 6.25414 13.5997 6.41042 13.756C6.5667 13.9122 6.77866 14 6.99967 14C7.22069 14 7.43265 13.9122 7.58893 13.756C7.74521 13.5997 7.83301 13.3877 7.83301 13.1667V7.2167C8.61856 7.01388 9.30316 6.53151 9.75851 5.86003C10.2139 5.18855 10.4087 4.37405 10.3064 3.5692C10.2042 2.76436 9.81196 2.02443 9.2032 1.4881C8.59445 0.951778 7.81098 0.655884 6.99967 0.655884C6.18836 0.655884 5.4049 0.951778 4.79615 1.4881C4.18739 2.02443 3.79514 2.76436 3.69291 3.5692C3.59068 4.37405 3.7855 5.18855 4.24084 5.86003C4.69618 6.53151 5.38079 7.01388 6.16634 7.2167ZM6.99967 2.33337C7.32931 2.33337 7.65154 2.43112 7.92562 2.61425C8.19971 2.79739 8.41333 3.05769 8.53947 3.36223C8.66562 3.66677 8.69862 4.00189 8.63432 4.32519C8.57001 4.64849 8.41127 4.94546 8.17818 5.17855C7.9451 5.41164 7.64813 5.57037 7.32482 5.63468C7.00152 5.69899 6.66641 5.66598 6.36187 5.53984C6.05732 5.41369 5.79703 5.20007 5.61389 4.92599C5.43076 4.65191 5.33301 4.32967 5.33301 4.00004C5.33301 3.55801 5.5086 3.13409 5.82116 2.82153C6.13372 2.50896 6.55765 2.33337 6.99967 2.33337Z"
                          fill="#C2C9D2"
                        ></path>
                      </svg>
                    </span>
                    <h4 className="text-sm text-gray-500">Ville</h4>
                  </div>
                  <span className="text-sm">
                    {data?.contract?.result?.customer?.postal}
                    {" ,"}
                    {data?.contract?.result?.customer?.city}
                  </span>
                </div>
                <div className="flex mb-4 justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block mr-2">
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66667 9.00002H6.33333C6.55435 9.00002 6.76631 8.91222 6.92259 8.75594C7.07887 8.59966 7.16667 8.3877 7.16667 8.16669C7.16667 7.94567 7.07887 7.73371 6.92259 7.57743C6.76631 7.42115 6.55435 7.33335 6.33333 7.33335H4.66667C4.44565 7.33335 4.23369 7.42115 4.07741 7.57743C3.92113 7.73371 3.83333 7.94567 3.83333 8.16669C3.83333 8.3877 3.92113 8.59966 4.07741 8.75594C4.23369 8.91222 4.44565 9.00002 4.66667 9.00002ZM12.1667 4.00002H8V2.33335H8.83333C9.05435 2.33335 9.26631 2.24556 9.42259 2.08928C9.57887 1.933 9.66667 1.72103 9.66667 1.50002C9.66667 1.27901 9.57887 1.06704 9.42259 0.910765C9.26631 0.754484 9.05435 0.666687 8.83333 0.666687H7.16667C6.94565 0.666687 6.73369 0.754484 6.57741 0.910765C6.42113 1.06704 6.33333 1.27901 6.33333 1.50002V4.00002H3.83333C2.94928 4.00002 2.10143 4.35121 1.47631 4.97633C0.851189 5.60145 0.5 6.4493 0.5 7.33335V12.3334C0.5 12.5544 0.587797 12.7663 0.744078 12.9226C0.900358 13.0789 1.11232 13.1667 1.33333 13.1667H6.33333V16.5C6.33333 16.721 6.42113 16.933 6.57741 17.0893C6.73369 17.2456 6.94565 17.3334 7.16667 17.3334C7.38768 17.3334 7.59964 17.2456 7.75592 17.0893C7.9122 16.933 8 16.721 8 16.5V13.1667H14.6667C14.8877 13.1667 15.0996 13.0789 15.2559 12.9226C15.4122 12.7663 15.5 12.5544 15.5 12.3334V7.33335C15.5 6.4493 15.1488 5.60145 14.5237 4.97633C13.8986 4.35121 13.0507 4.00002 12.1667 4.00002ZM8.83333 7.33335V11.5H2.16667V7.33335C2.16667 6.89133 2.34226 6.4674 2.65482 6.15484C2.96738 5.84228 3.39131 5.66669 3.83333 5.66669H9.3C8.99704 6.17001 8.8358 6.74589 8.83333 7.33335ZM13.8333 11.5H10.5V7.33335C10.5 6.89133 10.6756 6.4674 10.9882 6.15484C11.3007 5.84228 11.7246 5.66669 12.1667 5.66669C12.6087 5.66669 13.0326 5.84228 13.3452 6.15484C13.6577 6.4674 13.8333 6.89133 13.8333 7.33335V11.5Z"
                          fill="#C2C9D2"
                        ></path>
                      </svg>
                    </span>
                    <h4 className="text-sm text-gray-500">Téléphone</h4>
                  </div>
                  <span className="text-sm">
                    {data?.contract?.result?.customer?.phone}
                  </span>
                </div>
                <div className="flex mb-6 justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block mr-2">
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8332 3.41665H12.3332V2.58331C12.3332 1.92027 12.0698 1.28439 11.6009 0.815546C11.1321 0.346705 10.4962 0.083313 9.83317 0.083313H8.1665C7.50346 0.083313 6.86758 0.346705 6.39874 0.815546C5.9299 1.28439 5.6665 1.92027 5.6665 2.58331V3.41665H3.1665C2.50346 3.41665 1.86758 3.68004 1.39874 4.14888C0.929896 4.61772 0.666504 5.2536 0.666504 5.91665V13.4166C0.666504 14.0797 0.929896 14.7156 1.39874 15.1844C1.86758 15.6533 2.50346 15.9166 3.1665 15.9166H14.8332C15.4962 15.9166 16.1321 15.6533 16.6009 15.1844C17.0698 14.7156 17.3332 14.0797 17.3332 13.4166V5.91665C17.3332 5.2536 17.0698 4.61772 16.6009 4.14888C16.1321 3.68004 15.4962 3.41665 14.8332 3.41665ZM7.33317 2.58331C7.33317 2.3623 7.42097 2.15034 7.57725 1.99406C7.73353 1.83778 7.94549 1.74998 8.1665 1.74998H9.83317C10.0542 1.74998 10.2661 1.83778 10.4224 1.99406C10.5787 2.15034 10.6665 2.3623 10.6665 2.58331V3.41665H7.33317V2.58331ZM15.6665 13.4166C15.6665 13.6377 15.5787 13.8496 15.4224 14.0059C15.2661 14.1622 15.0542 14.25 14.8332 14.25H3.1665C2.94549 14.25 2.73353 14.1622 2.57725 14.0059C2.42097 13.8496 2.33317 13.6377 2.33317 13.4166V9.20831H4.83317V10.0833C4.83317 10.3043 4.92097 10.5163 5.07725 10.6726C5.23353 10.8288 5.44549 10.9166 5.6665 10.9166C5.88752 10.9166 6.09948 10.8288 6.25576 10.6726C6.41204 10.5163 6.49984 10.3043 6.49984 10.0833V9.20831H11.4998V10.0833C11.4998 10.3043 11.5876 10.5163 11.7439 10.6726C11.9002 10.8288 12.1122 10.9166 12.3332 10.9166C12.5542 10.9166 12.7661 10.8288 12.9224 10.6726C13.0787 10.5163 13.1665 10.3043 13.1665 10.0833V9.20831H15.6665V13.4166ZM15.6665 7.58331H2.33317V5.91665C2.33317 5.69563 2.42097 5.48367 2.57725 5.32739C2.73353 5.17111 2.94549 5.08331 3.1665 5.08331H14.8332C15.0542 5.08331 15.2661 5.17111 15.4224 5.32739C15.5787 5.48367 15.6665 5.69563 15.6665 5.91665V7.58331Z"
                          fill="#C2C9D2"
                        ></path>
                      </svg>
                    </span>
                    <h4 className="text-sm text-gray-500">Email</h4>
                  </div>
                  <span className="text-sm">
                    {data?.contract?.result?.customer?.email}
                  </span>
                </div>
              </Card>
              <Card>
                <CardHeader
                  title={data?.contract?.result?.site?.name ?? ""}
                  button={{
                    title: "Fiche Site",
                    icon: <SendIcon />,
                    url: `/sites/${data?.contract?.result?.site?.id}`,
                  }}
                />

                <div className="mb-7">
                  <p className="text-sm"></p>
                </div>
                <div className="flex mb-4 justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block mr-2">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.6413 9.65837C10.5396 9.61788 10.4308 9.59783 10.3213 9.59937C10.2118 9.60091 10.1036 9.624 10.003 9.66734C9.90243 9.71067 9.81135 9.7734 9.73499 9.85193C9.65864 9.93046 9.5985 10.0233 9.55801 10.125C9.51752 10.2268 9.49747 10.3356 9.49901 10.4451C9.50054 10.5546 9.52364 10.6628 9.56697 10.7634C9.61031 10.864 9.67303 10.955 9.75156 11.0314C9.8301 11.1077 9.9229 11.1679 10.0247 11.2084C11.2413 11.6917 11.9997 12.4417 11.9997 13.1667C11.9997 14.35 9.94967 15.6667 6.99967 15.6667C4.04967 15.6667 1.99967 14.35 1.99967 13.1667C1.99967 12.4417 2.75801 11.6917 3.97467 11.2084C4.18022 11.1266 4.34486 10.9665 4.43237 10.7634C4.51989 10.5602 4.52312 10.3306 4.44134 10.125C4.35957 9.91949 4.19949 9.75486 3.99632 9.66734C3.79316 9.57982 3.56355 9.5766 3.35801 9.65837C1.46634 10.4084 0.333008 11.7167 0.333008 13.1667C0.333008 15.5 3.25801 17.3334 6.99967 17.3334C10.7413 17.3334 13.6663 15.5 13.6663 13.1667C13.6663 11.7167 12.533 10.4084 10.6413 9.65837ZM6.16634 7.2167V13.1667C6.16634 13.3877 6.25414 13.5997 6.41042 13.756C6.5667 13.9122 6.77866 14 6.99967 14C7.22069 14 7.43265 13.9122 7.58893 13.756C7.74521 13.5997 7.83301 13.3877 7.83301 13.1667V7.2167C8.61856 7.01388 9.30316 6.53151 9.75851 5.86003C10.2139 5.18855 10.4087 4.37405 10.3064 3.5692C10.2042 2.76436 9.81196 2.02443 9.2032 1.4881C8.59445 0.951778 7.81098 0.655884 6.99967 0.655884C6.18836 0.655884 5.4049 0.951778 4.79615 1.4881C4.18739 2.02443 3.79514 2.76436 3.69291 3.5692C3.59068 4.37405 3.7855 5.18855 4.24084 5.86003C4.69618 6.53151 5.38079 7.01388 6.16634 7.2167ZM6.99967 2.33337C7.32931 2.33337 7.65154 2.43112 7.92562 2.61425C8.19971 2.79739 8.41333 3.05769 8.53947 3.36223C8.66562 3.66677 8.69862 4.00189 8.63432 4.32519C8.57001 4.64849 8.41127 4.94546 8.17818 5.17855C7.9451 5.41164 7.64813 5.57037 7.32482 5.63468C7.00152 5.69899 6.66641 5.66598 6.36187 5.53984C6.05732 5.41369 5.79703 5.20007 5.61389 4.92599C5.43076 4.65191 5.33301 4.32967 5.33301 4.00004C5.33301 3.55801 5.5086 3.13409 5.82116 2.82153C6.13372 2.50896 6.55765 2.33337 6.99967 2.33337Z"
                          fill="#C2C9D2"
                        ></path>
                      </svg>
                    </span>
                    <h4 className="text-sm text-gray-500">Ville</h4>
                  </div>
                  <span className="text-sm">
                    {data?.contract?.result?.site?.postal}
                    {" ,"}
                    {data?.contract?.result?.site?.city}
                  </span>
                </div>
                <div className="flex mb-4 justify-between items-center">
                  <div className="flex items-center">
                    <span className="inline-block mr-2">
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66667 9.00002H6.33333C6.55435 9.00002 6.76631 8.91222 6.92259 8.75594C7.07887 8.59966 7.16667 8.3877 7.16667 8.16669C7.16667 7.94567 7.07887 7.73371 6.92259 7.57743C6.76631 7.42115 6.55435 7.33335 6.33333 7.33335H4.66667C4.44565 7.33335 4.23369 7.42115 4.07741 7.57743C3.92113 7.73371 3.83333 7.94567 3.83333 8.16669C3.83333 8.3877 3.92113 8.59966 4.07741 8.75594C4.23369 8.91222 4.44565 9.00002 4.66667 9.00002ZM12.1667 4.00002H8V2.33335H8.83333C9.05435 2.33335 9.26631 2.24556 9.42259 2.08928C9.57887 1.933 9.66667 1.72103 9.66667 1.50002C9.66667 1.27901 9.57887 1.06704 9.42259 0.910765C9.26631 0.754484 9.05435 0.666687 8.83333 0.666687H7.16667C6.94565 0.666687 6.73369 0.754484 6.57741 0.910765C6.42113 1.06704 6.33333 1.27901 6.33333 1.50002V4.00002H3.83333C2.94928 4.00002 2.10143 4.35121 1.47631 4.97633C0.851189 5.60145 0.5 6.4493 0.5 7.33335V12.3334C0.5 12.5544 0.587797 12.7663 0.744078 12.9226C0.900358 13.0789 1.11232 13.1667 1.33333 13.1667H6.33333V16.5C6.33333 16.721 6.42113 16.933 6.57741 17.0893C6.73369 17.2456 6.94565 17.3334 7.16667 17.3334C7.38768 17.3334 7.59964 17.2456 7.75592 17.0893C7.9122 16.933 8 16.721 8 16.5V13.1667H14.6667C14.8877 13.1667 15.0996 13.0789 15.2559 12.9226C15.4122 12.7663 15.5 12.5544 15.5 12.3334V7.33335C15.5 6.4493 15.1488 5.60145 14.5237 4.97633C13.8986 4.35121 13.0507 4.00002 12.1667 4.00002ZM8.83333 7.33335V11.5H2.16667V7.33335C2.16667 6.89133 2.34226 6.4674 2.65482 6.15484C2.96738 5.84228 3.39131 5.66669 3.83333 5.66669H9.3C8.99704 6.17001 8.8358 6.74589 8.83333 7.33335ZM13.8333 11.5H10.5V7.33335C10.5 6.89133 10.6756 6.4674 10.9882 6.15484C11.3007 5.84228 11.7246 5.66669 12.1667 5.66669C12.6087 5.66669 13.0326 5.84228 13.3452 6.15484C13.6577 6.4674 13.8333 6.89133 13.8333 7.33335V11.5Z"
                          fill="#C2C9D2"
                        ></path>
                      </svg>
                    </span>
                    <h4 className="text-sm text-gray-500">Téléphone</h4>
                  </div>
                  <span className="text-sm">
                    {data?.contract?.result?.site?.name}
                  </span>
                </div>

                <div className="flex flex-wrap -mx-2"></div>
              </Card>
            </div>
            <div className="w-full xl:w-1/2 xl:pr-4 mb-4 md:mb-0"></div>
            <div className="w-full xl:w-1/2 xl:pr-4    mb-4 md:mb-0">
              {data?.contract?.result?.rows?.map((row: any, index: number) => (
                <Card>
                  <CardHeader title={row.category} />

                  <div className=" ">
                    <div key={`row-${index}`} className="mt-4 px-4">
                      <div className="mb-2  flex justify-between">
                        <span>Quantité </span>
                        <span>{row.quantity}</span>
                      </div>
                      <div className="mb-2  flex justify-between border-b pb-2">
                        <span>Prix Unitaire </span>
                        <span className=" font-medium">
                          {row.unitPrice} € HT
                        </span>
                      </div>

                      <div className=" flex justify-between font-medium text-lg mt-2">
                        <span className=" font-medium">Montant Estimatif</span>
                        <span className=" font-medium">
                          {row.unitPrice * row.quantity} € HT
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="w-full xl:w-1/2  mb-4 md:mb-0">
              <Card>
                <CardHeader title="Total" />

                <div className=" ">
                  <div className="mt-4 px-4">
                    <div className="mb-2 flex justify-between">
                      <span>Nombre d'équipement</span>
                      <span>20</span>
                    </div>

                    <div className="mb-2  flex justify-between">
                      <span>Montant HT</span>
                      <span>xx € HT</span>
                    </div>
                    <div className="mb-2  flex justify-between border-b pb-2">
                      <span>Montant TVA</span>
                      <span className=" font-medium">xx € HT</span>
                    </div>

                    <div className=" flex justify-between font-medium text-lg mt-2">
                      <span className=" font-medium">Montant Estimatif</span>
                      <span className=" font-medium">xx € TTC</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="w-full mb-4 md:mb-0">
              <Card>
                <CardHeader title="Détails" />
                <div className="">
                  {formatToEquipement(data?.contract?.result?.rows ?? []).map(
                    (eq) => {
                      console.log(eq);

                      return eq.map((row) => (
                        <div className="mt-4">
                          <div className="font-bold">
                            Batiment :{" "}
                            {eq.emplacement?.floor?.entrance.building.name}
                          </div>
                          <div className="mx-2">
                            <div className="font-medium">
                              Entrée : {eq.emplacement?.floor?.entrance.name}
                            </div>
                            <div className="mx-2">
                              Etage : {eq.emplacement?.floor?.name} : Equipement
                              :{" "}
                              <span className="font-bold">
                                1 {eq.emplacement?.category?.name}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      ));

                      return (
                        <div className="mt-4">
                          <div className="font-bold">
                            Batiment :{" "}
                            {eq.emplacement?.floor?.entrance.building.name}
                          </div>
                          <div className="mx-2">
                            <div className="font-medium">
                              Entrée : {eq.emplacement?.floor?.entrance.name}
                            </div>
                            <div className="mx-2">
                              Etage : {eq.emplacement?.floor?.name} : Equipement
                              :{" "}
                              <span className="font-bold">
                                1 {eq.emplacement?.category?.name}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>

        <div className=""></div>
      </div>
    </>
  );
};
