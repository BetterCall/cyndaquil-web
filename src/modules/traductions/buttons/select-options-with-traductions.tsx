import React from "react";
import { useTraductions } from "../hooks";

interface ISelectOptions {
  keys: string[];
  selected: string;
}

export const SelectOptionsWithTraductions: React.FC<ISelectOptions> = ({
  keys,
  selected,
}) => {
  const { data, loading } = useTraductions({ where: { keys } });

  if (loading) return <div>Loading</div>;

  return (
    <>
      {keys?.map((key) => {
        let index =
          data?.traductions?.results?.findIndex(
            (result) => result.key == key
          ) ?? -1;
        if (index !== -1) {
          let traduction = data?.traductions?.results![index];
          return (
            <option
              value={traduction!.key}
              key={`traduction-${traduction!.id}`}
              selected={traduction!.value === selected}
            >
              {traduction!.value}
            </option>
          );
        } else {
          return (
            <option
              value={key}
              key={`traduction-${key}`}
              selected={key === selected}
            >
              {key}
            </option>
          );
        }
      })}
    </>
  );
};
