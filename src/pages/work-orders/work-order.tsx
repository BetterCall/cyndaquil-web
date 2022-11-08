import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader } from "../../components/cards";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { WORK_ORDER } from "../../queries/work-orders.queries";
import {
  WorkOrderQuery,
  WorkOrderQueryVariables,
} from "../../__generated__/WorkOrderQuery";

export const WorkOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/work-orders");
    }
  }, []);

  const { data, loading } = useQuery<WorkOrderQuery, WorkOrderQueryVariables>(
    WORK_ORDER,
    {
      variables: {
        id: +id!,
      },
    }
  );

  return (
    <>
      <Header
        title={`${data?.workOrder?.result?.name}`}
        subtitle={`${data?.workOrder?.result?.customer?.name}`}
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
        <section className="pb-4">
          <div className="px-4 ">
            <div className="flex flex-wrap -m-8 py-4 px-2">
              <div className="w-full md:w-1/2 lg:w-1/4 py-1 md:py-2  px-2 ">
                <div className="p-6 rounded bg-white shadow">
                  <div className="flex mb-2">
                    <span className="inline-block mr-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.00013 0.666656C7.90578 0.666656 6.82215 0.882205 5.8111 1.30099C4.80006 1.71978 3.8814 2.33361 3.10758 3.10743C1.54477 4.67024 0.666799 6.78985 0.666799 8.99999C0.659514 10.9243 1.32579 12.7904 2.55013 14.275L0.883466 15.9417C0.767834 16.0588 0.689504 16.2077 0.658359 16.3693C0.627214 16.531 0.64465 16.6982 0.708466 16.85C0.777681 16.9999 0.889886 17.1259 1.03084 17.212C1.17179 17.298 1.33513 17.3403 1.50013 17.3333H9.00013C11.2103 17.3333 13.3299 16.4553 14.8927 14.8925C16.4555 13.3297 17.3335 11.2101 17.3335 8.99999C17.3335 6.78985 16.4555 4.67024 14.8927 3.10743C13.3299 1.54463 11.2103 0.666656 9.00013 0.666656ZM9.00013 15.6667H3.50847L4.28347 14.8917C4.43868 14.7355 4.52579 14.5243 4.52579 14.3042C4.52579 14.084 4.43868 13.8728 4.28347 13.7167C3.19229 12.6267 2.51278 11.1921 2.36071 9.65732C2.20864 8.12253 2.59342 6.58249 3.44949 5.29959C4.30556 4.01669 5.57996 3.07029 7.05556 2.62163C8.53117 2.17298 10.1167 2.24983 11.542 2.83908C12.9673 3.42834 14.1442 4.49355 14.8722 5.85323C15.6002 7.21291 15.8342 8.78294 15.5344 10.2958C15.2346 11.8087 14.4196 13.1709 13.2281 14.1502C12.0366 15.1295 10.5424 15.6654 9.00013 15.6667ZM13.1668 8.16666H4.83347C4.61245 8.16666 4.40049 8.25445 4.24421 8.41073C4.08793 8.56701 4.00013 8.77898 4.00013 8.99999C4.00013 9.221 4.08793 9.43296 4.24421 9.58924C4.40049 9.74553 4.61245 9.83332 4.83347 9.83332H13.1668C13.3878 9.83332 13.5998 9.74553 13.7561 9.58924C13.9123 9.43296 14.0001 9.221 14.0001 8.99999C14.0001 8.77898 13.9123 8.56701 13.7561 8.41073C13.5998 8.25445 13.3878 8.16666 13.1668 8.16666ZM11.5001 11.5H6.50013C6.27912 11.5 6.06716 11.5878 5.91088 11.7441C5.7546 11.9003 5.6668 12.1123 5.6668 12.3333C5.6668 12.5543 5.7546 12.7663 5.91088 12.9226C6.06716 13.0789 6.27912 13.1667 6.50013 13.1667H11.5001C11.7211 13.1667 11.9331 13.0789 12.0894 12.9226C12.2457 12.7663 12.3335 12.5543 12.3335 12.3333C12.3335 12.1123 12.2457 11.9003 12.0894 11.7441C11.9331 11.5878 11.7211 11.5 11.5001 11.5ZM6.50013 6.49999H11.5001C11.7211 6.49999 11.9331 6.41219 12.0894 6.25591C12.2457 6.09963 12.3335 5.88767 12.3335 5.66666C12.3335 5.44564 12.2457 5.23368 12.0894 5.0774C11.9331 4.92112 11.7211 4.83332 11.5001 4.83332H6.50013C6.27912 4.83332 6.06716 4.92112 5.91088 5.0774C5.7546 5.23368 5.6668 5.44564 5.6668 5.66666C5.6668 5.88767 5.7546 6.09963 5.91088 6.25591C6.06716 6.41219 6.27912 6.49999 6.50013 6.49999Z"
                          fill="#382CDD"
                        ></path>
                      </svg>
                    </span>
                    <h3 className="text-sm text-gray-600">Status</h3>
                  </div>
                  <h2 className="mb-2 text-xl font-bold">
                    {data?.workOrder?.result?.status}
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 py-1 md:py-2  px-2">
                <div className="p-6 rounded bg-white shadow ">
                  <div className="flex mb-2">
                    <span className="inline-block mr-2">
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8334 3.41668H12.3334V2.58334C12.3334 1.9203 12.07 1.28442 11.6012 0.815577C11.1323 0.346736 10.4965 0.0833435 9.83342 0.0833435H8.16675C7.50371 0.0833435 6.86782 0.346736 6.39898 0.815577C5.93014 1.28442 5.66675 1.9203 5.66675 2.58334V3.41668H3.16675C2.50371 3.41668 1.86782 3.68007 1.39898 4.14891C0.93014 4.61775 0.666748 5.25363 0.666748 5.91668V13.4167C0.666748 14.0797 0.93014 14.7156 1.39898 15.1844C1.86782 15.6533 2.50371 15.9167 3.16675 15.9167H14.8334C15.4965 15.9167 16.1323 15.6533 16.6012 15.1844C17.07 14.7156 17.3334 14.0797 17.3334 13.4167V5.91668C17.3334 5.25363 17.07 4.61775 16.6012 4.14891C16.1323 3.68007 15.4965 3.41668 14.8334 3.41668ZM7.33342 2.58334C7.33342 2.36233 7.42121 2.15037 7.57749 1.99409C7.73377 1.83781 7.94573 1.75001 8.16675 1.75001H9.83342C10.0544 1.75001 10.2664 1.83781 10.4227 1.99409C10.579 2.15037 10.6667 2.36233 10.6667 2.58334V3.41668H7.33342V2.58334ZM15.6667 13.4167C15.6667 13.6377 15.579 13.8497 15.4227 14.0059C15.2664 14.1622 15.0544 14.25 14.8334 14.25H3.16675C2.94573 14.25 2.73377 14.1622 2.57749 14.0059C2.42121 13.8497 2.33341 13.6377 2.33341 13.4167V8.83334C3.14628 9.15577 3.9819 9.41759 4.83342 9.61668V10.1083C4.83342 10.3294 4.92121 10.5413 5.07749 10.6976C5.23377 10.8539 5.44573 10.9417 5.66675 10.9417C5.88776 10.9417 6.09972 10.8539 6.256 10.6976C6.41228 10.5413 6.50008 10.3294 6.50008 10.1083V9.93334C7.3287 10.0462 8.16382 10.1046 9.00008 10.1083C9.83634 10.1046 10.6715 10.0462 11.5001 9.93334V10.1083C11.5001 10.3294 11.5879 10.5413 11.7442 10.6976C11.9004 10.8539 12.1124 10.9417 12.3334 10.9417C12.5544 10.9417 12.7664 10.8539 12.9227 10.6976C13.079 10.5413 13.1667 10.3294 13.1667 10.1083V9.61668C14.0183 9.41759 14.8539 9.15577 15.6667 8.83334V13.4167ZM15.6667 7.00834C14.8562 7.35042 14.0204 7.62904 13.1667 7.84168V7.58334C13.1667 7.36233 13.079 7.15037 12.9227 6.99409C12.7664 6.83781 12.5544 6.75001 12.3334 6.75001C12.1124 6.75001 11.9004 6.83781 11.7442 6.99409C11.5879 7.15037 11.5001 7.36233 11.5001 7.58334V8.20001C9.84279 8.45004 8.15737 8.45004 6.50008 8.20001V7.58334C6.50008 7.36233 6.41228 7.15037 6.256 6.99409C6.09972 6.83781 5.88776 6.75001 5.66675 6.75001C5.44573 6.75001 5.23377 6.83781 5.07749 6.99409C4.92121 7.15037 4.83342 7.36233 4.83342 7.58334V7.85834C3.97977 7.6457 3.14392 7.36709 2.33341 7.02501V5.91668C2.33341 5.69566 2.42121 5.4837 2.57749 5.32742C2.73377 5.17114 2.94573 5.08334 3.16675 5.08334H14.8334C15.0544 5.08334 15.2664 5.17114 15.4227 5.32742C15.579 5.4837 15.6667 5.69566 15.6667 5.91668V7.00834Z"
                          fill="#382CDD"
                        ></path>
                      </svg>
                    </span>
                    <h3 className="text-sm text-gray-600">Date</h3>
                  </div>
                  <h2 className="mb-2 text-xl font-bold">
                    {data?.workOrder?.result?.date
                      ? moment(data?.workOrder?.result?.date).format("L")
                      : "-"}
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 py-1 md:py-2  px-2">
                <div className="p-6 rounded bg-white shadow">
                  <div className="flex mb-2">
                    <span className="inline-block mr-2">
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.6666 6.44999C13.6579 6.37344 13.6411 6.29802 13.6166 6.22499V6.14999C13.5765 6.06431 13.5231 5.98554 13.4583 5.91666L8.45825 0.916656C8.38936 0.851837 8.3106 0.798391 8.22492 0.758323H8.14992C8.06526 0.709774 7.97177 0.67861 7.87492 0.666656H2.83325C2.17021 0.666656 1.53433 0.930049 1.06548 1.39889C0.596644 1.86773 0.333252 2.50362 0.333252 3.16666V14.8333C0.333252 15.4964 0.596644 16.1322 1.06548 16.6011C1.53433 17.0699 2.17021 17.3333 2.83325 17.3333H11.1666C11.8296 17.3333 12.4655 17.0699 12.9344 16.6011C13.4032 16.1322 13.6666 15.4964 13.6666 14.8333V6.49999C13.6666 6.49999 13.6666 6.49999 13.6666 6.44999ZM8.66658 3.50832L10.8249 5.66666H9.49992C9.2789 5.66666 9.06694 5.57886 8.91066 5.42258C8.75438 5.2663 8.66658 5.05434 8.66658 4.83332V3.50832ZM11.9999 14.8333C11.9999 15.0543 11.9121 15.2663 11.7558 15.4226C11.5996 15.5789 11.3876 15.6667 11.1666 15.6667H2.83325C2.61224 15.6667 2.40028 15.5789 2.244 15.4226C2.08772 15.2663 1.99992 15.0543 1.99992 14.8333V3.16666C1.99992 2.94564 2.08772 2.73368 2.244 2.5774C2.40028 2.42112 2.61224 2.33332 2.83325 2.33332H6.99992V4.83332C6.99992 5.49636 7.26331 6.13225 7.73215 6.60109C8.20099 7.06993 8.83688 7.33332 9.49992 7.33332H11.9999V14.8333Z"
                          fill="#382CDD"
                        ></path>
                      </svg>
                    </span>
                    <h3 className="text-sm text-gray-600">Heure</h3>
                  </div>
                  <h2 className="mb-2 text-xl font-bold">
                    {data?.workOrder?.result?.start}{" "}
                    {data?.workOrder?.result?.end &&
                      ` - ${data?.workOrder?.result?.end}`}
                  </h2>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 py-1 md:py-2  px-2">
                <div className="p-6 rounded bg-white shadow">
                  <div className="flex mb-2">
                    <span className="inline-block mr-2">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3413 9.23332C11.8687 8.66686 12.1659 7.92397 12.1746 7.14999C12.1746 6.31456 11.8427 5.51334 11.252 4.9226C10.6612 4.33186 9.86003 3.99999 9.02459 3.99999C8.18916 3.99999 7.38795 4.33186 6.79721 4.9226C6.20647 5.51334 5.87459 6.31456 5.87459 7.14999C5.88329 7.92397 6.18045 8.66686 6.70793 9.23332C5.97347 9.59905 5.34144 10.1416 4.86869 10.8122C4.39594 11.4828 4.09728 12.2604 3.99959 13.075C3.97528 13.296 4.03976 13.5176 4.17885 13.6911C4.31794 13.8646 4.52025 13.9757 4.74126 14C4.96227 14.0243 5.18389 13.9598 5.35736 13.8207C5.53084 13.6816 5.64195 13.4793 5.66626 13.2583C5.7657 12.4509 6.15696 11.7078 6.76633 11.1689C7.3757 10.63 8.16111 10.3325 8.97459 10.3325C9.78808 10.3325 10.5735 10.63 11.1829 11.1689C11.7922 11.7078 12.1835 12.4509 12.2829 13.2583C12.3061 13.472 12.4109 13.6685 12.5756 13.8067C12.7402 13.9449 12.9518 14.0141 13.1663 14H13.2579C13.4764 13.9749 13.676 13.8644 13.8134 13.6927C13.9508 13.521 14.0147 13.302 13.9913 13.0833C13.9008 12.273 13.6116 11.4975 13.1493 10.8259C12.687 10.1542 12.0659 9.60716 11.3413 9.23332ZM8.99959 8.63332C8.70622 8.63332 8.41943 8.54633 8.1755 8.38334C7.93156 8.22035 7.74144 7.98868 7.62917 7.71764C7.5169 7.44659 7.48753 7.14834 7.54476 6.86061C7.602 6.57287 7.74327 6.30856 7.95072 6.10112C8.15817 5.89367 8.42247 5.75239 8.71021 5.69516C8.99795 5.63792 9.2962 5.6673 9.56724 5.77957C9.83828 5.89184 10.0699 6.08196 10.2329 6.32589C10.3959 6.56983 10.4829 6.85661 10.4829 7.14999C10.4829 7.54339 10.3266 7.92069 10.0485 8.19887C9.77029 8.47704 9.393 8.63332 8.99959 8.63332ZM14.8329 0.666656H3.16626C2.50322 0.666656 1.86733 0.930049 1.39849 1.39889C0.929652 1.86773 0.66626 2.50362 0.66626 3.16666V14.8333C0.66626 15.4964 0.929652 16.1322 1.39849 16.6011C1.86733 17.0699 2.50322 17.3333 3.16626 17.3333H14.8329C15.496 17.3333 16.1319 17.0699 16.6007 16.6011C17.0695 16.1322 17.3329 15.4964 17.3329 14.8333V3.16666C17.3329 2.50362 17.0695 1.86773 16.6007 1.39889C16.1319 0.930049 15.496 0.666656 14.8329 0.666656ZM15.6663 14.8333C15.6663 15.0543 15.5785 15.2663 15.4222 15.4226C15.2659 15.5789 15.0539 15.6667 14.8329 15.6667H3.16626C2.94525 15.6667 2.73328 15.5789 2.577 15.4226C2.42072 15.2663 2.33293 15.0543 2.33293 14.8333V3.16666C2.33293 2.94564 2.42072 2.73368 2.577 2.5774C2.73328 2.42112 2.94525 2.33332 3.16626 2.33332H14.8329C15.0539 2.33332 15.2659 2.42112 15.4222 2.5774C15.5785 2.73368 15.6663 2.94564 15.6663 3.16666V14.8333Z"
                          fill="#382CDD"
                        ></path>
                      </svg>
                    </span>
                    <h3 className="text-sm text-gray-600">Tech</h3>
                  </div>
                  <h2 className="mb-2 text-xl font-bold">Bryann</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" p-4">
          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
            <div className="w-full xl:w-1/3 xl:pr-4 mb-4 md:mb-0">
              <Card>
                <CardHeader
                  title={data?.workOrder?.result?.customer?.name ?? ""}
                  button={{
                    title: "Fiche Client ",
                    icon: <SendIcon />,
                    url: `/customers/${data?.workOrder?.result?.customer?.id}`,
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
                    {data?.workOrder?.result?.customer?.postal}
                    {" ,"}
                    {data?.workOrder?.result?.customer?.city}
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
                    {data?.workOrder?.result?.customer?.phone}
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
                    {data?.workOrder?.result?.customer?.email}
                  </span>
                </div>
              </Card>

              <Card>
                <CardHeader
                  title={data?.workOrder?.result?.site?.name ?? ""}
                  button={{
                    title: "Fiche Site",
                    icon: <SendIcon />,
                    url: `/sites/${data?.workOrder?.result?.site?.id}`,
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
                    {data?.workOrder?.result?.site?.postal}
                    {" ,"}
                    {data?.workOrder?.result?.site?.city}
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
                    {data?.workOrder?.result?.site?.name}
                  </span>
                </div>

                <div className="flex flex-wrap -mx-2"></div>
              </Card>
            </div>

            <div className="w-full xl:w-2/3  mb-4 md:mb-0">
              <Card>
                <CardHeader title="Informations Générales" />

                <div className="mb-7">
                  <p className="text-sm">
                    {data?.workOrder?.result?.description}
                  </p>
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
                    {data?.workOrder?.result?.postal}
                    {" ,"}
                    {data?.workOrder?.result?.city}
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
                    {data?.workOrder?.result?.customer?.phone}
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
                    {data?.workOrder?.result?.customer?.email}
                  </span>
                </div>
              </Card>

              <Card>
                <CardHeader title="Liste des Equipements" />

                <div className="mb-7">
                  {data?.workOrder?.result?.emplacements?.map((eq) => (
                    <div className="mt-4">
                      <div className="font-bold">
                        Batiment :{" "}
                        {eq.emplacement.floor?.entrance.building.name}
                      </div>
                      <div className="mx-2">
                        <div className="font-medium">
                          Entrée : {eq.emplacement.floor?.entrance.name}
                        </div>
                        <div className="mx-2">
                          Etage : {eq.emplacement.floor?.name} : Equipement :{" "}
                          <span className="font-bold">
                            1 {eq.emplacement.category?.name}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="w-full  mb-4 md:mb-0"></div>
          </div>
        </section>
      </div>
    </>
  );
};
