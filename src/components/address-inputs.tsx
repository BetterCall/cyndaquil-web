import React from "react";
import { FormError } from "./form-error";

interface IAddressInputsProps {
  register: any;
  errors: any;
}

export const AddressInputs: React.FC<IAddressInputsProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="flex flex-wrap w-full mb-8">
      <div className="w-full mb-8 pb-6 border-b border-coolGray-100">
        <div className="flex flex-wrap items-center justify-between -m-2">
          <div className="w-full p-2">
            <h2 className="text-coolGray-900 text-lg font-semibold">Adresse</h2>
            <p className="text-xs text-coolGray-500 font-medium">
              Update your billing details and address.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className=" h-full overflow-hidden bg-white rounded-md">
          <div className="flex flex-wrap -m-3 mb-3">
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Numero de rue
              </p>
              <input
                className="w-full input"
                {...register("streetNumber", { required: "name required" })}
                placeholder="streetNumber"
              />
              {errors.number?.message && (
                <FormError message={errors.number?.message} />
              )}
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
                {...register("street", { required: "name required" })}
                placeholder="street"
              />
              {errors.street?.message && (
                <FormError message={errors.street?.message} />
              )}
            </div>

            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Ville
              </p>
              <input
                className="w-full input"
                {...register("city", { required: "city required" })}
                placeholder="city"
              />
              {errors.city?.message && (
                <FormError message={errors.city?.message} />
              )}
            </div>
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Code Postal
              </p>
              <input
                className="w-full input"
                {...register("postal", { required: "postal required" })}
                placeholder="postal"
              />
              {errors.postal?.message && (
                <FormError message={errors.postal?.message} />
              )}
            </div>

            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Latitude
              </p>
              <input
                className="w-full input"
                {...register("lat", { required: "name required" })}
                placeholder="lat"
              />
              {errors.lat?.message && (
                <FormError message={errors.lat?.message} />
              )}
            </div>
            <div className="w-full md:w-1/2 p-3">
              <p className="mb-1.5 font-medium text-base text-coolGray-800">
                Longitude
              </p>
              <input
                className="w-full input"
                {...register("lng", { required: "name required" })}
                placeholder="lng"
              />
              {errors.lng?.message && (
                <FormError message={errors.lng?.message} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
