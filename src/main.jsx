import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './styles.css'

// Fix for default marker icons in React Leaflet
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Import all pages
import RoleSelection from './pages/RoleSelection'
import Signup from './pages/Signup'
import OtpVerification from './pages/OtpVerification'
import DocumentUpload from './pages/DocumentUpload'
import Dashboard from './pages/Dashboard'

function App() {
  // Simple view state: 'role', 'signup', 'otp', 'documents', 'dashboard'
  const [view, setView] = useState('role')
  
  // Simple data state
  const [role, setRole] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  
  // File state
  const [aadhaarFile, setAadhaarFile] = useState(null)
  const [licenseFile, setLicenseFile] = useState(null)

  // Function to sign out and clear everything
  const handleLogout = () => {
    setView('role');
    setRole('');
    setName('');
    setMobile('');
    setOtp('');
    setAadhaarFile(null);
    setLicenseFile(null);
  }

  // Very basic condition rendering
  if (view === 'role') {
    return <RoleSelection setRole={setRole} setView={setView} />
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
    )
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
    )
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
    )
  }

  if (view === 'dashboard') {
    return (
      <Dashboard 
        role={role}
        name={name}
        handleLogout={handleLogout}
      />
    )
  }

  // Default fallback
  return <div>Loading...</div>
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);