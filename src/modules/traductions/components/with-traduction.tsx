import React from "react";
import { useTraductionByKey } from "../hooks/useTraduction";

interface ITraductedTextProps {
  text: string;
  children?: any;
}

export const WithTraduction: React.FC<ITraductedTextProps> = ({
  text,
  children,
}) => {
  const { data, loading } = useTraductionByKey(text);
  return (
    <>
      {children(loading ? "Chargement ..." : data?.traduction?.result?.value)}
    </>
  );
};
