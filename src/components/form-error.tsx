import React from "react";

interface IFormErrorProps {
  message?: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ message = "" }) => (
  <span className="font-mediumv text-red-600 ">{message}</span>
);
