// React library le kar aao
import React from 'react';
// React-Leaflet se map banane wale chote-chote pieces (tags) le kar aao
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';

// Yeh component map banane ke liye hai.
// Isko ek parameter milta hai 'isSignaling' jo batata hai ki yellow bada circle dikhana hai ya nahi.
export default function SimpleMap({ isSignaling }) {
  
  // Ek array [Latitude, Longitude] banaya jisme New Delhi ke coordinates fix dal diye. Map yahin shuru hoga.
  const mapCenter = [28.6139, 77.209];

  // HTML me map return karte hain
  return (
    // MapContainer pura map ka chakor box hai. 'center' me mapCenter pass kiya, aur 'zoom' set kar diya 15 par (thoda paas).
    <MapContainer center={mapCenter} zoom={15} className="map-frame">
      
      {/* TileLayer asli me photo lata hai galiyon ki OpenStreetMap internet server se */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marker ek pin hota hai jo map ke us point par khada rehta hai (user ki location man lo isko) */}
      <Marker position={mapCenter} />
      
      {/* Agar 'isSignaling' true hai (yaani passenger ne signal button daba rakha hai) toh... */}
      {isSignaling === true ? (
        // ...ek bada Gol chakkar (Circle) banao jiska radius 200 meter ho aur color peela (yellow) ho.
        <Circle
          center={mapCenter} // Circle kis pin par beecho beech banega
          radius={200} // Circle kitna bada hoga
          pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.3 }} // Circle ki CSS coloring
        />
      ) : null} 
      {/* Agar 'isSignaling' false hai toh kuch mat banao (null) */}
      
    </MapContainer>
  )
}
