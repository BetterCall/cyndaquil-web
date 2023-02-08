import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components/header";
import { SendIcon } from "../../../components/icons";

import { CustomerCategoryForm } from "../components";
import { useCreateCustomerCategory } from "../hooks";

export const CreateCustomerCategory: React.FC = () => {
  const navigate = useNavigate();

  const { form, submit, loading } = useCreateCustomerCategory({
    defaultValues: {
      name: "",
    },
    onCompleted: () => {
      toast.success("La catégorie a été créée avec succès");
    },
  });

  return (
    <>
      <Header
        title="Nouvelle Catégorie de client"
        subtitle="Un sous titre un peu long"
        buttons={[
          {
            actionText: "Annuler",
            bgColor: "indigo",
            textColor: "white",
            link: "/customers/categories",
            icon: <SendIcon />,
          },
        ]}
      />
      <div className="main-container">
        <CustomerCategoryForm loading={loading} submit={submit} form={form} />
      </div>
    </>
  );
};

// client.writeQuery({
//   query: CUSTOMER_CATEGORIES,
//   data: {
//     customerCategories: {
//       ...queryResult.customerCategories,
//       results: [
//         {
//           __typename: "CustomerCategory",
//           id: data?.createCustomerCategory?.id,
//           ...input,
//         },
//         ,
//         ...queryResult.customerCategories.results,
//       ],
//     },
//   },
// });
