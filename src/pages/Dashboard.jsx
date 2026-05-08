import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';

// Component to handle map center updates
function MapRefresher({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function Dashboard({ role, name, handleLogout }) {
  const [isSignaling, setIsSignaling] = useState(false);
  const [searchDots, setSearchDots] = useState([]);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]); // Delhi
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      // Create some red dots
      const dots = [];
      dots.push([mapCenter[0] + 0.002, mapCenter[1] + 0.002]);
      dots.push([mapCenter[0] - 0.003, mapCenter[1] + 0.001]);
      dots.push([mapCenter[0] + 0.001, mapCenter[1] - 0.004]);
      setSearchDots(dots);
    } else {
      setSearchDots([]);
    }
  }

  const toggleSignal = () => {
    if (isSignaling === true) {
      setIsSignaling(false);
    } else {
      setIsSignaling(true);
    }
  }

  // Very basic check for roles
  let isPassenger = false;
  if (role === 'passenger') {
    isPassenger = true;
  }

  let signalButtonClass = "signal-btn";
  if (isSignaling === true) {
    signalButtonClass = signalButtonClass + " active";
  }

  return (
    <div className="dashboard animate-fade">
      <div className="map-section">
        <MapContainer center={mapCenter} zoom={15} className="map-frame">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapRefresher center={mapCenter} />
          
          <Marker position={mapCenter} />
          
          {isSignaling === true && (
            <Circle
              center={mapCenter}
              radius={200}
              pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.3 }}
            />
          )}
          
          {searchDots.map(function(pos, idx) {
            return (
              <Circle
                key={idx}
                center={pos}
                radius={30}
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.8 }}
              />
            );
          })}
        </MapContainer>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="brand">QuickRick</div>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>

        <div className="user-info">
          <span className="label">Welcome back</span>
          <div className="value">{name}</div>
          <span 
            className="role-badge" 
            style={{ 
              background: isPassenger ? 'var(--primary)' : 'var(--secondary)', 
              color: isPassenger ? '#000' : '#fff' 
            }}
          >
            {isPassenger ? '🧑‍💼 Passenger' : '🛺 Driver'}
          </span>
        </div>

        {isPassenger === true ? (
          <div>
            <div className="input-group">
              <label className="label">Search Destination</label>
              <input
                type="text"
                placeholder="Where to?"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <button
              className={signalButtonClass}
              onClick={toggleSignal}
            >
              {isSignaling === true ? '● Signal Active' : '◉ Broadcast Signal'}
            </button>
          </div>
        ) : (
          <div className="status-card driver-status">
            <span className="label">Nearby Signals</span>
            <div className="value">3 Passengers Active</div>
          </div>
        )}

        <div className="status-card">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Map shows your live location and nearby activities. Red dots appear when you search.
          </p>
        </div>
      </div>
    </div>
  )
}
