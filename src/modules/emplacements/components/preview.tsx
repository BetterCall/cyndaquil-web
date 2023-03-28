import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyList, Loading } from "../../../components";
import { useEmplacements } from "../hooks";

interface IEmplacementsPreviewProps {
  siteId: number;
}

export const EmplacementsPreview: React.FC<IEmplacementsPreviewProps> = ({
  siteId,
}) => {
  const navigate = useNavigate();
  const { data, loading } = useEmplacements({ where: { siteId } });
  const [categories, setCategories] = useState({});

  useEffect(() => {
    let rows = {};
    if (data?.emplacements) {
      data?.emplacements?.results?.map((emplacement) => {
        if (!rows.hasOwnProperty(emplacement.categoryId ?? "-1")) {
          rows[emplacement.categoryId ?? "-1"] = {
            name: emplacement.category?.name,
            emplacements: [],
          };
        }
        rows[emplacement.categoryId ?? "-1"].emplacements.push(emplacement);
      });

      setCategories({ ...rows });
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (data?.emplacements?.results?.length === 0) {
    return <EmptyList text="Aucun Emplacement" />;
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="text-xs text-gray-500 text-left">
          <th className="padding-table font-medium ">Catégorie</th>
          <th className="padding-table font-medium text-right">
            Nb Emplacements
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(categories)?.map((key, index) => {
          const category = categories[key];

          return (
            <tr
              key={`emplacement-${key}`}
              className={`text-xs   ${index % 2 ? "" : "bg-gray-50"} `}
            >
              <td className="padding-table font-medium">{category?.name}</td>

              <td className="padding-table font-medium text-right">
                {category.emplacements.length}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
