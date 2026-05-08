import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

var myIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = myIcon;

import {
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER, COLOR_BACKGROUND,
  COLOR_CARD, COLOR_TEXT, COLOR_TEXT_DIM, COLOR_SUCCESS,
  COLOR_DANGER, COLOR_BORDER
} from './config';

var style = document.documentElement.style;
style.setProperty('--color-primary', COLOR_PRIMARY);
style.setProperty('--color-primary-hover', COLOR_PRIMARY_HOVER);
style.setProperty('--color-bg', COLOR_BACKGROUND);
style.setProperty('--color-card', COLOR_CARD);
style.setProperty('--color-text', COLOR_TEXT);
style.setProperty('--color-text-dim', COLOR_TEXT_DIM);
style.setProperty('--color-success', COLOR_SUCCESS);
style.setProperty('--color-danger', COLOR_DANGER);
style.setProperty('--color-border', COLOR_BORDER);

import RoleSelection from './pages/RoleSelection';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import DocumentUpload from './pages/DocumentUpload';
import Dashboard from './pages/Dashboard';

function App() {
  var [view, setView] = useState('role');
  var [role, setRole] = useState('');
  var [name, setName] = useState('');
  var [mobile, setMobile] = useState('');
  var [otp, setOtp] = useState('');
  var [aadhaarFile, setAadhaarFile] = useState(null);
  var [licenseFile, setLicenseFile] = useState(null);

  function handleLogout() {
    setView('role');
    setRole('');
    setName('');
    setMobile('');
    setOtp('');
    setAadhaarFile(null);
    setLicenseFile(null);
  }

  if (view === 'role') {
    return (
      <RoleSelection
        setRole={setRole}
        setView={setView}
      />
    );
  }

  if (view === 'signup') {
    return (
      <Signup
        role={role}
        name={name}
        setName={setName}
        mobile={mobile}
        setMobile={setMobile}
        setView={setView}
        setRole={setRole}
      />
    );
  }

  if (view === 'otp') {
    return (
      <OtpVerification
        role={role}
        mobile={mobile}
        otp={otp}
        setOtp={setOtp}
        setView={setView}
      />
    );
  }

  if (view === 'documents') {
    return (
      <DocumentUpload
        aadhaarFile={aadhaarFile}
        setAadhaarFile={setAadhaarFile}
        licenseFile={licenseFile}
        setLicenseFile={setLicenseFile}
        setView={setView}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <Dashboard
        role={role}
        name={name}
        handleLogout={handleLogout}
      />
    );
  }

  return <div>Loading...</div>;
}

var rootElement = document.getElementById('root');
var root = ReactDOM.createRoot(rootElement);
root.render(<App />);