import React from "react";

interface IProps {
  index: number;
  onClick?: any;
  children?: any;
}

export const Row: React.FC<IProps> = ({
  index,
  onClick = () => null,
  children,
}) => (
  <tr
    onClick={onClick}
    className={`row text-xs m-5  ${index % 2 ? "" : "bg-gray-50"} `}
  >
    {children}
  </tr>
);
