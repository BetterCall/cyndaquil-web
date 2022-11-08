import React from "react";
import { UseFormReturn } from "react-hook-form";

interface IAddressInputsProps {
  form: UseFormReturn<any, any>;
}

export const AddressInputs: React.FC<IAddressInputsProps> = ({ form }) => {
  return (
    <div className="flex flex-wrap w-full mb-8">
      <div className="w-full ">
        <div className=" h-full overflow-hidden bg-white rounded-md">
          <div className="flex flex-wrap -m-3 mb-3">
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Numero de rue
              </p>
              <input
                className="w-full input"
                {...form.register("streetNumber", {
                  required: "name required",
                })}
                placeholder="streetNumber"
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Complément
              </p>
              <input className="w-full input" type="text" placeholder="Bis" />
            </div>

            <div className="w-full p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Adresse
              </p>
              <input
                className="w-full input"
                {...form.register("street", { required: "name required" })}
                placeholder="street"
              />
            </div>

            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Ville
              </p>
              <input
                className="w-full input"
                {...form.register("city", { required: "city required" })}
                placeholder="city"
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Code Postal
              </p>
              <input
                className="w-full input"
                {...form.register("postal", { required: "postal required" })}
                placeholder="postal"
              />
            </div>

            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Latitude
              </p>
              <input
                className="w-full input"
                {...form.register("lat", { required: "name required" })}
                placeholder="lat"
              />
            </div>
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Longitude
              </p>
              <input
                className="w-full input"
                {...form.register("lng", { required: "name required" })}
                placeholder="lng"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
