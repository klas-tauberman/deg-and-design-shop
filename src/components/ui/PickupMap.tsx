"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

export interface PickupMapProps {
  address: string;
  lat: number;
  lng: number;
  className?: string;
}

/**
 * Dark, minimal pickup-location map. Uses CARTO's free "dark matter, no labels"
 * basemap (OpenStreetMap data) instead of Google Maps — no API key, no restaurant/
 * POI clutter by default, matches the site's dark theme natively.
 */
const pin = new DivIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:9999px;background:#FFC300;border:2px solid #F9F6F2;box-shadow:0 0 0 2px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export function PickupMap({ address, lat, lng, className = "" }: PickupMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      className={className}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={[lat, lng]} icon={pin} alt={address} />
    </MapContainer>
  );
}

export default PickupMap;
