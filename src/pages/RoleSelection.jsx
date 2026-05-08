// Pehla page — User choose karega ki Passenger hai ya Driver
import React from 'react';

export default function RoleSelection({ setRole, setView }) {
  // Ek hi function dono buttons ke liye — role set karo aur signup page kholo
  const pick = (r) => { setRole(r); setView('signup'); };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade role-card">
        <div className="brand">QuickRick <span>BETA</span></div>
        <h1>Welcome!</h1>
        <p className="subtitle">How would you like to use QuickRick?</p>

        <div className="role-grid">
          <button className="role-choice" onClick={() => pick('passenger')}>
            <div className="role-choice-icon">🧑‍💼</div>
            <div className="role-choice-title">Passenger</div>
            <div className="role-choice-desc">Book a rick &amp; go anywhere</div>
          </button>

          <button className="role-choice" onClick={() => pick('driver')}>
            <div className="role-choice-icon">🛺</div>
            <div className="role-choice-title">Driver</div>
            <div className="role-choice-desc">Accept rides &amp; earn money</div>
          </button>
        </div>
      </div>
    </div>
  );
}
