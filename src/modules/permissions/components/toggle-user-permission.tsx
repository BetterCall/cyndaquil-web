import React from "react";
import { toast } from "react-toastify";
import { useTogglePermission } from "../hooks/useTogglePermission";

interface IProps {
  userId: number;
  permissionId: number;
  username: string;
  active?: boolean;
}

export const ToogleUserPermission: React.FC<IProps> = ({
  userId,
  permissionId,
  username,
  active = false,
}) => {
  const [checked, setChecked] = React.useState(active);
  const { submit } = useTogglePermission({
    userId,
    permissionId,
    onCompleted: () => {
      toast.success("Permission modifiée avec succès");
      setChecked(!checked);
    },
    onError(message) {
      toast.error("Erreuir");
    },
  });
  return (
    <div className="w-full flex items-center">
      <input type={"checkbox"} checked={checked} onChange={() => submit()} />
      <p className="mb-0 ml-2">{username}</p>
    </div>
  );
};
