// React aur useState la rahe hain (useState page par cheezein update karta hai without refresh)
import React, { useState } from 'react';
// Hamara banaya hua chota sa Map component import kar rahe hain (ab map dashboard ke code me bheed nahi karega)
import SimpleMap from '../components/SimpleMap';

// Yeh Dashboard function hai jo app ka aakhiri bada page hai. Isme role, name, handleLogout bahar (main.jsx) se milte hain.
export default function Dashboard({ role, name, handleLogout }) {
  // Kya abhi hum map par "Signal" (Yellow circle) bhej rahe hain ya nahi? Uski state. Pehle OFF (false) hai.
  const [isSignaling, setIsSignaling] = useState(false);

  // Jab signal wala button click hoga, tab yeh logic chalega
  const buttonClicked = () => {
    // Agar signal abhi ON (true) hai, toh...
    if (isSignaling === true) {
      setIsSignaling(false); // ...isko OFF (false) kar do.
    } else {
      // Warna (agar OFF hai) toh...
      setIsSignaling(true);  // ...isko ON (true) kar do.
    }
  }

  // --- HTML (UI DESIGN) YAHAN SE SHURU HOTA HAI ---
  return (
    // 'dashboard' puri full screen ko cover karega. 'animate-fade' se yeh page dhere se aage aayega.
    <div className="dashboard animate-fade">
      
      {/* 1. MAP SECTION (LEFT SIDE) */}
      <div className="map-section">
        {/* SimpleMap ke andar map banane ka lamba code chupa hua hai. Hum usko sirf batate hain ki Signal ON hai ya OFF */}
        <SimpleMap isSignaling={isSignaling} />
      </div>

      {/* 2. SIDEBAR SECTION (RIGHT SIDE MAIN MENU) */}
      <div className="sidebar">
        
        {/* Upar ka header jisme app ka naam aur logout button hai */}
        <div className="sidebar-header">
          <h2>QuickRick</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Welcome wala dibba jisme naam aur role (Passenger ya Driver) dikhta hai */}
        <div className="user-info">
          <h3>Hi, {name}!</h3> {/* Jaise: Hi, Garvit! */}
          <p>You are a <b>{role}</b></p> {/* Jaise: You are a passenger */}
        </div>

        <br />

        {/* CONDITIONAL RENDERING (Sirf zarurat ke hisaab se dikhana) */}
        
        {/* Agar role "passenger" hai tabhi yeh 'div' dikhega: */}
        {role === "passenger" ? (
          <div>
            <p>Where do you want to go?</p>
            {/* Search type karne ki jagah (ab iska koi functional kaam nhi hai bas dikhne ke liye hai) */}
            <input type="text" placeholder="Enter destination..." />
            
            <br /><br />
            
            {/* Main Yellow Button jise dabakar auto book karne ka signal jaata hai */}
            <button className="signal-btn" onClick={buttonClicked}>
              {/* Agar signal chal raha hai toh "Stop Signal" padho, warna "Send Signal" */}
              {isSignaling === true ? "Stop Signal" : "Send Signal"}
            </button>
          </div>
        ) : null} {/* Warna passenger ka menu bilkul nahi dikhega (null) */}


        {/* Agar role "driver" hai tabhi yeh 'div' dikhega: */}
        {role === "driver" ? (
          // Status card ek design hai green colour ka dibba
          <div className="status-card">
            <h3>Nearby Rides</h3>
            {/* Yeh number fix likha hai sirf app kaisa dikhta hai uske liye */}
            <p>3 Passengers are looking for a ride!</p> 
          </div>
        ) : null} {/* Warna driver ka menu bilkul nahi dikhega (null) */}

      </div>
    </div>
  )
}
