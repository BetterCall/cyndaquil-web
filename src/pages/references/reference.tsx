import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { REFERENCE } from "../../queries/references.queries";
import {
  ReferenceQuery,
  ReferenceQueryVariables,
} from "../../__generated__/ReferenceQuery";
import { SendIcon } from "../../components/icons";
import { Header } from "../../components/header";

type IRefParams = {
  id: string;
};

export const Reference = () => {
  const { id } = useParams<IRefParams>();

  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/references");
    }
  }, []);

  const { data, loading } = useQuery<ReferenceQuery, ReferenceQueryVariables>(
    REFERENCE,
    {
      variables: {
        id: +id!,
      },
    }
  );

  return (
    <>
      <Header
        title={data?.reference?.result?.name ?? ""}
        subtitle={""}
        buttons={[
          {
            actionText: "Nouvelle Référence",
            bgColor: "indigo",
            textColor: "white",
            link: `/references/create`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container"></div>
    </>
  );
};
