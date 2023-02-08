import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useUsers } from "../../users/hooks";
import { useMe } from "../../users/hooks/useMe";
import { capitalizeFirstLetter } from "../../../helpers/string";
import { CalendarIcon } from "../../../components/icons";
import { CardHeader } from "../../../components/cards";
import { WorkOrdersPreview } from "../../work-orders/components";
import { WorkOrderStatus } from "../../../__generated__/globalTypes";
import { DemandsPreview } from "../../demands/components";
import { useNavigate } from "react-router-dom";

export const Secretary = () => {
  const navigate = useNavigate();
  const [, updateState] = useState();
  // @ts-ignore
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const { data } = useMe();
  const { data: usersData } = useUsers({ where: {} });
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
      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="En Attente de Facturation" />
              <WorkOrdersPreview status={WorkOrderStatus.Done} />

              <div className="grid -mx-2 mt-2   justify-items-center ">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/work-orders?status=Done`)}
                  >
                    Tous les Bons en attente
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </section>
      </div>
    </>
  );
};
