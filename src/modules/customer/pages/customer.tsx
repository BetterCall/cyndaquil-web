import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CardHeader } from "../../../components/cards";

import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";
import { DemandsPreview } from "../../demands/components";
import { ContactsPreview } from "../../contacts/components";
import { PricesPreview } from "../../prices/components";
import { SitesPreview } from "../../sites/components";
import { WorkOrdersPreview } from "../../work-orders/components";
import { useCustomer } from "../hooks";

type ICustomerParams = {
  id: string;
};

export const Customer: React.FC = () => {
  const { id } = useParams<ICustomerParams>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      navigate("/customers");
    }
  }, []);

  const { data, loading, refetch } = useCustomer(+id!);

  return (
    <>
      <Header
        title={data?.customer?.result?.name ?? ""}
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Modifier",
            bgColor: "indigo",
            textColor: "white",
            link: `/customer/${data?.customer?.result?.id}/update`,
            icon: <SendIcon />,
          },
        ]}
      />

      <div className="main-container">
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="Immeubles" />
              <SitesPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/sites/create?customerId=${id}`)}
                  >
                    Nouveau Site
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="card">
              <CardHeader title="Gestionnaires" />
              <ContactsPreview where={{ customerId: +id! }} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/contact/create?customerId=${id}`)}
                  >
                    Nouveau Contact
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="Bon D'intervention" />
              <WorkOrdersPreview customerId={+id!} />

              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() =>
                      navigate(`/work-order/create?customerId=${id}`)
                    }
                  >
                    Nouveau BI
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="card">
              <CardHeader title="Tarifs" />
              <PricesPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/price/create?customerId=${id}`)}
                  >
                    Nouveau Tarif
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="left">
            <div className="card">
              <CardHeader title="Appels" />
              <DemandsPreview customerId={+id!} />
              <div className="cardFooter">
                <div className="w-full md:w-1/2 px-2">
                  <div
                    className="btn"
                    onClick={() => navigate(`/call/create?customerId=${id}`)}
                  >
                    Nouvel Appel
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
