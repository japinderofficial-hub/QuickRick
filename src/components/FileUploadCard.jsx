// Yeh ek chhota sa component hai jo ek upload wala dabba (card) banata hai
import React from 'react';

export default function FileUploadCard({ label, icon, file, onFileChange, id }) {
  return (
    // <label> use kiya hai — isse poora card click karne par chhupa hua input apne aap click ho jayega (bina useRef ke!)
    <label className={"upload-card" + (file ? " has-file" : "")} htmlFor={id}>

      {/* Chhupa hua file input — label click hone par yeh khud activate hota hai */}
      <input
        id={id}
        type="file"
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e.target.files[0])}
      />

      {/* Emoji */}
      <div className="upload-icon">{icon}</div>

      {/* Text area */}
      <div className="upload-info">
        <span className="upload-label">{label}</span>
        <span className={file ? "upload-filename" : "upload-hint"}>
          {file ? file.name : "Tap to upload"}
        </span>
      </div>

      {/* Tick mark agar file upload ho gayi hai */}
      {file && <div className="upload-check">✓</div>}
    </label>
  );
}
