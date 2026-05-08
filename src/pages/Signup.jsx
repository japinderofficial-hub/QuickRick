// React library ko project me jod rahe hain
import React from 'react';
// Upar wale gol chakkar (1, 2, 3 progress) dikhane wale component ko import kiya
import StepIndicator from '../components/StepIndicator';

// Yeh function page banayega. Isko bahot saare variables aur functions parent (main.jsx) se mile hain
export default function Signup({ role, name, setName, mobile, setMobile, setView, setRole }) {
  
  // Jab user "Send OTP" wala button dabayega, tab yeh function chalega
  const handleSignup = () => {
    // Agar naam wala dabba khali hai
    if (name === '') {
      alert('Enter your name'); // Screen par warning do
      return; // Yahin ruk jao, aage mat badho
    }
    // Agar mobile number pura 10 digit ka nahi hai
    if (mobile.length !== 10) {
      alert('Enter 10-digit mobile number'); // Screen par warning do
      return; // Yahin ruk jao, aage mat badho
    }
    // Agar sab sahi hai toh app ko bolo ab agla page (OTP) dikhaye
    setView('otp');
  }

  // Jab user piche (Back) jane ka button dabayega
  const goBack = () => {
    setView('role'); // Role wale page par wapas jao
    setRole(''); // Jo role select kiya tha usko khali kar do taaki firse fresh start ho
  }

  // Pehle socho ki total kitne steps dikhane hain (3 ya 4?)
  let totalSteps = 3;
  // Agar role driver hai, toh use document upload bhi karna padega isliye 4 step honge
  if (role === 'driver') {
    totalSteps = 4;
  }

  // Page ka title kya hona chahiye?
  let title = "Passenger Sign Up";
  // Agar role driver hai toh title Driver kar do
  if (role === 'driver') {
    title = "Driver Sign Up";
  }

  // Jab user mobile ke dabbe me kuch type karega, tab yeh check karega ki wo letters toh nahi dal raha
  const handleMobileChange = (e) => {
    // Jo bhi likha, usme se alphabets (A-Z) hata do, sirf 0-9 wale number rakho
    const cleanNumber = e.target.value.replace(/[^0-9]/g, '');
    setMobile(cleanNumber); // Saaf kiya hua number state me save kar do
  }

  // Yahan se page ki HTML start hoti hai
  return (
    <div className="auth-container"> {/* Sabko center lane wala container */}
      <div className="auth-card animate-fade"> {/* Safed dibba */}
        
        {/* Upar left side me Back jane ka button */}
        <button className="back-btn" onClick={goBack}>← Back</button>
        
        {/* QuickRick Logo */}
        <div className="brand">QuickRick</div>
        
        {/* Progress bar, bata raha hai ki current = 0 (yaani pehle step par hain) */}
        <StepIndicator current={0} total={totalSteps} />
        
        {/* Page ki badi heading jo upar variable me set ki thi */}
        <h1>{title}</h1>
        <p className="subtitle">Tell us about yourself</p> {/* Choti detail line */}

        {/* Naam likhne ka dibba (Input) */}
        <div className="input-group">
          <label className="label">Full Name</label> {/* Label */}
          <input
            type="text" // Isme text likha jayega
            placeholder="Rahul Sharma" // Khali dibbe me aisa dikhega hint ki tarah
            value={name} // Is dibbe ke andar ki value humare "name" state variable se aayegi
            onChange={(e) => setName(e.target.value)} // Jab bhi ek naya letter type hoga, "name" state change hogi
          />
        </div>

        {/* Phone number likhne ka dibba (Input) */}
        <div className="input-group">
          <label className="label">Mobile Number</label>
          <input
            type="tel" // Phone number type hai
            placeholder="9876543210" // Hint
            maxLength="10" // Maximum 10 ank (digits) hi likhne dega
            value={mobile} // Isme jo likha hai wo "mobile" state variable se aayega
            onChange={handleMobileChange} // Type karte hi uper likha clean karne wala function chalega
          />
        </div>

        {/* Sabse neeche wala submit button. Click par OTP page par jane wala function chalega */}
        <button className="btn btn-primary" onClick={handleSignup}>Send OTP</button>
      </div>
    </div>
  )
}
