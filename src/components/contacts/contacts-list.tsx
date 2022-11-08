import { useQuery } from "@apollo/client";
import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { cleanObject } from "../../helpers/clean-object";
import { CONTACTS } from "../../queries/contacts.queries";
import {
  ContactsQuery,
  ContactsQueryVariables,
} from "../../__generated__/ContactsQuery";
import { ContactFiltersInput } from "../../__generated__/globalTypes";
import { Card, CardHeader } from "../cards";
import { SendIcon } from "../icons";

export const ContactsList: React.FC<ContactFiltersInput> = (where) => {
  const navigate = useNavigate();
  const { data } = useQuery<ContactsQuery, ContactsQueryVariables>(CONTACTS, {
    variables: {
      limit: 5,
      offset: 0,
      where,
    },
  });

  return (
    <Card>
      <CardHeader
        title="Contact sur Place"
        button={{
          title: "Nouveau Contact",
          icon: <SendIcon />,
          url:
            Object.keys(where).length > 0
              ? `/contacts/create?${createSearchParams(cleanObject(where))}`
              : `/contacts/create`,
        }}
      />
      <table className="table-auto w-full">
        <thead>
          <tr className="text-xs text-gray-500 text-left padding-table ">
            <th className=" font-medium padding-table ">Nom</th>
            <th className=" font-medium padding-table text-center ">
              Téléphone
            </th>
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
                    onClick={() => navigate(`/contacts/${contact.id}`)}
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
    </Card>
  );
};
