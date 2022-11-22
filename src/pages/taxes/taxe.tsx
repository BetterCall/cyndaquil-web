import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";
import { TAXE } from "../../queries/taxes.queries";
import { TaxeQuery, TaxeQueryVariables } from "../../__generated__/TaxeQuery";

type ITaxe = {
  id: string;
};

export const Taxe = () => {
  const { id } = useParams<ITaxe>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useQuery<TaxeQuery, TaxeQueryVariables>(TAXE, {
    variables: {
      id: +id!,
    },
  });

  return (
    <>
      <Header
        title="Taxe"
        subtitle=""
        buttons={[
          {
            actionText: "Nouvelle Taxe",
            bgColor: "indigo",
            textColor: "white",
            link: `/taxes/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
