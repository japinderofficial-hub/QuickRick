import React from 'react';
import StepIndicator from '../components/StepIndicator';

export default function Signup({ role, name, setName, mobile, setMobile, setView, setRole }) {
  const handleSignup = () => {
    if (name === '') {
      alert('Enter your name');
      return;
    }
    if (mobile.length !== 10) {
      alert('Enter 10-digit mobile number');
      return;
    }
    setView('otp');
  }

  const goBack = () => {
    setView('role');
    setRole('');
  }

  let totalSteps = 3;
  if (role === 'driver') {
    totalSteps = 4;
  }

  let title = "Passenger Sign Up";
  if (role === 'driver') {
    title = "Driver Sign Up";
  }

  const handleMobileChange = (e) => {
    // Only allow numbers
    const cleanNumber = e.target.value.replace(/[^0-9]/g, '');
    setMobile(cleanNumber);
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={0} total={totalSteps} />
        <h1>{title}</h1>
        <p className="subtitle">Tell us about yourself</p>

        <div className="input-group">
          <label className="label">Full Name</label>
          <input
            type="text"
            placeholder="Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="label">Mobile Number</label>
          <input
            type="tel"
            placeholder="9876543210"
            maxLength="10"
            value={mobile}
            onChange={handleMobileChange}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSignup}>Send OTP</button>
      </div>
    </div>
  )
}
