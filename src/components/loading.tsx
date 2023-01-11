import React from "react";
import ReactLoading from "react-loading";

export const Loading: React.FC = () => {
  return (
    <div className="flex align-middle	justify-center p-5 ">
      <div className="flex items-center justify-center aspect-square w-1/2">
        <ReactLoading
          type={"spinningBubbles"}
          color={"gray"}
          height={"30%"}
          width={"30%"}
        />
      </div>
    </div>
  );
};
