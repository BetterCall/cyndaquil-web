import React from "react";

interface IButtonProps {
  bg?: string;
  loading?: boolean;
  canClick?: boolean;
  actionText: string;
  onClick?: any;
  full?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  loading = false,
  canClick = true,
  actionText,
  bg = "gray",
  onClick = () => null,
  full = false,
}) => (
  <button
    onClick={onClick}
    disabled={loading || !canClick}
    className={`btn ${full ? "w-full" : ""} ${
      canClick ? "" : "bg-gray-500 hover:bg-gray-600"
    } `}
  >
    {loading ? "Chargement" : actionText}{" "}
  </button>
);
