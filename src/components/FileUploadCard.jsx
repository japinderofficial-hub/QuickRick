import React, { useRef } from 'react';

export default function FileUploadCard({ label, icon, file, onFileChange, id }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  }

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    onFileChange(selectedFile);
  }

  let cardClass = "upload-card";
  if (file !== null && file !== undefined) {
    cardClass = cardClass + " has-file";
  }

  return (
    <div className={cardClass} onClick={handleClick}>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      <div className="upload-icon">{icon}</div>
      <div className="upload-info">
        <span className="upload-label">{label}</span>
        {file !== null && file !== undefined ? (
          <span className="upload-filename">{file.name}</span>
        ) : (
          <span className="upload-hint">Tap to upload</span>
        )}
      </div>
      {file !== null && file !== undefined && <div className="upload-check">✓</div>}
    </div>
  )
}
