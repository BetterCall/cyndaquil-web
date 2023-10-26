import React from "react";
import ReactLoading from "react-loading";

export const Loading: React.FC = () => {
  return (
    <div className="flex align-middle	justify-center p-5  ">
      <div className="flex items-center justify-center aspect-square w-1/5">
        <ReactLoading
          type={"spinningBubbles"}
          color={"red"}
          height={"30%"}
          width={"30%"}
        />
      </div>
    </div>
  );
};
