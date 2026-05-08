// Final Dashboard page — Map + Sidebar
import React, { useState } from 'react';
import SimpleMap from '../components/SimpleMap';

export default function Dashboard({ role, name, handleLogout }) {
  const [isSignaling, setIsSignaling] = useState(false);

  return (
    <div className="dashboard animate-fade">
      {/* Map (left side) */}
      <div className="map-section">
        <SimpleMap isSignaling={isSignaling} />
      </div>

      {/* Sidebar (right side) */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>QuickRick</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="user-info">
          <h3>Hi, {name}!</h3>
          <p>You are a <b>{role}</b></p>
        </div>

        <br />

        {/* Passenger ko signal button dikhao */}
        {role === 'passenger' && (
          <div>
            <p>Where do you want to go?</p>
            <input type="text" placeholder="Enter destination..." />
            <br /><br />
            <button className="signal-btn" onClick={() => setIsSignaling(!isSignaling)}>
              {isSignaling ? 'Stop Signal' : 'Send Signal'}
            </button>
          </div>
        )}

        {/* Driver ko nearby rides dikhao */}
        {role === 'driver' && (
          <div className="status-card">
            <h3>Nearby Rides</h3>
            <p>3 Passengers are looking for a ride!</p>
          </div>
        )}
      </div>
    </div>
  );
}
