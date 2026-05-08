// Main App — Saara routing aur state yahan hai
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet pin fix (warna pin gayab ho jata hai React me)
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon, shadowUrl: markerShadow,
  iconSize: [25, 41], iconAnchor: [12, 41]
});

// Pages import
import RoleSelection from './pages/RoleSelection';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import DocumentUpload from './pages/DocumentUpload';
import Dashboard from './pages/Dashboard';

function App() {
  // Saari states ek jagah
  const [view, setView] = useState('role');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);

  // Logout — sab kuch reset karo
  const handleLogout = () => {
    setView('role'); setRole(''); setName(''); setMobile('');
    setOtp(''); setAadhaarFile(null); setLicenseFile(null);
  };

  // Konsa page dikhana hai — simple if-else
  if (view === 'role') return <RoleSelection setRole={setRole} setView={setView} />;
  if (view === 'signup') return <Signup role={role} name={name} setName={setName} mobile={mobile} setMobile={setMobile} setView={setView} setRole={setRole} />;
  if (view === 'otp') return <OtpVerification role={role} mobile={mobile} otp={otp} setOtp={setOtp} setView={setView} />;
  if (view === 'documents') return <DocumentUpload aadhaarFile={aadhaarFile} setAadhaarFile={setAadhaarFile} licenseFile={licenseFile} setLicenseFile={setLicenseFile} setView={setView} />;
  if (view === 'dashboard') return <Dashboard role={role} name={name} handleLogout={handleLogout} />;

  return <div>Loading...</div>;
}

// App ko screen par render karo
ReactDOM.createRoot(document.getElementById('root')).render(<App />);