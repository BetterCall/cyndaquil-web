import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

interface ILinkProps {
  to: string;
  className?: string;
  children?: any;
}

export const Link: React.FC<ILinkProps> = ({
  to,
  className = "",
  children,
}) => {
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);
  const debouncedClick = useDebounce(clickCount, 80);
  useEffect(
    () => {
      if (debouncedClick) {
        if (clickCount === 1) {
          navigate(to);
        } else {
          window.open(to);
        }
        setClickCount(0);
      }
    },
    [debouncedClick] // Only call effect if debounced search term changes
  );

  return (
    <div
      className={className + " cursor-pointer  "}
      onClick={() => {
        setClickCount((prev) => prev + 1);
      }}
    >
      {children}
    </div>
  );
};
