// React include kiya
import React from 'react';
// Steps dikhane ke liye include kiya
import StepIndicator from '../components/StepIndicator';
// Naya component jo files (photo) upload karne ke chakor dibbe (cards) banata hai
import FileUploadCard from '../components/FileUploadCard';

// Yeh page sirf Drivers ke liye hai. Inhe 2 files deni hoti hai: Aadhaar aur License.
export default function DocumentUpload({ 
  aadhaarFile, setAadhaarFile, 
  licenseFile, setLicenseFile, 
  setView 
}) {
  
  // Jab 'Submit' button dabaya jayega
  const handleDocumentsSubmit = () => {
    // Agar aadhaar wali file select hi nahi hui hai (null hai)
    if (aadhaarFile === null) {
      alert('Please upload Aadhaar Card'); // Toh unhe photo upload karne ko bolo
      return; // Aage dashboard me jane se rok do
    }
    // Agar license wali file select nahi hui hai
    if (licenseFile === null) {
      alert('Please upload License Plate Document'); // Toh bolo photo upload karein
      return; // Yahin ruk jao
    }
    // Agar dono file hain, toh final page yani dashboard khol do
    setView('dashboard');
  }

  // Wapas peeche OTP wale page par jaane ke liye
  const goBack = () => {
    setView('otp');
  }

  // HTML yahan se shuru hota hai
  return (
    <div className="auth-container">
      {/* doc-card ek extra css class hai jo is dibbe ko baakiyon se thoda chouda (wide) karti hai */}
      <div className="auth-card animate-fade doc-card">
        
        {/* Back button */}
        <button className="back-btn" onClick={goBack}>← Back</button>
        
        <div className="brand">QuickRick</div>
        
        {/* Progress bar me 2 daala hai, matlab yeh driver ke case me 3rd step (0,1,2) hai. Total steps 4 */}
        <StepIndicator current={2} total={4} />
        
        <h1>Upload Documents</h1>
        <p className="subtitle">We need these to verify your identity</p>

        {/* Files upload karne wale dono dibbe ek list ke andar hain */}
        <div className="upload-list">
          
          {/* Pehla Aadhaar upload dibba */}
          <FileUploadCard
            label="Aadhaar Card" // Card ke andar kya likhna hai
            icon="🪪" // Card ke left me konsi emoji aayegi
            file={aadhaarFile} // Kaunsi photo abhi tak save hui hai (agar koi nhi toh null)
            onFileChange={setAadhaarFile} // Jab naya photo computer se select ho toh is function ko dedo (save karega)
            id="aadhaar-upload" // HTML tag ka ek normal zaroori naam
          />
          
          {/* Dusra License upload dibba */}
          <FileUploadCard
            label="License Plate / Vehicle RC" // Andar likha text
            icon="🚗" // Emoji
            file={licenseFile} // State me save file
            onFileChange={setLicenseFile} // Select hoti hi is state me save karne ke liye
            id="license-upload" // HTML ka naam
          />
        </div>

        {/* Aakhiri button jo sab check karke dashboard le jayega */}
        <button className="btn btn-primary" onClick={handleDocumentsSubmit}>Submit & Enter</button>
      </div>
    </div>
  )
}
