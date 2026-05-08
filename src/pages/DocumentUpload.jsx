import React from 'react';
import StepIndicator from '../components/StepIndicator';
import FileUploadCard from '../components/FileUploadCard';

export default function DocumentUpload({ 
  aadhaarFile, setAadhaarFile, 
  licenseFile, setLicenseFile, 
  setView 
}) {
  const handleDocumentsSubmit = () => {
    if (aadhaarFile === null) {
      alert('Please upload Aadhaar Card');
      return;
    }
    if (licenseFile === null) {
      alert('Please upload License Plate Document');
      return;
    }
    setView('dashboard');
  }

  const goBack = () => {
    setView('otp');
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade doc-card">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">QuickRick</div>
        <StepIndicator current={2} total={4} />
        <h1>Upload Documents</h1>
        <p className="subtitle">We need these to verify your identity</p>

        <div className="upload-list">
          <FileUploadCard
            label="Aadhaar Card"
            icon="🪪"
            file={aadhaarFile}
            onFileChange={setAadhaarFile}
            id="aadhaar-upload"
          />
          <FileUploadCard
            label="License Plate / Vehicle RC"
            icon="🚗"
            file={licenseFile}
            onFileChange={setLicenseFile}
            id="license-upload"
          />
        </div>

        <button className="btn btn-primary" onClick={handleDocumentsSubmit}>Submit & Enter</button>
      </div>
    </div>
  )
}
