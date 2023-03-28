import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { CustomersPreview } from "../../customer/components/customers-preview";
import { PricesPreview } from "../../prices/components";
import { useCustomerCategory } from "../hooks";

type ICustomerCategoryParams = {
  id: string;
};

export const CustomerCategory: React.FC = () => {
  const { id } = useParams<ICustomerCategoryParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers/categories");
    }
  }, []);

  const { data, loading, refetch } = useCustomerCategory(+id!);

  return (
    <>
      <Header
        title={"Catégorie de client"}
        subtitle={data?.customerCategory?.result?.name ?? ""}
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/customers/category/${data?.customerCategory?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section">
          <div className="element">
            <div className="card">
              <CardHeader title="Tarifs" />
              <PricesPreview customerCategoryId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() =>
                      navigate(`/price/create?customerCategoryId=${id}`)
                    }
                  >
                    Nouveau Tarif
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="element">
            <div className="card">
              <CardHeader title="Client" />
              <CustomersPreview where={{ categoryId: +id! }} />

              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/customers?categoryId=${id}`)}
                  >
                    Voir plus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
