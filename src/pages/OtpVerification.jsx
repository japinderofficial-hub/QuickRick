import React from 'react';
import StepIndicator from '../components/StepIndicator';
import {
  APP_NAME, DEMO_OTP, OTP_LENGTH,
  OTP_HEADING, RESEND_TEXT, RESEND_BUTTON,
  PASSENGER_TOTAL_STEPS, DRIVER_TOTAL_STEPS
} from '../config';

function OtpVerification({ role, mobile, otp, setOtp, setView }) {
  var totalSteps = role === 'driver' ? DRIVER_TOTAL_STEPS : PASSENGER_TOTAL_STEPS;
  var buttonText = role === 'driver' ? "Verify & Continue" : "Verify & Enter";

  function handleVerify() {
    if (otp !== DEMO_OTP) {
      alert('Invalid OTP! Use ' + DEMO_OTP);
      return;
    }
    if (role === 'driver') {
      setView('documents');
    } else {
      setView('dashboard');
    }
  }

  function handleOtpType(e) {
    var typed = e.target.value;
    var onlyNumbers = typed.replace(/[^0-9]/g, '');
    setOtp(onlyNumbers);
  }

  function goBack() {
    setView('signup');
  }

  function handleResend() {
    alert('OTP Resent!');
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">{APP_NAME}</div>
        <StepIndicator current={1} total={totalSteps} />
        <h1>{OTP_HEADING}</h1>
        <p className="subtitle">
          OTP sent to +91 {mobile}. Use <strong>{DEMO_OTP}</strong>
        </p>

        <div className="otp-group">
          <input
            type="text"
            className="otp-input"
            placeholder="● ● ● ● ● ●"
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={handleOtpType}
          />
        </div>

        <button className="btn btn-primary" onClick={handleVerify}>
          {buttonText}
        </button>

        <p className="resend-text">
          {RESEND_TEXT}{' '}
          <button className="link-btn" onClick={handleResend}>
            {RESEND_BUTTON}
          </button>
        </p>
      </div>
    </div>
  );
}

export default OtpVerification;
