import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { UPDATE_SITE } from "../sites.queries";
import {
  UpdateSiteMutation,
  UpdateSiteMutationVariables,
} from "../../../__generated__/UpdateSiteMutation";

interface ICompleteButton {
  siteId: number;
}

export const CompleteButton: React.FC<ICompleteButton> = ({ siteId: id }) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [mutate, { loading }] = useMutation<
    UpdateSiteMutation,
    UpdateSiteMutationVariables
  >(UPDATE_SITE, {
    variables: {
      id,
      input: {
        completed: true,
      },
    },
  });

  const submit = async () => {
    try {
      const { data } = await mutate();
      if (data?.updateSite?.ok) {
        alert("ok");

        client.writeFragment({
          id: `Site:${id}`,
          fragment: gql`
            fragment SiteCompleted on Site {
              completed
            }
          `,
          data: {
            completed: true,
          },
        });

        navigate(`/site/${id}`);
      }
    } catch (error) {
      alert("error");
    }
  };
  return (
    <Button
      actionText="Completer le site"
      onClick={submit}
      loading={loading}
      canClick={!loading}
    />
  );
};
