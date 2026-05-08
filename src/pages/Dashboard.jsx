import React, { useState, useEffect } from 'react';
import SimpleMap from '../components/SimpleMap';
import {
  APP_NAME, DASHBOARD_QUESTION, DESTINATION_PLACEHOLDER,
  SIGNAL_ON_TEXT, SIGNAL_OFF_TEXT, NEARBY_RIDES, NEARBY_TEXT,
  NEARBY_DRIVERS, NEARBY_PASSENGERS, MAP_CENTER
} from '../config';

function Dashboard({ role, name, handleLogout }) {

  var [isSignaling, setIsSignaling] = useState(false);
  var [nearbyPositions, setNearbyPositions] = useState([]);

  useEffect(() => {
    if (isSignaling === true) {
      var initial = role === 'passenger' ? [...NEARBY_DRIVERS] : [...NEARBY_PASSENGERS];
      setNearbyPositions(initial);

      if (role === 'passenger') {
        var closestIdx = 0;
        var minDistance = 999;
        
        initial.forEach((pos, i) => {
          var dist = Math.sqrt(Math.pow(pos[0] - MAP_CENTER[0], 2) + Math.pow(pos[1] - MAP_CENTER[1], 2));
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
          }
        });

        var interval = setInterval(() => {
          setNearbyPositions(prev => {
            var newPos = [...prev];
            var target = MAP_CENTER;
            var current = newPos[closestIdx];

            var speed = 0.0002;
            var arriveThreshold = 0.0003;

            if (Math.abs(current[0] - target[0]) > 0.0001) {
              newPos[closestIdx] = [current[0] + (target[0] > current[0] ? speed : -speed), current[1]];
            } else if (Math.abs(current[1] - target[1]) > 0.0001) {
              newPos[closestIdx] = [current[0], current[1] + (target[1] > current[1] ? speed : -speed)];
            }

            var distRemaining = Math.sqrt(Math.pow(newPos[closestIdx][0] - target[0], 2) + Math.pow(newPos[closestIdx][1] - target[1], 2));
            if (distRemaining < arriveThreshold) {
              clearInterval(interval);
              setIsSignaling(false);
              alert("🛺 Your QuickRick has arrived at your location!");
            }

            return newPos;
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    } else {
      setNearbyPositions([]);
    }
  }, [isSignaling, role]);

  function toggleSignal() {
    setIsSignaling(!isSignaling);
  }

  var buttonText = SIGNAL_OFF_TEXT;
  if (isSignaling === true) {
    buttonText = SIGNAL_ON_TEXT;
  }

  return (
    <div className="dashboard animate-fade">
      <div className="map-section" onClick={() => setIsSignaling(!isSignaling)} style={{ cursor: 'pointer' }}>
        <SimpleMap isSignaling={isSignaling} role={role} nearbyPositions={nearbyPositions} />
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <h2>{APP_NAME}</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="user-info">
          <h3>Hi, {name}!</h3>
          <p>You are a <b>{role}</b></p>
        </div>

        <br />

        {role === 'passenger' ? (
          <div>
            <p>{DASHBOARD_QUESTION}</p>
            <input type="text" placeholder={DESTINATION_PLACEHOLDER} />
            <br /><br />
            <button className="signal-btn" onClick={toggleSignal}>{buttonText}</button>
          </div>
        ) : null}

        {role === 'driver' ? (
          <div className="status-card">
            <h3>Nearby Rides</h3>
            <p>{NEARBY_RIDES}{NEARBY_TEXT}</p>
            <br />
            <button className="signal-btn" onClick={toggleSignal}>
              {isSignaling ? "Go Offline" : "Go Online"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;
