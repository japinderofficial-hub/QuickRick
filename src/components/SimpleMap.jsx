// Map dikhane wala component — Leaflet use karta hai
import React from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';

export default function SimpleMap({ isSignaling }) {
  const center = [28.6139, 77.209]; // Delhi ke coordinates

  return (
    <MapContainer center={center} zoom={15} className="map-frame">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center} />
      {isSignaling && (
        <Circle center={center} radius={200} pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.3 }} />
      )}
    </MapContainer>
  );
}
