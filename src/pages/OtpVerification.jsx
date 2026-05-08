// OTP verify karne wala page — Demo OTP: 123456
import React from 'react';
import StepIndicator from '../components/StepIndicator';

export default function OtpVerification({ role, mobile, otp, setOtp, setView }) {
  // Verify button click
  const handleVerify = () => {
    if (otp !== '123456') return alert('Invalid OTP! Use 123456');
    setView(role === 'driver' ? 'documents' : 'dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={() => setView('signup')}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={1} total={role === 'driver' ? 4 : 3} />

        <h1>Verify OTP</h1>
        <p className="subtitle">OTP sent to +91 {mobile}. Use <strong>123456</strong></p>

        <div className="otp-group">
          <input type="text" className="otp-input" placeholder="● ● ● ● ● ●" maxLength="6"
            value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} />
        </div>

        <button className="btn btn-primary" onClick={handleVerify}>
          {role === 'driver' ? 'Verify & Continue' : 'Verify & Enter'}
        </button>

        <p className="resend-text">Didn't receive? <button className="link-btn" onClick={() => alert('OTP Resent!')}>Resend OTP</button></p>
      </div>
    </div>
  );
}
