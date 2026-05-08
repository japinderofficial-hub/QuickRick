import React from 'react';

function FileUploadCard({ label, icon, file, onFileChange, id }) {
  var cardClass = file ? "upload-card has-file" : "upload-card";

  function handleFile(e) {
    var selectedFile = e.target.files[0];
    onFileChange(selectedFile);
  }

  return (
    <label className={cardClass} htmlFor={id}>
      <input
        id={id}
        type="file"
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      <div className="upload-icon">{icon}</div>
      <div className="upload-info">
        <span className="upload-label">{label}</span>
        {file ? (
          <span className="upload-filename">{file.name}</span>
        ) : (
          <span className="upload-hint">Tap to upload</span>
        )}
      </div>
      {file ? <div className="upload-check">✓</div> : null}
    </label>
  );
}

export default FileUploadCard;
