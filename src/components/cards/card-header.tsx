import React from "react";
import { Link } from "../../layouts/link";

type IHeaderButton = {
  title: string;
  url: string;
  icon?: any;
};

interface ICardHeader {
  title: string;
  subtitle?: string;
  button?: IHeaderButton;
}

export const CardHeader: React.FC<ICardHeader> = ({
  title,
  subtitle,
  button,
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center mb-3">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {button && (
          <Link
            to={button.url}
            className="ml-auto flex items-center py-2 px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded"
          >
            <span className="mr-1">{button.icon}</span>
            <span>{button.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
