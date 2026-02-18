import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, Smartphone, ChevronRight, 
  Eye, EyeOff, Gavel, CheckCircle2, ArrowLeft,
  KeyRound, RefreshCcw, ShieldAlert
} from 'lucide-react';
import { 
  Tabs, Tab, TextField, Button, 
  InputAdornment, IconButton, Stepper, Step, StepLabel 
} from '@mui/material';

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0); // 0: Identify, 1: Verify, 2: Reset
  const [role, setRole] = useState(0); // 0: Renter, 1: Lister
  const [showPass, setShowPass] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState('');

  // OTP Timer Logic
  useEffect(() => {
    let timer;
    if (activeStep === 1 && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeStep, otpTimer]);

  const glassStyle = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[32px]";
  
  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleResend = () => setOtpTimer(60);

  // Simple Password Strength Logic
  const getStrength = () => {
    if (password.length === 0) return { label: '', color: 'bg-slate-200', width: '0%' };
    if (password.length < 6) return { label: 'Weak', color: 'bg-rose-500', width: '33%' };
    if (password.length < 10) return { label: 'Medium', color: 'bg-amber-500', width: '66%' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
  };

  if (isSuccess) return <SuccessScreen />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-100 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT SIDE: BRANDING & TRUST --- */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:flex flex-col space-y-8 p-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg"><Gavel className="text-white" size={24} /></div>
              <span className="text-2xl font-black text-slate-800">AgroSwap</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 leading-tight">Secure Account Recovery</h1>
            <p className="text-slate-600 mt-2 font-medium">Verify your identity to regain access to your tools and bookings.</p>
          </div>

          <div className="space-y-6">
            <TrustItem icon={<ShieldCheck size={20} className="text-emerald-600"/>} text="Secure OTP Verification" />
            <TrustItem icon={<Smartphone size={20} className="text-sky-600"/>} text="Aadhaar / Mobile Verified" />
            <TrustItem icon={<Lock size={20} className="text-indigo-600"/>} text="256-bit Encrypted" />
          </div>

          <div className="bg-white/30 p-6 rounded-3xl border border-white/50 backdrop-blur-sm max-w-sm">
             <p className="text-xs text-slate-500 italic">"Do not share your OTP with anyone. AgroSwap team will never call you to ask for your password or OTP."</p>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: RESET CARD --- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className={`${glassStyle} p-8 md:p-10 w-full max-w-md mx-auto relative`}>
          
          <button className="absolute top-8 left-8 text-slate-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={20} />
          </button>

          <div className="mb-10 mt-4">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepIcon-root.Mui-active': { color: '#10b981' }, '& .MuiStepIcon-root.Mui-completed': { color: '#10b981' } }}>
              {['Identify', 'Verify', 'Reset'].map((label) => (
                <Step key={label}><StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '10px', fontWeight: 'bold' }}}>{label}</StepLabel></Step>
              ))}
            </Stepper>
          </div>

          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-800">Forgot Password?</h2>
                  <p className="text-sm text-slate-500">Enter your registered mobile or email</p>
                </div>

                <div className="bg-slate-200/50 p-1 rounded-2xl">
                  <Tabs value={role} onChange={(e, v) => setRole(v)} variant="fullWidth" TabIndicatorProps={{ className: "bg-emerald-600 h-full rounded-xl z-0" }}>
                    <Tab label="Renter" className="z-10 font-bold" sx={{ '&.Mui-selected': { color: 'white' } }} />
                    <Tab label="Lister" className="z-10 font-bold" sx={{ '&.Mui-selected': { color: 'white' } }} />
                  </Tabs>
                </div>

                <TextField fullWidth placeholder="Mobile Number or Email" InputProps={{ className: "rounded-2xl bg-white/50", startAdornment: <InputAdornment position="start"><Smartphone size={18} /></InputAdornment> }} />
                
                <Button fullWidth onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black shadow-lg shadow-emerald-200">
                  Send OTP <ChevronRight size={20} className="ml-1" />
                </Button>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={32} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800">Verify OTP</h2>
                  <p className="text-sm text-slate-500">Sent to +91 ******9821</p>
                </div>

                <div className="flex justify-between gap-2">
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <input key={i} type="text" maxLength="1" className="w-12 h-14 bg-white/50 border-2 border-slate-200 rounded-xl text-center font-black text-xl focus:border-emerald-500 focus:outline-none transition-all shadow-inner" />
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : <button onClick={handleResend} className="text-emerald-600 flex items-center gap-1 mx-auto"><RefreshCcw size={14}/> Resend Now</button>}
                  </p>
                </div>

                <Button fullWidth onClick={handleNext} className="bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg">
                  Verify & Continue
                </Button>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-800">New Password</h2>
                  <p className="text-sm text-slate-500">Create a strong, memorable password</p>
                </div>

                <div className="space-y-4">
                  <TextField 
                    fullWidth label="New Password" type={showPass ? 'text' : 'password'} 
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{ 
                      className: "rounded-2xl bg-white/50", 
                      startAdornment: <InputAdornment position="start"><KeyRound size={18} /></InputAdornment>,
                      endAdornment: <IconButton onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</IconButton>
                    }} 
                  />
                  
                  {/* Strength Meter */}
                  <div className="px-1">
                    <div className="flex justify-between text-[10px] font-black uppercase mb-1">
                      <span className="text-slate-400">Strength</span>
                      <span className={getStrength().color.replace('bg-', 'text-')}>{getStrength().label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div animate={{ width: getStrength().width }} className={`h-full ${getStrength().color}`} />
                    </div>
                  </div>

                  <TextField fullWidth label="Confirm Password" type="password" InputProps={{ className: "rounded-2xl bg-white/50", startAdornment: <InputAdornment position="start"><CheckCircle2 size={18} /></InputAdornment> }} />
                </div>

                <Button fullWidth onClick={() => setIsSuccess(true)} className="bg-emerald-600 text-white py-4 rounded-2xl font-black shadow-lg">
                  Update Password & Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <ShieldAlert size={10}/> Encrypted Communication
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SuccessScreen = () => (
  <div className="min-h-screen w-full bg-white flex items-center justify-center p-6 text-center">
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={48} strokeWidth={3} />
      </div>
      <h1 className="text-3xl font-black text-slate-800 mb-2">Password Updated!</h1>
      <p className="text-slate-500 mb-8 max-w-xs mx-auto">You can now login to AgroSwap with your new password.</p>
      <div className="flex flex-col gap-3">
        <Button variant="contained" className="bg-emerald-600 py-3 rounded-xl font-bold px-12">Go to Login</Button>
        <Button variant="text" className="text-slate-400 font-bold">Back to Home</Button>
      </div>
    </motion.div>
  </div>
);

const TrustItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 font-bold text-slate-700 text-sm">
    <div className="p-2 bg-white/60 rounded-lg shadow-sm">{icon}</div>
    {text}
  </div>
);

export default ForgotPassword;