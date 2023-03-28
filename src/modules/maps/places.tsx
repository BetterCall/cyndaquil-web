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

type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setOffice }: PlacesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ["fr", "monaco"],
      },
    },
  });

  const handleSelect = async (val: string) => {
    console.log(val);
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({
      address: val,
    });
    console.log(results[0]);
    const { lat, lng } = await getLatLng(results[0]);
    setOffice({ lat, lng });
  };

  console.log(status, data);

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="input w-full border"
        placeholder="Rechercher"
      />
      <ComboboxPopover style={{ zIndex: 3000 }}>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
