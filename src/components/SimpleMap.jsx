import React from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import { 
  MAP_CENTER, MAP_ZOOM, SIGNAL_RADIUS, SIGNAL_COLOR, SIGNAL_OPACITY
} from '../config';

const radarIcon = L.divIcon({
  className: 'radar-container',
  html: '<div class="radar-dot"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const rickshawIcon = L.divIcon({
  className: 'rickshaw-container',
  html: '<div class="rickshaw-icon">🛺</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

function SimpleMap({ isSignaling, role, nearbyPositions }) {
  const searchIcon = role === 'passenger' ? rickshawIcon : radarIcon;

  return (
    <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} className="map-frame">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={MAP_CENTER}>
        <Popup>You are here</Popup>
      </Marker>

      {isSignaling ? (
        <Circle
          center={MAP_CENTER}
          radius={SIGNAL_RADIUS}
          pathOptions={{
            fillColor: SIGNAL_COLOR,
            color: SIGNAL_COLOR,
            fillOpacity: SIGNAL_OPACITY
          }}
        />
      ) : null}

      {isSignaling && nearbyPositions.map((pos, i) => (
        <Marker key={i} position={pos} icon={searchIcon}>
          <Popup>
            {role === 'passenger' ? "Driver #" : "Passenger #"} {i + 1}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default SimpleMap;
