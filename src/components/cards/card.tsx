import React from "react";

export const Card: React.FC<any> = ({ children }) => {
  return (
    <div className="p-4 mb-6 bg-white shadow rounded overflow-x-auto">
      {children}
    </div>
  );
};
