import React from 'react';
import StepIndicator from '../components/StepIndicator';

export default function OtpVerification({ role, mobile, otp, setOtp, setView }) {
  const DEMO_OTP = '123456';

  const handleVerifyOtp = () => {
    if (otp !== DEMO_OTP) {
      alert('Invalid OTP! Use 123456');
      return;
    }
    
    if (role === 'driver') {
      setView('documents');
    } else {
      setView('dashboard');
    }
  }

  const goBack = () => {
    setView('signup');
  }

  const handleResend = () => {
    alert('OTP Resent!');
  }

  let totalSteps = 3;
  if (role === 'driver') {
    totalSteps = 4;
  }

  let buttonText = "Verify & Enter";
  if (role === 'driver') {
    buttonText = "Verify & Continue";
  }

  const handleOtpChange = (e) => {
    // Only allow numbers
    const cleanOtp = e.target.value.replace(/[^0-9]/g, '');
    setOtp(cleanOtp);
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={1} total={totalSteps} />
        <h1>Verify OTP</h1>
        <p className="subtitle">OTP sent to +91 {mobile}. Use <strong>{DEMO_OTP}</strong></p>

        <div className="otp-group">
          <input
            type="text"
            className="otp-input"
            placeholder="● ● ● ● ● ●"
            maxLength="6"
            value={otp}
            onChange={handleOtpChange}
          />
        </div>

        <button className="btn btn-primary" onClick={handleVerifyOtp}>
          {buttonText}
        </button>

        <p className="resend-text">Didn't receive? <button className="link-btn" onClick={handleResend}>Resend OTP</button></p>
      </div>
    </div>
  )
}
