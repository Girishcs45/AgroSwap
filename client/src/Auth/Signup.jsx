import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Lock, Smartphone, ChevronRight, 
  Eye, EyeOff, Gavel, MapPin, CheckCircle2,
  User, Mail, Key, Home, Tractor, Calendar,
  ArrowRight, Landmark, IndianRupee, MessageSquare,
  BadgeCheck // Added for verified farmers
} from 'lucide-react';
import { 
  Tabs, Tab, TextField, Button, 
  InputAdornment, IconButton, Checkbox, FormControlLabel,
  Stepper, Step, StepLabel, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

// Mock data for dropdowns

const INDIAN_STATES = ['Maharashtra', 'Punjab', 'Uttar Pradesh', 'Rajasthan', 'Karnataka', 'Gujarat']; // Example

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(0); // 0: Renter, 1: Lister
  const [activeStep, setActiveStep] = useState(0); // Stepper control
  const [showPass, setShowPass] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    village: '',
    district: '',
    state: '',
    experience: '',
    agreeToTerms: false,
  });
  const [otpTimer, setOtpTimer] = useState(60); // 60 seconds for OTP
  const [showSuccess, setShowSuccess] = useState(false);

  const glassStyle = "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[32px]";

  const handleChange = (e) => {
  const { name, value, checked, type } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};



  const handleNext = () => {
    // Basic validation before moving to next step
    if (activeStep === 0) {
      if (!formData.fullName || !formData.mobile || !formData.password || formData.password !== formData.confirmPassword) {
        alert("Please fill all required fields and ensure passwords match.");
        return;
      }
      // Simulate sending OTP
      console.log("Sending OTP to:", formData.mobile);
      startOtpTimer();
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const startOtpTimer = () => {
    setOtpTimer(60);
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (activeStep === 2) {
    if (!formData.village || !formData.district || !formData.state || !formData.agreeToTerms) {
      alert("Please fill all required profile info and agree to terms.");
      return;
    }
    if (role === 1 && !formData.experience) {
      alert("Please fill all required Lister info.");
      return;
    }

    // Get existing users or empty array
    const existingUsers = JSON.parse(localStorage.getItem("agroUsers")) || [];

    const newUser = {
      id: existingUsers.length + 1,
      name: formData.fullName,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,
      role: role === 0 ? "renter" : "lister",
      location: `${formData.village}, ${formData.district}, ${formData.state}`,
      kycStatus: "pending",
      rating: 0,
      experience: role === 1 ? formData.experience : null,
      joinedAt: new Date().toISOString()
    };

    // Save all users
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("agroUsers", JSON.stringify(updatedUsers));

    // Auto login this user
    localStorage.setItem("agroUser", JSON.stringify(newUser));

    setShowSuccess(true);
  }
};
const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfilePhoto(reader.result); // base64 string
  };
  reader.readAsDataURL(file);
};


  const stepperLabels = ["Account", "Verify", "Profile"];
  const isRoleLocked = activeStep > 0;


  if (showSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-100 flex items-center justify-center p-6 text-center"
      >
        <div className="max-w-md">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
            className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Welcome to AgroSwap, {formData.fullName.split(' ')[0]}!</h1>
          <p className="text-slate-600 mb-8 font-medium">Your account has been successfully created. Grow with us!</p>
          
          <div className="grid grid-cols-1 gap-3">
            <Button
  variant="contained"
  className="bg-emerald-600 py-3 rounded-xl font-bold shadow-none"
  onClick={() => {
    if (role === 0) {
      navigate("/renter");
    } else {
      navigate("/lister");
    }
  }}
>
  Go to Dashboard
</Button>

          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-100 flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
      
      {/* Background Decor Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* --- LEFT SIDE: BRANDING & TRUST --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-8 p-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <Gavel className="text-white" size={28} />
              </div>
              <span className="text-3xl font-black text-slate-800 tracking-tight">AgroSwap</span>
            </div>
            <h1 className="text-5xl font-black text-slate-800 leading-tight">
              Join India’s Trusted <br/>
              <span className="text-green-600 underline decoration-sky-400">Farm Equipment Network</span>
            </h1>
            <p className="text-lg text-slate-600 mt-4 font-medium">
              Rent tools, earn from idle machines, and grow together.
            </p>
          </div>

          <div className="space-y-6">
            <TrustPoint icon={<Lock className="text-indigo-600"/>} title="Secure Payments" desc="Escrow Protected Transactions" />
            <TrustPoint icon={<BadgeCheck className="text-emerald-600"/>} title="Verified Farmers" desc="KYC & Aadhaar Ready Community" />
            <TrustPoint icon={<MapPin className="text-sky-600"/>} title="Local Rentals" desc="Equipment available nearby" />
          </div>

          <div className="pt-8 opacity-40">
             {/* Placeholder for tractor/drone illustration */}
            <div className="w-64 h-40 bg-slate-300 rounded-3xl animate-pulse flex items-center justify-center text-xs text-slate-500 font-bold">
                [ Rural-Tech Illustration ]
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: SIGNUP CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`${glassStyle} p-8 md:p-12 w-full max-w-md mx-auto`}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">Create Your AgroSwap Account</h2>
            <p className="text-sm text-slate-500 font-medium">Get started in just a few steps</p>
          </div>

          {/* Stepper */}
          <div className="mb-8">
            <Stepper activeStep={activeStep} alternativeLabel sx={{ '& .MuiStepIcon-root.Mui-active': { color: '#10b981' }, '& .MuiStepIcon-root.Mui-completed': { color: '#10b981' } }}>
              {stepperLabels.map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>
          </div>

          {/* Role Selector */}
          <div className="bg-white/60 p-2 rounded-2xl shadow-inner mb-8">
  <Tabs
    value={role}
    onChange={(e, v) => !isRoleLocked && setRole(v)}
    variant="fullWidth"
    TabIndicatorProps={{ style: { display: "none" } }}
    sx={{
      '& .MuiTab-root': {
        fontWeight: 900,
        borderRadius: '14px',
        minHeight: '44px',
        transition: '0.3s',
        color: '#475569',
        textTransform: 'none',
      }
    }}
  >
    <Tab
      label="🌱 Renter"
      disabled={isRoleLocked && role !== 0}
      sx={{
        bgcolor: role === 0 ? '#14da5cff' : 'transparent',
        color: role === 0 ? 'white !important' : '#475569',
        boxShadow: role === 0 ? '0 8px 20px rgba(85, 216, 133, 0.35)' : 'none',
        '&:hover': { bgcolor: role === 0 ? '#1dad51ff' : '#e5fbe9' }
      }}
    />
    <Tab
      label="🚜 Lister"
      disabled={isRoleLocked && role !== 1}
      sx={{
        bgcolor: role === 1 ? '#0ea5e9' : 'transparent',
        color: role === 1 ? 'white !important' : '#475569',
        boxShadow: role === 1 ? '0 8px 20px rgba(14,165,233,0.35)' : 'none',
        '&:hover': { bgcolor: role === 1 ? '#0284c7' : '#e0f2fe' }
      }}
    />
  </Tabs>
</div>


          {/* Role Description */}
          <motion.p 
            key={role}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm text-slate-500 mb-6"
          >
            {role === 0 
              ? "Access a wide range of tools for your farm needs." 
              : "List your idle equipment and earn extra income."}
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Details */}
              {activeStep === 0 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col items-center gap-3">
  <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-emerald-400">
    {profilePhoto ? (
      <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
    ) : (
      <User size={40} className="text-slate-400 m-auto mt-6" />
    )}
  </div>

  <label className="text-xs font-bold text-emerald-600 cursor-pointer">
    Upload Profile Photo
    <input
      type="file"
      accept="image/*"
      hidden
      onChange={handlePhotoUpload}
    />
  </label>
</div>

                  <TextField 
                    fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start"><User size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                    
                  />
                  <ul></ul>
                
                  <TextField 
                    fullWidth label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Smartphone size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <TextField 
                    fullWidth label="Email (Optional)" name="email" value={formData.email} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <TextField 
                    fullWidth label="Password" name="password" value={formData.password} onChange={handleChange}
                    type={showPass ? 'text' : 'password'}
                    InputProps={{ 
                      startAdornment: <InputAdornment position="start"><Key size={20}/></InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={20}/> : <Eye size={20}/>}</IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <TextField 
                    fullWidth label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    type={showPass ? 'text' : 'password'}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Key size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth variant="contained" 
                      onClick={handleNext}
                      className="py-3 rounded-2xl font-black text-lg transition-all shadow-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                      sx={{ borderRadius: '16px', textTransform: 'none', fontWeight: 900 }}
                    >
                      Continue <ArrowRight size={20} className="ml-2"/>
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: OTP Verification */}
              {activeStep === 1 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4 text-center"
                >
                  <p className="text-slate-600 font-medium">Enter 6-digit OTP sent to {formData.mobile}</p>
                  <TextField 
                    fullWidth label="OTP" name="otp" value={formData.otp} onChange={handleChange}
                    inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: '1em', fontWeight: 'bold' } }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <div className="text-sm font-bold text-emerald-600">
                    {otpTimer > 0 ? `Resend OTP in 00:${otpTimer < 10 ? '0' : ''}${otpTimer}` : <button onClick={startOtpTimer}>Resend OTP</button>}
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth variant="contained" 
                      onClick={handleNext}
                      className="py-3 rounded-2xl font-black text-lg transition-all shadow-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                      sx={{ borderRadius: '16px', textTransform: 'none', fontWeight: 900 }}
                    >
                      Verify & Continue <ArrowRight size={20} className="ml-2"/>
                    </Button>
                  </motion.div>
                  <Button onClick={handleBack} className="text-slate-500 font-bold mt-2">Back</Button>
                </motion.div>
              )}

              {/* Step 3: Profile Info */}
              {activeStep === 2 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <TextField 
                    fullWidth label="Village / City" name="village" value={formData.village} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Home size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <TextField 
                    fullWidth label="District" name="district" value={formData.district} onChange={handleChange}
                    InputProps={{ startAdornment: <InputAdornment position="start"><Landmark size={20}/></InputAdornment> }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                  />
                  <ul></ul>
                  <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}>
                    <InputLabel id="state-select-label">State</InputLabel>
                    <Select
                      labelId="state-select-label"
                      id="state-select"
                      value={formData.state}
                      label="State"
                      onChange={handleChange}
                      name="state"
                      startAdornment={<InputAdornment position="start"><MapPin size={20}/></InputAdornment>}
                    >
                      {INDIAN_STATES.map((state) => (
                        <MenuItem key={state} value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {role === 1 && ( // Lister specific fields
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <ul></ul>
                         
                        <TextField 
                            fullWidth label="Years of Experience" name="experience" value={formData.experience} onChange={handleChange}
                            type="number"
                            InputProps={{ startAdornment: <InputAdornment position="start"><Calendar size={20}/></InputAdornment> }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}}
                        />
                      </motion.div>
                    </AnimatePresence>
                  )}

                  <FormControlLabel 
                    control={<Checkbox size="small" color="success" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} />} 
                    label={<span className="text-xs font-bold text-slate-500">I agree to AgroSwap's <a href="#" className="text-emerald-600 hover:underline">Terms & Privacy Policy</a></span>} 
                  />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      fullWidth variant="contained" type="submit"
                      className="py-3 rounded-2xl font-black text-lg transition-all shadow-lg bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"
                      sx={{ borderRadius: '16px', textTransform: 'none', fontWeight: 900 }}
                    >
                      Create Account <CheckCircle2 size={20} className="ml-2"/>
                    </Button>
                  </motion.div>
                  <Button onClick={handleBack} className="text-slate-500 font-bold mt-2">Back</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-8 text-center text-sm font-bold text-slate-500">
            Already have an account? <a href="/login" className="text-emerald-600 ml-1 hover:underline">Login here</a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Lock size={10}/> Aadhaar & KYC secured • 256-bit Encrypted
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const TrustPoint = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-white/60 rounded-2xl shadow-sm border border-white/50">{icon}</div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

export default Signup;
