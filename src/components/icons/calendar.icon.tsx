import React from "react";

interface ICalendarIcon {
  color?: string;
}

export const CalendarIcon: React.FC<ICalendarIcon> = ({
  color = "#8880EB",
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M9.66675 1V3.66667"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M4.3335 1V3.66667"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M1.66675 6.33337H12.3334"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6.3335 9H7.00016"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M7 9V11"
      stroke="#3D485B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);
