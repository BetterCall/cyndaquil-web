import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/header";
import { SendIcon } from "../../components/icons";

import { BRAND } from "../../queries/brands.queries";
import {
  BrandQuery,
  BrandQueryVariables,
} from "../../__generated__/BrandQuery";

type IBrand = {
  id: string;
};

export const Brand = () => {
  const { id } = useParams<IBrand>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    }
  }, []);

  const { data } = useQuery<BrandQuery, BrandQueryVariables>(BRAND, {
    variables: {
      id: +id!,
    },
  });

  return (
    <>
      <Header
        title="Brand"
        subtitle=" c"
        buttons={[
          {
            actionText: "Nouvelle Marque",
            bgColor: "indigo",
            textColor: "white",
            link: `/brands/create`,
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container"></div>
    </>
  );
};
