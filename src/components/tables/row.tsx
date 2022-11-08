import React from "react";

export const Row = ({ index, children }) => (
  <tr className={`row text-xs m-5  ${index % 2 ? "" : "bg-gray-50"} `}>
    {children}
  </tr>
);
