// React module le rahe hain
import React from 'react';
// Progress steps dikhane wala gol chakkar
import StepIndicator from '../components/StepIndicator';

// Yeh function OTP wala page banayega.
export default function OtpVerification({ role, mobile, otp, setOtp, setView }) {
  
  // Dummy (Nakli) OTP set kar diya project me check karne ke liye. Sirf 123456 par pass hoga.
  const DEMO_OTP = '123456';

  // Jab user 'Verify' button click karega
  const handleVerifyOtp = () => {
    // Agar type kiya hua OTP hamare DEMO_OTP se match nahi karta
    if (otp !== DEMO_OTP) {
      alert('Invalid OTP! Use 123456'); // Popup me error message dikhao
      return; // Aage mat badho, yahin function rok do
    }
    
    // Agar password sahi tha, toh check karo ki user ka role kya hai
    if (role === 'driver') {
      setView('documents'); // Driver ko documents (Aadhaar, License) wale page par bhejo
    } else {
      setView('dashboard'); // Passenger ko direct main map (Dashboard) par bhejo
    }
  }

  // Back button par click karne se pichle signup page par chale jayenge
  const goBack = () => {
    setView('signup');
  }

  // Resend OTP text par click karne se kya hoga
  const handleResend = () => {
    alert('OTP Resent!'); // Ek message de diya bas demo ke liye
  }

  // Fir se check kiya ki progress bar me 3 steps dikhane hain ya 4
  let totalSteps = 3;
  if (role === 'driver') {
    totalSteps = 4;
  }

  // Niche jo yellow button hai, uske upar kya text likha hona chahiye
  let buttonText = "Verify & Enter"; // Passenger ke liye direct andar jayega
  if (role === 'driver') {
    buttonText = "Verify & Continue"; // Driver ke liye aage ek aur step (documents) hai, isliye Continue likha
  }

  // Jab OTP box me type kiya jata hai
  const handleOtpChange = (e) => {
    // Galti se space ya letters type ho jaye, toh use uda kar sirf number rakho
    const cleanOtp = e.target.value.replace(/[^0-9]/g, '');
    setOtp(cleanOtp); // 'otp' ko naye number se update kar do
  }

  // Page ka HTML/Design shuru hota hai
  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">
        
        {/* Pichle page par wapas jaane ka button */}
        <button className="back-btn" onClick={goBack}>← Back</button>
        
        <div className="brand">QuickRick</div>
        
        {/* Progress bar, current step = 1 (yaani dusra step kyuki ginti 0 se shuru hoti hai) */}
        <StepIndicator current={1} total={totalSteps} />
        
        <h1>Verify OTP</h1>
        {/* Pata chale ki kis number par message gaya hai, isliye upar purane page se aaya 'mobile' use kiya */}
        <p className="subtitle">OTP sent to +91 {mobile}. Use <strong>{DEMO_OTP}</strong></p>

        {/* OTP daalne ka bada sa dibba */}
        <div className="otp-group">
          <input
            type="text" // Type text hai kyuki styling text jaisi deni thi CSS me
            className="otp-input" // Bada-bada OTP dikhe uski CSS
            placeholder="● ● ● ● ● ●" // Piche halka sa dots dikhaye
            maxLength="6" // Sirf 6 number likh sakte hain
            value={otp} // State me saved otp
            onChange={handleOtpChange} // Keyboard chalate hi filter wala function run karo
          />
        </div>

        {/* Verify karne ka button */}
        <button className="btn btn-primary" onClick={handleVerifyOtp}>
          {buttonText} {/* Upar jo text decide kiya tha wo */}
        </button>

        {/* Resend karne ka ek nakli link neeche */}
        <p className="resend-text">Didn't receive? <button className="link-btn" onClick={handleResend}>Resend OTP</button></p>
      </div>
    </div>
  )
}
