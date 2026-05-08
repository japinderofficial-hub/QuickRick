// React aur useRef la rahe hain (useRef kisi button/input ko chori-chupe click karne ke kaam aata hai)
import React, { useRef } from 'react';

// Yeh function Driver ke documents upload karne wale choukor (rectangle) dabbe banata hai.
// Isko label (kya text likhna hai), icon (emoji), file (kaunsi photo selected hai), onFileChange (photo save karne ka function) mila hai.
export default function FileUploadCard({ label, icon, file, onFileChange, id }) {
  
  // Ek reference banaya jo input box se judega
  const inputRef = useRef();

  // Jab user pure card (dabbe) par kahi bhi click karega...
  const handleClick = () => {
    // ...toh asli me wo chhupa hua <input type="file"> click ho jayega automatically
    inputRef.current.click();
  }

  // Jab user PC se photo (file) choose kar leta hai
  const handleFile = (e) => {
    // Jo pehli photo usne select ki, usko uthao
    const selectedFile = e.target.files[0];
    // Upar se mile function me photo daal kar bhej do taaki state me save ho jaye
    onFileChange(selectedFile);
  }

  // Card ki CSS class tay kar rahe hain ki kaisa dikhega
  let cardClass = "upload-card";
  
  // Agar user ne koi file choose kar rakhi hai (yaani khali nahi hai)
  if (file !== null && file !== undefined) {
    // Usme "has-file" nam ki CSS jodd do, jisse dabba hara (green) ho jayega
    cardClass = cardClass + " has-file";
  }

  // HTML yahan se shuru
  return (
    // Card wala div. Iske upar onClick laga hai, matlab click karte hi photo chunne (choose) ka option aayega
    <div className={cardClass} onClick={handleClick}>
      
      {/* Yeh asli input button hai jisse file upload hoti hai. Lekin humne style="display: none" lagakar isko gayab (hide) kar rakha hai, kyunki yeh badsoorat (ugly) lagta hai */}
      <input
        ref={inputRef} // Ise pakadne ke liye hook
        id={id} // Naam
        type="file" // File browser window kholne ke liye
        accept="image/*,.pdf" // Sirf images aur PDF hi select karne dega
        style={{ display: 'none' }} // Gayab karo
        onChange={handleFile} // Photo select hote hi hamara function chalega
      />
      
      {/* Emoji (jaise gadi ya card) yahan dikhegi */}
      <div className="upload-icon">{icon}</div>
      
      {/* Is dibbe me Text hota hai */}
      <div className="upload-info">
        {/* Label (jaise "Aadhaar Card") */}
        <span className="upload-label">{label}</span>
        
        {/* Agar file null nhi hai, yani file upload hui hai, toh... */}
        {file !== null && file !== undefined ? (
          // Us photo/file ka naam dikhao (jaise "my_aadhaar.jpg")
          <span className="upload-filename">{file.name}</span>
        ) : (
          // Agar koi photo abhi tak upload nhi hui hai, toh bolo "Tap to upload"
          <span className="upload-hint">Tap to upload</span>
        )}
      </div>

      {/* Agar file upload ho gayi hai, toh card ke aakhir me ek right (✓) tick mark dikhao */}
      {file !== null && file !== undefined && <div className="upload-check">✓</div>}
    </div>
  )
}
