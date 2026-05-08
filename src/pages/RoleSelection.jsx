import React from 'react';
import {
  APP_NAME, APP_TAG,
  WELCOME_HEADING, WELCOME_SUBTITLE,
  PASSENGER_LABEL, PASSENGER_ICON, PASSENGER_DESC,
  DRIVER_LABEL, DRIVER_ICON, DRIVER_DESC
} from '../config';

function RoleSelection({ setRole, setView }) {

  function passengerClick() {
    setRole('passenger');
    setView('signup');
  }

  function driverClick() {
    setRole('driver');
    setView('signup');
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade role-card">
        <div className="brand">
          {APP_NAME} <span>{APP_TAG}</span>
        </div>
        
        <h1>{WELCOME_HEADING}</h1>
        <p className="subtitle">{WELCOME_SUBTITLE}</p>

        <div className="role-grid">
          <button className="role-choice" onClick={passengerClick}>
            <div className="role-choice-icon">{PASSENGER_ICON}</div>
            <div className="role-choice-title">{PASSENGER_LABEL}</div>
            <div className="role-choice-desc">{PASSENGER_DESC}</div>
          </button>

          <button className="role-choice" onClick={driverClick}>
            <div className="role-choice-icon">{DRIVER_ICON}</div>
            <div className="role-choice-title">{DRIVER_LABEL}</div>
            <div className="role-choice-desc">{DRIVER_DESC}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
