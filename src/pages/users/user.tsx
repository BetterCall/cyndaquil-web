import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
    import { Link, useParams } from "react-router-dom";
import { USER } from "../../queries/user.queries";

type IUserParams = {
  userId: string;
};

export const User = () => {
  const { userId } = useParams<IUserParams>();
  const navigate = useNavigate();
  useEffect(() => { 
    if (!userId) {
      navigate("/");
    }
  }, []);

  const { data, loading } = useQuery(USER, {
    variables: {
      userId: +userId!,
    },
  });
  return (
    <div>
      USER PAGE
      <Link to={"edit"}>go to Edit User Page</Link>
    </div>
  );
};
