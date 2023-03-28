import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface IAddressInputsProps {
  form: UseFormReturn<any, any>;
}

export const AddressInputs: React.FC<IAddressInputsProps> = ({ form }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ["fr", "mc"],
      },
    },
  });

  console.log(data);

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({
      address: val,
    });
    console.log(results[0]);
    const { lat, lng } = await getLatLng(results[0]);
    form.setValue("lat", lat);
    form.setValue("lng", lng);
    form.setValue("streetNumber", results[0].address_components[0].long_name);
    form.setValue("street", results[0].address_components[1].long_name);
    form.setValue("city", results[0].address_components[2].long_name);
    form.setValue(
      "postal",
      results[0].address_components[results[0].address_components.length - 1]
        .long_name
    );
  };

  return (
    <div className="">
      <div className="w-full mb-3 ">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className="input w-full border"
            placeholder="Rechercher"
          />
          <ComboboxPopover style={{ zIndex: 4000 }}>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div className="flex ">
        <div className="w-1/2 mr-1 ">
          <div className="w-full mb-3">
            <p className="label">Numero de rue</p>

            <input
              className="w-full input"
              {...form.register("streetNumber", {
                required: "name required",
              })}
              placeholder="streetNumber"
            />
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="w-full mb-3">
            <p className="label">Complément</p>
            <input className="w-full input" type="text" placeholder="Bis" />
          </div>
        </div>
      </div>

      <div className="w-full mb-3">
        <p className="label">Adresse</p>
        <input
          className="w-full input"
          {...form.register("street", { required: "name required" })}
          placeholder="street"
        />
      </div>

      <div className="flex ">
        <div className="w-1/2 mr-1 ">
          <div className="w-full mb-3">
            <p className="label">Ville</p>
            <input
              className="w-full input"
              {...form.register("city", { required: "city required" })}
              placeholder="city"
            />
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="w-full mb-3">
            <p className="label">Code Postal</p>
            <input
              className="w-full input"
              {...form.register("postal", { required: "postal required" })}
              placeholder="postal"
            />
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="w-1/2 mr-1 ">
          <div className="w-full mb-3">
            <p className="label">Latitude</p>
            <input
              className="w-full input"
              {...form.register("lat", { required: "name required" })}
              placeholder="lat"
            />
          </div>
        </div>
        <div className="w-1/2 ml-1">
          <div className="w-full mb-3">
            <p className="label">Longitude</p>
            <input
              className="w-full input"
              {...form.register("lng", { required: "name required" })}
              placeholder="lng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
