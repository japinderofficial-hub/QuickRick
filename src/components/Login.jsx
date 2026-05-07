import React, { useState, useRef, useEffect } from 'react';
import { useSim } from '../context/SimContext';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { login } = useSim();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleNext = () => {
    if (step === 1 && phone.length >= 10) {
      setStep(2);
    } else if (step === 2) {
      login(phone);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to focus previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  // Auto-submit if OTP is fully filled
  useEffect(() => {
    if (otp.every(digit => digit !== '') && step === 2) {
      setTimeout(handleNext, 300);
    }
  }, [otp]);

  return (
    <div className="fixed inset-0 z-[3000] bg-white text-black flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {step === 2 && (
            <button onClick={() => setStep(1)} className="mb-10 hover:bg-gray-100 p-2 -ml-2 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
          )}
          
          <div className="mb-12">
            <div className="text-3xl font-bold tracking-tighter mb-8">QuickRick</div>
            <h1 className="text-2xl font-medium mb-3">
              {step === 1 ? "What's your phone number?" : "Enter the code sent to your phone"}
            </h1>
            <p className="text-gray-500">
              {step === 1 
                ? "Login or create an account with your phone number." 
                : `We've sent a 4-digit code to +91 ${phone}`}
            </p>
          </div>

          <div className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition-all">
                  <div className="flex items-center gap-2 font-semibold">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5" />
                    <span>+91</span>
                  </div>
                  <input
                    autoFocus
                    type="tel"
                    placeholder="00000 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent text-lg outline-none"
                    maxLength={10}
                  />
                </div>
                <button
                  onClick={handleNext}
                  disabled={phone.length < 10}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                    phone.length >= 10 ? 'bg-black text-white hover:bg-zinc-800' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex gap-4">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      autoFocus={i === 0}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      className="w-full h-16 bg-gray-100 rounded-lg text-center text-3xl font-bold focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="•"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleNext}
                    disabled={otp.some(digit => digit === '')}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      otp.every(digit => digit !== '') ? 'bg-black text-white hover:bg-zinc-800' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    Verify and login
                  </button>
                  <button className="text-sm font-bold text-gray-500 hover:text-black self-start">
                    Resend code in 00:30
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-16 text-xs text-gray-400 leading-relaxed">
            By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from QuickRick and its affiliates to the number provided.
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
