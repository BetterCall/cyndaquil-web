import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { WorkOrdersList } from "../../components/work-orders";
import { USER } from "../../queries/user.queries";
import { UserQuery, UserQueryVariables } from "../../__generated__/UserQuery";

type IUserParams = {
  id: string;
};

export const User = () => {
  const { id } = useParams<IUserParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data, loading } = useQuery<UserQuery, UserQueryVariables>(USER, {
    variables: {
      id: +id!,
    },
  });
  return (
    <>
      <Header
        title={`${data?.user?.result?.firstname} ${data?.user?.result?.lastname}`}
        subtitle={data?.user?.result?.email}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/users/${id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
          <div className="w-full xl:w-1/2   px-4 mb-4 md:mb-0">
            <WorkOrdersList />
          </div>
        </div>
      </div>
    </>
  );
};
