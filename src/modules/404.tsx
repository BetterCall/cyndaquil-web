import React from "react";
import { Link } from "../layouts/link";

export const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center">
    <h2 className="font-semibold text-2xl mb-3">404 - Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link className="hover:underline text-gray-600" to="/">
      Go back home &rarr;
    </Link>
  </div>
);
