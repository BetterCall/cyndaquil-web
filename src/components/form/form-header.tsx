import React from "react";

interface IFormHeaderProps {
  title: string;
  subtitle?: string;
}

export const FormHeader: React.FC<IFormHeaderProps> = ({
  title,
  subtitle = "",
}) => (
  <div className="w-full mb-8 pb-6 border-b border-coolGray-100">
    <div className="flex flex-wrap items-center justify-between -m-2">
      <div className="w-full p-2">
        <h2 className="text-coolGray-900 text-lg font-semibold">{title}</h2>
        <p className="text-xs text-coolGray-500 font-medium">{subtitle}</p>
      </div>
    </div>
  </div>
);
