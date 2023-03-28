import React from "react";
import { useJsApiLoader, useLoadScript } from "@react-google-maps/api";
import { Map } from "./map";
import { Loading } from "../../components";

// place API KEY IN ENV FILE

// https://console.cloud.google.com/google/maps-apis/welcome?project=fbincendie&step=api_key
// api key
//AIzaSyBlZonzuifrfkR0g_e6PsuMxcTZ4IIigXQ
export const Test = () => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //     id: "fbincendie",
  //     googleMapsApiKey: "AIzaSyBlZonzuifrfkR0g_e6PsuMxcTZ4IIigXQ",
  //   });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBlZonzuifrfkR0g_e6PsuMxcTZ4IIigXQ",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <Loading />;
  }
  return <Map />;
};
