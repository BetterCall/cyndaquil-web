import React from "react";
interface IProps {
  text: string;
  error?: boolean;
}

export const EmptyList: React.FC<IProps> = ({ text, error = false }) => {
  return (
    <div
      className={`flex justify-center align-middle py-8  ${
        error
          ? " bg-red-100  border-red-200"
          : " bg-slate-100  border-slate-200"
      }  rounded border-solid`}
    >
      <div className="flex flex-row  justify-center  w-1/2 md:w-full">
        <div>
          <svg
            width="24"
            height="20"
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.7 15.5001L14.6 1.50011C13.8 0.100109 11.9 -0.399891 10.5 0.400109C10 0.700109 9.60001 1.10011 9.40001 1.50011L1.30001 15.5001C0.500011 16.9001 1.00001 18.8001 2.40001 19.6001C2.90001 19.9001 3.40001 20.0001 3.90001 20.0001H20C21.7 20.0001 23 18.6001 23 17.0001C23.1 16.4001 22.9 15.9001 22.7 15.5001ZM12 16.0001C11.4 16.0001 11 15.6001 11 15.0001C11 14.4001 11.4 14.0001 12 14.0001C12.6 14.0001 13 14.4001 13 15.0001C13 15.6001 12.6 16.0001 12 16.0001ZM13 11.0001C13 11.6001 12.6 12.0001 12 12.0001C11.4 12.0001 11 11.6001 11 11.0001V7.00011C11 6.40011 11.4 6.00011 12 6.00011C12.6 6.00011 13 6.40011 13 7.00011V11.0001Z"
              fill="lightblue"
            ></path>
          </svg>
        </div>
        <span className="font-bold inline-block align-text-bottom ml-2 text-gray-600">
          {text}
        </span>
      </div>
    </div>
  );
};
