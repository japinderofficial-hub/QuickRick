import React from 'react';
import StepIndicator from '../components/StepIndicator';
import {
  APP_NAME, SIGNUP_SUBTITLE,
  NAME_LABEL, NAME_PLACEHOLDER,
  MOBILE_LENGTH, MOBILE_PLACEHOLDER,
  SEND_OTP_BUTTON,
  PASSENGER_TOTAL_STEPS, DRIVER_TOTAL_STEPS,
  PASSENGER_LABEL, DRIVER_LABEL
} from '../config';

function Signup({ role, name, setName, mobile, setMobile, setView, setRole }) {
  var totalSteps = role === 'driver' ? DRIVER_TOTAL_STEPS : PASSENGER_TOTAL_STEPS;
  var title = role === 'driver' ? DRIVER_LABEL + " Sign Up" : PASSENGER_LABEL + " Sign Up";

  function handleSignup() {
    if (name === '') {
      alert('Enter your name');
      return;
    }
    if (mobile.length !== MOBILE_LENGTH) {
      alert('Enter ' + MOBILE_LENGTH + '-digit mobile number');
      return;
    }
    setView('otp');
  }

  function goBack() {
    setView('role');
    setRole('');
  }

  function handleMobileType(e) {
    var typed = e.target.value;
    var onlyNumbers = typed.replace(/[^0-9]/g, '');
    setMobile(onlyNumbers);
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">{APP_NAME}</div>
        <StepIndicator current={0} total={totalSteps} />
        <h1>{title}</h1>
        <p className="subtitle">{SIGNUP_SUBTITLE}</p>

        <div className="input-group">
          <label className="label">{NAME_LABEL}</label>
          <input
            type="text"
            placeholder={NAME_PLACEHOLDER}
            value={name}
            onChange={function(e) { setName(e.target.value); }}
          />
        </div>

        <div className="input-group">
          <label className="label">Mobile Number</label>
          <input
            type="tel"
            placeholder={MOBILE_PLACEHOLDER}
            maxLength={MOBILE_LENGTH}
            value={mobile}
            onChange={handleMobileType}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSignup}>
          {SEND_OTP_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default Signup;
