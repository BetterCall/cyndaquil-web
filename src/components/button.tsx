import React from "react";

interface IButtonProps {
  bg?: string;
  loading?: boolean;
  canClick?: boolean;
  actionText: string;
  onClick?: any;
}

export const Button: React.FC<IButtonProps> = ({
  loading = false,
  canClick = true,
  actionText,
  bg = "gray",
  onClick = () => null,
}) => (
  <button onClick={onClick} disabled={loading} className={`btn`}>
    {loading ? "Chargement" : actionText}{" "}
  </button>
);
