// Driver ke documents upload karne wala page (Aadhaar + License)
import React from 'react';
import StepIndicator from '../components/StepIndicator';
import FileUploadCard from '../components/FileUploadCard';

export default function DocumentUpload({ aadhaarFile, setAadhaarFile, licenseFile, setLicenseFile, setView }) {
  // Submit button click
  const handleSubmit = () => {
    if (!aadhaarFile) return alert('Please upload Aadhaar Card');
    if (!licenseFile) return alert('Please upload License Plate Document');
    setView('dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade doc-card">
        <button className="back-btn" onClick={() => setView('otp')}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={2} total={4} />

        <h1>Upload Documents</h1>
        <p className="subtitle">We need these to verify your identity</p>

        <div className="upload-list">
          <FileUploadCard label="Aadhaar Card" icon="🪪" file={aadhaarFile} onFileChange={setAadhaarFile} id="aadhaar-upload" />
          <FileUploadCard label="License Plate / Vehicle RC" icon="🚗" file={licenseFile} onFileChange={setLicenseFile} id="license-upload" />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>Submit & Enter</button>
      </div>
    </div>
  );
}
