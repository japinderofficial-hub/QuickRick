// Signup page — Naam aur Mobile number lega
import React from 'react';
import StepIndicator from '../components/StepIndicator';

export default function Signup({ role, name, setName, mobile, setMobile, setView, setRole }) {
  // Send OTP button click
  const handleSignup = () => {
    if (!name) return alert('Enter your name');
    if (mobile.length !== 10) return alert('Enter 10-digit mobile number');
    setView('otp');
  };

  // Back button — role page par wapas
  const goBack = () => { setView('role'); setRole(''); };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={0} total={role === 'driver' ? 4 : 3} />

        <h1>{role === 'driver' ? 'Driver' : 'Passenger'} Sign Up</h1>
        <p className="subtitle">Tell us about yourself</p>

        <div className="input-group">
          <label className="label">Full Name</label>
          <input type="text" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label className="label">Mobile Number</label>
          <input type="tel" placeholder="9876543210" maxLength="10" value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>

        <button className="btn btn-primary" onClick={handleSignup}>Send OTP</button>
      </div>
    </div>
  );
}
