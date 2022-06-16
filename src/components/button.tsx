import React from "react";

interface IButtonProps {
  loading?: boolean;
  canClick?: boolean;
  actionText: string;
  onClick?: any;
}

export const Button: React.FC<IButtonProps> = ({
  loading = false,
  canClick = true,
  actionText,
  onClick = () => null,
}) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`text-lg font-medium focus:outline-none text-white py-4  transition-colors ${
      canClick
        ? "bg-gray-700 hover:bg-gray-800"
        : "bg-gray-300 pointer-events-none "
    }`}
  >
    {loading ? "Chargement" : actionText}{" "}
  </button>
);
