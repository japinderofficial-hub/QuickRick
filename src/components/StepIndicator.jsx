// React la rahe hain
import React from 'react';

// Yeh function page ke top par progress batane wale gol dabbe banata hai.
// Isko 2 cheezein milti hain: current (abhi kaunse step par hai) aur total (total kitne dibbe banane hain)
export default function StepIndicator({ current, total }) {
  
  // Ek khaali dabbe (array) banaya jisme number store karenge.
  const steps = [];
  
  // Loop chalaya zero(0) se 'total' tak. Jaise agar total 3 hai, toh 0, 1, 2 banega.
  for (let i = 0; i < total; i++) {
    steps.push(i); // Us number ko array me daal diya
  }

  // HTML shuru
  return (
    // Bada dabba jo saare gol gheron ko ek line me rakhega
    <div className="step-indicator">
      
      {/* Array me jitne number hain, un sab ke liye ek 'function' chalega aur HTML print hoga */}
      {steps.map(function(i) {
        
        // CSS class set kar rahe hain. Har dibbe par 'step-dot' jarur laga hoga.
        let className = "step-dot";
        
        // Agar yeh step guzar chuka hai (jaise abhi 2nd step pe hain, aur 'i' 0 hai), toh usko 'done' bana do. (Hara(Green) rang)
        if (i < current) {
          className = className + " done";
        }
        
        // Agar yeh wahi step hai jahan user khada hai, toh use 'active' bana do. (Peela(Yellow) glow)
        if (i === current) {
          className = className + " active";
        }
        
        // Dibbe ke andar number aayega ya right (✓) tick aayega?
        let label = "";
        
        // Agar step purana (guzar gaya) hai toh usme tick (✓) likh do
        if (i < current) {
          label = "✓";
        } else {
          // Warna usme asli number likh do (jaise index 0 hai toh 1 likh do, 1 ko 2 likh do)
          label = i + 1;
        }

        // Final goal HTML ka ek div return karna jo loop karke saare dibbe print kar de
        return (
          // key={i} likhna padta hai taaki react bhul na jaye konsa dibba konsa hai
          <div key={i} className={className}>
            {label} {/* Jo text ya tick upar set kiya wo yahan print hoga */}
          </div>
        );
      })}
    </div>
  )
}
