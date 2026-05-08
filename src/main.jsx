import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet'
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
})
L.Marker.prototype.options.icon = DefaultIcon

const DEMO_OTP = '123456'

// Component to handle map center updates
function MapRefresher({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

function App() {
  const [view, setView] = useState('auth') // auth, otp, dashboard
  const [role, setRole] = useState('passenger') 
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [isSignaling, setIsSignaling] = useState(false)
  const [signalCount, setSignalCount] = useState(0)
  const [searchDots, setSearchDots] = useState([])
  const [mapCenter, setMapCenter] = useState([28.6139, 77.209]) // Delhi
  const [searchQuery, setSearchQuery] = useState('')

  // Handle Logout
  const handleLogout = () => {
    setView('auth')
    setMobile('')
    setOtp('')
    setIsSignaling(false)
    setSearchDots([])
  }

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setView('otp')
    } else {
      alert('Enter 10-digit mobile number')
    }
  }

  const handleVerifyOtp = () => {
    if (otp === DEMO_OTP) {
      setView('dashboard')
    } else {
      alert('Invalid OTP! Use 123456')
    }
  }

  const handleSearch = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (q.length > 2) {
      // Create "red dots" around the center to simulate search results
      const dots = [
        [mapCenter[0] + 0.002, mapCenter[1] + 0.002],
        [mapCenter[0] - 0.003, mapCenter[1] + 0.001],
        [mapCenter[0] + 0.001, mapCenter[1] - 0.004]
      ]
      setSearchDots(dots)
    } else {
      setSearchDots([])
    }
  }

  if (view === 'auth') {
    return (
      <div className="auth-container">
        <div className="auth-card animate-fade">
          <div className="brand">QuickRick <span>BETA</span></div>
          <h1>Login</h1>
          <p className="subtitle">Enter mobile to continue</p>
          <div className="input-group">
            <label className="label">Mobile</label>
            <input 
              type="tel" 
              placeholder="9876543210" 
              maxLength="10"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSendOtp}>Next</button>
        </div>
      </div>
    )
  }

  if (view === 'otp') {
    return (
      <div className="auth-container">
        <div className="auth-card animate-fade">
          <div className="brand">QuickRick</div>
          <h1>Verify & Role</h1>
          <p className="subtitle">OTP sent to {mobile}. Use {DEMO_OTP}</p>
          
          <div className="input-group">
            <label className="label">OTP</label>
            <input 
              type="text" 
              placeholder="123456" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <div className="role-selector">
            <label className="label">I am a:</label>
            <div className="role-options">
              <button 
                className={`role-btn ${role === 'passenger' ? 'active' : ''}`}
                onClick={() => setRole('passenger')}
              >
                Passenger
              </button>
              <button 
                className={`role-btn ${role === 'driver' ? 'active' : ''}`}
                onClick={() => setRole('driver')}
              >
                Driver
              </button>
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleVerifyOtp}>Login</button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard animate-fade">
      <div className="map-section">
        <MapContainer center={mapCenter} zoom={15} className="map-frame">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapRefresher center={mapCenter} />
          
          {/* User Marker */}
          <Marker position={mapCenter} />
          
          {/* Working Signal visual */}
          {isSignaling && (
            <Circle 
              center={mapCenter} 
              radius={200} 
              pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.3 }} 
            />
          )}

          {/* Search Dots (Red Dots) */}
          {searchDots.map((pos, idx) => (
            <Circle 
              key={idx}
              center={pos}
              radius={30}
              pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.8 }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="brand">QuickRick</div>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>

        <div className="user-info">
          <span className="label">Role</span>
          <div className="value" style={{textTransform: 'capitalize'}}>{role}</div>
        </div>

        {role === 'passenger' ? (
          <>
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
              className={`signal-btn ${isSignaling ? 'active' : ''}`}
              onClick={() => setIsSignaling(!isSignaling)}
            >
              {isSignaling ? 'Signal Active' : 'Broadcast Signal'}
            </button>
          </>
        ) : (
          <div className="status-card driver-status">
            <span className="label">Nearby Signals</span>
            <div className="value">3 Passengers Active</div>
          </div>
        )}

        <div className="status-card">
          <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
            Map shows your live location and nearby activities. Red dots appear when you search.
          </p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)