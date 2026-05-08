// React library ko import kar rahe hain, jisse hum UI components bana sakein
import React, { useState } from 'react'

// ReactDOM import kar rahe hain, jo humare app ko browser par dikhayega (render karega)
import ReactDOM from 'react-dom/client'

// Leaflet map ki default CSS design file ko import kar rahe hain taaki map theek se dikhe
import 'leaflet/dist/leaflet.css'

// Apni custom CSS (design) wali file (styles.css) ko project me la rahe hain
import './styles.css'

// Leaflet library ko import kar rahe hain, jo map banane ke kaam aati hai
import L from 'leaflet'

// Map ke marker (pin) ki default photo import kar rahe hain
import markerIcon from 'leaflet/dist/images/marker-icon.png'

// Map ke marker ki shadow (parchai) ki photo import kar rahe hain
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Yeh code leaflet ke default pin image ko set kar raha hai, kyuki react me kabhi-kabhi pin gayab ho jata hai
let DefaultIcon = L.icon({
  iconUrl: markerIcon, // Pin ki image
  shadowUrl: markerShadow, // Parchai ki image
  iconSize: [25, 41], // Pin ki height aur width
  iconAnchor: [12, 41] // Pin ka bottom point kahan touch karega
});

// Jo naya pin icon banaya, usko default bana diya
L.Marker.prototype.options.icon = DefaultIcon;

// Alag-alag pages ko 'pages' folder se import kar rahe hain
import RoleSelection from './pages/RoleSelection'
import Signup from './pages/Signup'
import OtpVerification from './pages/OtpVerification'
import DocumentUpload from './pages/DocumentUpload'
import Dashboard from './pages/Dashboard'

// Yeh hamara main component hai jiske andar pura app chalta hai
function App() {
  
  // 'view' ek state hai jo yaad rakhti hai ki abhi screen par konsa page dikhana hai. Start me 'role' page dikhega.
  const [view, setView] = useState('role')
  
  // 'role' state yaad rakhti hai ki user 'passenger' hai ya 'driver'
  const [role, setRole] = useState('')
  
  // 'name' state me user ka naam save hota hai
  const [name, setName] = useState('')
  
  // 'mobile' state me user ka phone number save hota hai
  const [mobile, setMobile] = useState('')
  
  // 'otp' state me wo number save hota hai jo user OTP box me type karta hai
  const [otp, setOtp] = useState('')
  
  // 'aadhaarFile' driver ka aadhaar card image file save karta hai
  const [aadhaarFile, setAadhaarFile] = useState(null)
  
  // 'licenseFile' driver ka license image file save karta hai
  const [licenseFile, setLicenseFile] = useState(null)

  // Jab user logout karega, toh yeh function chalega aur saara purana data mita dega
  const handleLogout = () => {
    setView('role'); // Wapas pehle page par aa jao
    setRole(''); // Role mita do
    setName(''); // Naam mita do
    setMobile(''); // Mobile mita do
    setOtp(''); // OTP mita do
    setAadhaarFile(null); // File mita do
    setLicenseFile(null); // File mita do
  }

  // BAHOT SIMPLE IF-ELSE LOGIC PAGE DIKHANE KE LIYE (Conditional Rendering)

  // Agar 'view' ki value 'role' hai, toh pehla page (RoleSelection) screen par dikhao
  if (view === 'role') {
    // setRole aur setView pass kar rahe hain taaki us page se data change ho sake
    return <RoleSelection setRole={setRole} setView={setView} />
  }
  
  // Agar 'view' ki value 'signup' hai, toh dusra page (Signup) dikhao
  if (view === 'signup') {
    return (
      <Signup 
        role={role} // Kis type ka user hai
        name={name} // Kya naam hai
        setName={setName} // Naam badalne ka function
        mobile={mobile} // Kya mobile hai
        setMobile={setMobile} // Mobile badalne ka function
        setView={setView} // Agle page par jaane ka function
        setRole={setRole} // Wapas jaane par role change karne ka function
      />
    )
  }

  // Agar 'view' ki value 'otp' hai, toh teesra page (OtpVerification) dikhao
  if (view === 'otp') {
    return (
      <OtpVerification 
        role={role}
        mobile={mobile} // OTP page me phone number dikhane ke liye bheja
        otp={otp} // User ka daala hua OTP
        setOtp={setOtp} // OTP box me type karne par save karne ka function
        setView={setView} // Agle page par jaane ke liye
      />
    )
  }

  // Agar 'view' ki value 'documents' hai, toh chautha page (DocumentUpload) dikhao (Sirf Driver ke liye)
  if (view === 'documents') {
    return (
      <DocumentUpload 
        aadhaarFile={aadhaarFile} 
        setAadhaarFile={setAadhaarFile} // File 1 save karne ka function
        licenseFile={licenseFile} 
        setLicenseFile={setLicenseFile} // File 2 save karne ka function
        setView={setView} // Dashboard pe aage jaane ke liye
      />
    )
  }

  // Agar sab complete ho gaya aur 'view' 'dashboard' hai, toh final page dikhao
  if (view === 'dashboard') {
    return (
      <Dashboard 
        role={role} // Batana padega dashboard ko ki driver hai ya passenger
        name={name} // Welcome karne ke liye naam bheja
        handleLogout={handleLogout} // Logout ka button dabne par clear karne wala function bheja
      />
    )
  }

  // Agar galti se 'view' me kuch aur galat aa jaye toh Loading likha aayega
  return <div>Loading...</div>
}

// index.html me ek khali <div> hai jiska id "root" hai, usko yahan pakda gaya hai
const rootElement = document.getElementById('root');

// React ka engine banaya aur us "root" <div> ko engine me daal diya
const root = ReactDOM.createRoot(rootElement);

// App function (jo humne upar banaya) ko screen par chaap (render) diya
root.render(<App />);