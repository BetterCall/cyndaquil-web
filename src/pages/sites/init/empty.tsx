import react from "react";

interface IEmptyProps {
  message: string;
}

export const Empty: React.FC<IEmptyProps> = ({ message }) => {
  return (
    <div
      className={`py-5 px-6 font-medium bg-white text-indigo-500 cursor-pointer  `}
    >
      {message}
    </div>
  );
};
