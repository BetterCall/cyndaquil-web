import { GoogleMap, Marker } from "@react-google-maps/api";
import React from "react";

interface IProps {
  lat: number;
  lng: number;
  zoom: number;
}

export const SimpleMap: React.FC<IProps> = ({ lat, lng, zoom }) => {
  return (
    <div className="w-full">
      <GoogleMap
        zoom={zoom}
        center={{ lat, lng }}
        mapContainerClassName="simple-map-container"
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
          mapId: "af58f3b3a3236102",
        }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    </div>
  );
};
