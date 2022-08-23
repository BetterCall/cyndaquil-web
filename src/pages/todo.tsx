import React from "react";
import { Link } from "react-router-dom";

export const Todo = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <h2 className="font-semibold text-2xl mb-3">Todo</h2>
    <h4 className="font-medium text-base mb-5">
      La page est en cours de creation
    </h4>
    <Link className="hover:underline text-gray-600" to="/">
      Go back home &rarr;
    </Link>
  </div>
);
