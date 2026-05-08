import React from 'react';
import StepIndicator from '../components/StepIndicator';
import FileUploadCard from '../components/FileUploadCard';
import {
  APP_NAME, DOC_HEADING, DOC_SUBTITLE, DOC_SUBMIT_BUTTON,
  DOC_1_LABEL, DOC_1_ICON, DOC_1_ID, DOC_1_ERROR,
  DOC_2_LABEL, DOC_2_ICON, DOC_2_ID, DOC_2_ERROR,
  DRIVER_TOTAL_STEPS
} from '../config';

function DocumentUpload({ aadhaarFile, setAadhaarFile, licenseFile, setLicenseFile, setView }) {
  function handleSubmit() {
    if (!aadhaarFile) {
      alert(DOC_1_ERROR);
      return;
    }
    if (!licenseFile) {
      alert(DOC_2_ERROR);
      return;
    }
    setView('dashboard');
  }

  function goBack() {
    setView('otp');
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade doc-card">
        <button className="back-btn" onClick={goBack}>← Back</button>
        <div className="brand">{APP_NAME}</div>
        <StepIndicator current={2} total={DRIVER_TOTAL_STEPS} />
        <h1>{DOC_HEADING}</h1>
        <p className="subtitle">{DOC_SUBTITLE}</p>

        <div className="upload-list">
          <FileUploadCard
            label={DOC_1_LABEL}
            icon={DOC_1_ICON}
            file={aadhaarFile}
            onFileChange={setAadhaarFile}
            id={DOC_1_ID}
          />
          <FileUploadCard
            label={DOC_2_LABEL}
            icon={DOC_2_ICON}
            file={licenseFile}
            onFileChange={setLicenseFile}
            id={DOC_2_ID}
          />
        </div>

        <button className="btn btn-primary" onClick={handleSubmit}>
          {DOC_SUBMIT_BUTTON}
        </button>
      </div>
    </div>
  );
}

export default DocumentUpload;
