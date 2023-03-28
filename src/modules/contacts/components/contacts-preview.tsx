import React from "react";
import { useNavigate } from "react-router-dom";

import { ContactFiltersInput } from "../../../__generated__/globalTypes";
import { useContacts } from "../hooks";
import { EmptyList, Loading } from "../../../components";

interface IContactsPreviewProps {
  where: ContactFiltersInput;
  message?: string;
}

export const ContactsPreview: React.FC<IContactsPreviewProps> = ({
  where,
  message = "Aucun Contact",
}) => {
  const navigate = useNavigate();
  const { data, loading, error } = useContacts({
    limit: 5,
    offset: 0,
    where,
  });

  if (loading) {
    return <Loading />;
  }

  if (data?.contacts?.results?.length === 0) {
    return <EmptyList text={message} />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left padding-table ">
          <th className=" font-medium padding-table ">Nom</th>
          <th className=" font-medium padding-table text-center ">Téléphone</th>
          <th className=" font-medium padding-table text-right ">Email</th>
        </tr>
      </thead>
      <tbody>
        {data?.contacts?.results?.map((contact, index) => (
          <tr
            key={`contact-${contact.id}`}
            className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
          >
            <td className="flex padding-table ">
              <div>
                <p
                  className="font-medium cursor-pointer"
                  onClick={() => navigate(`/contact/${contact.id}`)}
                >
                  {contact.firstname}
                </p>
                <p className="text-gray-500">{contact.lastname}</p>
              </div>
            </td>
            <td className="font-medium padding-table text-center ">
              {contact.phone}
            </td>
            <td className="font-medium padding-table text-right ">
              {contact.email}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
