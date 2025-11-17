"use client";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { Icon, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import MarkerImage from "../assets/images/map-marker.png";
import { mapTypes } from "../constents/componentsConstents";

type MapLocation = LatLngLiteral;

type MapProps = {
  center: LatLngLiteral;
  location: MapLocation;
};
const getMapTypeButtonClassName = (
  isFirstButton: boolean,
  isLastButton: boolean,
  isSelected: boolean
) => {
  return `text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 ${
    isFirstButton
      ? "rounded-br-none rounded-tr-none"
      : isLastButton
      ? "rounded-bl-none rounded-tl-none"
      : "rounded-none"
  } ${isSelected ? "bg-black" : "bg-blue-500"}`;
};

export const Map: React.FC<MapProps> = ({ center, location }) => {
  console.log("Marker Image", MarkerImage);
  const [mapType, setMapType] = useState<string>("roadmap");

  const getUrl = () => {
    const mapTypeUrls: Record<string, string> = {
      roadmap: "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
      satellite: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
      hybrid: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
      terrain: "http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    };
    return mapTypeUrls[mapType];
  };

  const mapMarkIcon = new Icon({
    iconUrl: MarkerImage.src,
    iconSize: [47, 55],
  });

  const renderMarks = () => {
    return (
      <div>
        <Marker
          icon={mapMarkIcon}
          position={{ lat: location.lat, lng: location.lng }}
        />
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-[80vh] rounded-[20px] overflow-hidden">
        <MapContainer
          className="w-full h-full"
          center={center}
          zoom={15}
          minZoom={5}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url={getUrl()} />
          {renderMarks()}
          <ZoomControl position="topright" />
        </MapContainer>
      </div>
      <div
        className="flex justify-center gap-0 mt-2.5"
      >
        {mapTypes.map((type: string, index: number) => (
          <button
            key = {index}
            className={getMapTypeButtonClassName(
              index === 0,
              index === mapTypes.length- 1,
              type === mapType
            )}
            onClick={() => setMapType(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
};
