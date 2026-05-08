// React la rahe hain use karne ke liye
import React from 'react';

// Yeh function RoleSelection wala page banata hai. Isko 2 functions (setRole, setView) as props mile hain
export default function RoleSelection({ setRole, setView }) {
  
  // Jab koi "Passenger" wala button dabayega, toh yeh function chalega
  const selectPassenger = () => {
    setRole('passenger'); // Puray app ko bata do ki role passenger hai
    setView('signup'); // Puray app ko bolo ab signup page par jao
  }

  // Jab koi "Driver" wala button dabayega, toh yeh function chalega
  const selectDriver = () => {
    setRole('driver'); // Puray app ko bata do ki role driver hai
    setView('signup'); // Puray app ko bolo ab signup page par jao
  }

  // Yahan se HTML shuru hota hai jo screen par dikhega
  return (
    // Bada container jo page ke center me card layega
    <div className="auth-container">
      
      {/* Safed rang ka card */}
      <div className="auth-card animate-fade role-card">
        
        {/* App ka naam aur BETA ka ek chota label */}
        <div className="brand">QuickRick <span>BETA</span></div>
        
        {/* Badi wali heading */}
        <h1>Welcome!</h1>
        
        {/* Uske neeche wali choti line */}
        <p className="subtitle">How would you like to use QuickRick?</p>

        {/* 2 button ke liye grid container banaya */}
        <div className="role-grid">
          
          {/* Pehla button: Passenger. Click karne par selectPassenger function chala do */}
          <button className="role-choice" onClick={selectPassenger}>
            <div className="role-choice-icon">🧑‍💼</div> {/* Icon */}
            <div className="role-choice-title">Passenger</div> {/* Title text */}
            <div className="role-choice-desc">Book a rick &amp; go anywhere</div> {/* Description */}
          </button>
          
          {/* Dusra button: Driver. Click karne par selectDriver function chala do */}
          <button className="role-choice" onClick={selectDriver}>
            <div className="role-choice-icon">🛺</div> {/* Icon */}
            <div className="role-choice-title">Driver</div> {/* Title text */}
            <div className="role-choice-desc">Accept rides &amp; earn money</div> {/* Description */}
          </button>
          
        </div>
      </div>
    </div>
  )
}
