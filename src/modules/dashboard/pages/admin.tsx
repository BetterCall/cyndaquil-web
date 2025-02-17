import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useUsers } from "../../users/hooks";
import { useMe } from "../../users/hooks/useMe";
import { capitalizeFirstLetter } from "../../../helpers/string";
import { CalendarIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { WorkOrdersPreview } from "../../work-orders/components";
import { UserRole, WorkOrderStatus } from "../../../__generated__/globalTypes";
import { DemandsPreview } from "../../demands/components";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const navigate = useNavigate();
  const [, updateState] = useState();
  // @ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const { data } = useMe();
  const { data: usersData } = useUsers({
    where: { roles: [UserRole.Employee, UserRole.Tech] },
  });
  const [date, setDate] = useState(moment());
  const [dateStr, setDateStr] = useState("");
  const [nextDayStr, setNextDayStr] = useState(" ds ");
  const [previousDayStr, setPreviousDayStr] = useState(" d d");

  const updateDates = () => {
    try {
      setDateStr(capitalizeFirstLetter(date.format("dddd LL")));
      const next = moment(date).add(1, "days");
      setNextDayStr(next.format("DD/MM/YYYY") + "");
      const previous = moment(date).subtract(1, "days");
      setPreviousDayStr(previous.format("DD/MM/YYYY") + "");
      forceUpdate();
    } catch (error) {}
  };

  useEffect(() => {
    updateDates();
  }, []);

  useEffect(() => {
    updateDates();
  }, [date]);

  const nextDay = () => {
    date.add(1, "day");
    // setDate(date.add(1, "day"));
    updateDates();
  };

  const previousDay = () => {
    date.subtract(1, "day");
    // setDate(date.subtract(1, "day"));
    updateDates();
  };

  const selectDate = (d) => {
    setDate(moment(d));
  };

  return (
    <>
      <section className="py-8 px-6 bg-white mb-5">
        <div className="flex flex-wrap -mx-3 items-center">
          <div className="w-full lg:w-1/2 flex items-center mb-5 lg:mb-0 px-3">
            <span className="inline-flex justify-center items-center w-16 h-16 mr-4 bg-indigo-500 rounded">
              <svg
                className="h-7 w-7 text-white"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.4506 4.60603C23.4408 4.59562 23.4379 4.58178 23.4277 4.5716C23.4175 4.56143 23.4034 4.55834 23.393 4.5485C20.899 2.06256 17.5213 0.666656 14 0.666656C10.4787 0.666656 7.10093 2.06256 4.60698 4.5485C4.59649 4.55834 4.58249 4.56135 4.57223 4.5716C4.56198 4.58186 4.55913 4.5956 4.54937 4.60603C2.69104 6.47326 1.42749 8.84913 0.918186 11.4338C0.408879 14.0185 0.676641 16.6961 1.68768 19.1287C2.69872 21.5614 4.40772 23.64 6.59899 25.1022C8.79026 26.5645 11.3656 27.3449 14 27.3449C16.6343 27.3449 19.2097 26.5645 21.4009 25.1022C23.5922 23.64 25.3012 21.5614 26.3123 19.1287C27.3233 16.6961 27.5911 14.0185 27.0817 11.4338C26.5724 8.84913 25.3089 6.47326 23.4506 4.60603V4.60603ZM13.9999 24.6667C12.4029 24.6661 10.8265 24.3063 9.38745 23.6139C7.94839 22.9215 6.68353 21.9142 5.68657 20.6667H11.0403C11.411 21.0858 11.8666 21.4214 12.3768 21.6513C12.8871 21.8811 13.4403 22 13.9999 22C14.5595 22 15.1127 21.8811 15.623 21.6513C16.1332 21.4214 16.5888 21.0858 16.9595 20.6667H22.3133C21.3163 21.9142 20.0515 22.9215 18.6124 23.6139C17.1733 24.3063 15.5969 24.6661 13.9999 24.6667V24.6667ZM12.6666 18C12.6666 17.7363 12.7448 17.4785 12.8913 17.2592C13.0378 17.04 13.246 16.8691 13.4897 16.7681C13.7333 16.6672 14.0014 16.6408 14.26 16.6923C14.5187 16.7437 14.7562 16.8707 14.9427 17.0572C15.1292 17.2437 15.2562 17.4812 15.3076 17.7399C15.3591 17.9985 15.3327 18.2666 15.2317 18.5102C15.1308 18.7539 14.9599 18.9621 14.7407 19.1086C14.5214 19.2551 14.2636 19.3333 13.9999 19.3333C13.6464 19.333 13.3075 19.1924 13.0575 18.9424C12.8075 18.6924 12.6669 18.3535 12.6666 18V18ZM23.8802 18.0028L23.8664 18H17.9999C17.9974 17.1755 17.7397 16.372 17.2622 15.6998C16.7847 15.0275 16.1109 14.5196 15.3332 14.2457V9.99999C15.3332 9.64637 15.1928 9.30723 14.9427 9.05718C14.6927 8.80713 14.3535 8.66666 13.9999 8.66666C13.6463 8.66666 13.3071 8.80713 13.0571 9.05718C12.807 9.30723 12.6666 9.64637 12.6666 9.99999V14.2457C11.8889 14.5196 11.2151 15.0275 10.7376 15.6998C10.2601 16.372 10.0024 17.1755 9.9999 18H4.13337L4.11961 18.0028C3.7728 17.1471 3.53956 16.2496 3.42585 15.3333H4.66657C5.02019 15.3333 5.35933 15.1928 5.60937 14.9428C5.85942 14.6927 5.9999 14.3536 5.9999 14C5.9999 13.6464 5.85942 13.3072 5.60937 13.0572C5.35933 12.8071 5.02019 12.6667 4.66657 12.6667H3.42585C3.6641 10.7714 4.40997 8.97575 5.58462 7.46947L6.45758 8.34244C6.58138 8.46624 6.72835 8.56444 6.8901 8.63144C7.05185 8.69844 7.22521 8.73292 7.40029 8.73292C7.57537 8.73292 7.74873 8.69844 7.91048 8.63144C8.07223 8.56444 8.2192 8.46623 8.343 8.34244C8.4668 8.21864 8.565 8.07167 8.632 7.90992C8.699 7.74817 8.73348 7.5748 8.73348 7.39972C8.73348 7.22465 8.69899 7.05128 8.63199 6.88953C8.56499 6.72778 8.46679 6.58081 8.34299 6.45702L7.47011 5.58414C8.97629 4.40987 10.7717 3.66421 12.6666 3.42594V4.66666C12.6666 5.02028 12.807 5.35942 13.0571 5.60946C13.3071 5.85951 13.6463 5.99999 13.9999 5.99999C14.3535 5.99999 14.6927 5.85951 14.9427 5.60946C15.1928 5.35942 15.3332 5.02028 15.3332 4.66666V3.42594C17.2281 3.66421 19.0235 4.40987 20.5297 5.58414L19.6568 6.45702C19.4068 6.70704 19.2663 7.04614 19.2663 7.39972C19.2663 7.75331 19.4068 8.09241 19.6568 8.34244C19.9068 8.59246 20.2459 8.73292 20.5995 8.73292C20.9531 8.73292 21.2922 8.59246 21.5422 8.34244L22.4152 7.46947C23.5898 8.97575 24.3357 10.7714 24.574 12.6667H23.3332C22.9796 12.6667 22.6405 12.8071 22.3904 13.0572C22.1404 13.3072 21.9999 13.6464 21.9999 14C21.9999 14.3536 22.1404 14.6927 22.3904 14.9428C22.6405 15.1928 22.9796 15.3333 23.3332 15.3333H24.574C24.4602 16.2496 24.227 17.1471 23.8802 18.0028V18.0028Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <div>
              <h2 className="mb-1 text-2xl font-bold">{dateStr}</h2>
              <p className="text-sm text-gray-500 font-medium"></p>
            </div>
          </div>
          <div className="w-full lg:w-auto ml-auto px-3">
            <button
              className="inline-flex items-center py-2 px-3 mr-3 text-xs text-indigo-500 font-medium bg-indigo-50 hover:bg-indigo-100 rounded"
              onClick={() => previousDay()}
            >
              <CalendarIcon />
              <span className="ml-2">{previousDayStr}</span>
            </button>

            <button
              className="inline-flex items-center py-2 px-3 mr-3 text-xs text-indigo-500 font-medium bg-indigo-50 hover:bg-indigo-100 rounded"
              onClick={() => nextDay()}
            >
              <CalendarIcon />
              <span className="ml-2">{nextDayStr}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="main-container">
        <div className="section mb-4">
          <div className="element">
            <div className="card">
              <CardHeader title="Demandes en attente" />
              {data?.me?.id ? (
                <DemandsPreview targetUserId={data?.me?.id} treated={false} />
              ) : null}

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() =>
                      navigate(
                        `/demands?targetUserId=${data?.me?.id}&treated=false`
                      )
                    }
                  >
                    Mes demandes en attente
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element"></div>
        </div>

        <section className="section">
          <div className="element">
            <div className="card mb-2">
              <div className="flex align-middle	justify-center">
                <div className="flex items-center justify-center p-5 ">
                  {date ? (
                    <Calendar
                      value={new Date(date.toString())}
                      onChange={(value) => selectDate(value)}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="element">
            <div className="card">
              <CardHeader
                title="Bon en Attente"
                button={{ title: "Nouveau", url: "/work-order/create" }}
              />
              <WorkOrdersPreview status={WorkOrderStatus.Pending} />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/work-orders?status=Pending`)}
                  >
                    Mes demandes en attente
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap  -m-3">
          {usersData?.users?.results?.map((user) => (
            <div
              className="w-full md:w-1/3 2xl:w-1/3 p-3"
              key={`user_${user.id}`}
            >
              <div className="card">
                <CardHeader title={`${user.firstname} ${user.lastname} `} />
                <WorkOrdersPreview
                  userId={user.id}
                  date={date.format("YYYY-MM-DD")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
