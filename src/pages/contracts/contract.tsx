import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CONTRACT } from "../../queries/contracts.queries";
import {
  ContractQuery,
  ContractQueryVariables,
} from "../../__generated__/ContractQuery";

type IContractParams = {
  id: string;
};

export const Contract = () => {
  const { id } = useParams<IContractParams>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/contracts");
    }
  }, []);

  const { data } = useQuery<ContractQuery, ContractQueryVariables>(CONTRACT, {
    variables: {
      id: +id!,
    },
  });

  console.log(data);

  return (
    <div>
      <div className="w-full bg-gray-800 text-white px-6 py-4 text-center font-bold">
        {data?.contract?.result?.status}
      </div>
      <div>contract : {data?.contract?.result?.id}</div>
      <div>customer : {data?.contract?.result?.customer?.name}</div>
      <div>site : {data?.contract?.result?.site?.name}</div>
      <div>
        Résumé :{" "}
        {data?.contract?.result?.rows?.map((row: any) => (
          <ul className="mb-5">
            <li>category : {row.category}</li>
            <li>quantity : {row.quantity}</li>
            <li>Unit Price : {row.unitPrice}</li>
            <li>Total Price : {row.unitPrice * row.quantity}€</li>
          </ul>
        ))}
      </div>
      <div className="mt-24">
        Detail :
        <ul>
          {data?.contract?.result?.emplacements?.map((eq) => (
            <li>
              {eq.emplacement.floor?.name} - {eq.emplacement?.category?.name}{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
