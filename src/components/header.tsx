import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useMe } from "../hooks/useMe";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data, loading } = useMe();
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <span className="text-xl font-bold">
          <Link to="/" aria-disabled={loading}>
            cyndaquil
          </Link>
        </span>
        <span className="text-xs">
          <Link to="my-profile" aria-disabled={loading}>
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};
