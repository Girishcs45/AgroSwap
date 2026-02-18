import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {Users} from '../Data/Users';

import {
  ShieldCheck,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Gavel,
  MapPin,
} from "lucide-react";
import {
  Tabs,
  Tab,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const LoginPage = () => {
    const navigate = useNavigate();
    const [emailOrMobile, setEmailOrMobile] = useState("");
const [password, setPassword] = useState("");


  const [role, setRole] = useState(0); // 0: Renter, 1: Lister
  const [showPass, setShowPass] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const glassStyle =
    "bg-white/40 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-[32px]";

  const handleLogin = (e) => {
  e.preventDefault();

  if (!emailOrMobile || !password) {
    alert("Please enter mobile/email and password");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    const user = Users.find(
      (u) =>
        u.role === (role === 0 ? "renter" : "lister") &&
        (u.email === emailOrMobile || u.mobile === emailOrMobile) &&
        u.password === password
    );

    if (!user) {
      setLoading(false);
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("agroUser", JSON.stringify(user));
    setLoading(false);
    navigate(user.role === "renter" ? "/renter" : "/lister");
  }, 1500);
};



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
              <span className="text-3xl font-black text-slate-800 tracking-tight">
                AgroSwap
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-800 leading-tight">
              Welcome Back to <br />
              <span className="text-green-600 underline decoration-sky-400">
                AgroSwap
              </span>
            </h1>
            <p className="text-lg text-slate-600 mt-4 font-medium">
              Rent and earn with trusted farmers near you.
            </p>
          </div>

          <div className="space-y-6">
            <TrustPoint
              icon={<Lock className="text-indigo-600" />}
              title="Secure Payments"
              desc="Escrow Protected Transactions"
            />
            <TrustPoint
              icon={<ShieldCheck className="text-emerald-600" />}
              title="Verified Farmers"
              desc="100% KYC Verified Community"
            />
            <TrustPoint
              icon={<MapPin className="text-sky-600" />}
              title="Local Availability"
              desc="Tools available within 20km radius"
            />
          </div>

          <div className="pt-8 opacity-40">
            {/* Placeholder for tractor/drone illustration */}
            <div className="w-64 h-40 bg-slate-300 rounded-3xl animate-pulse flex items-center justify-center text-xs text-slate-500 font-bold">
              [ Rural-Tech Illustration ]
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: LOGIN CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${glassStyle} p-8 md:p-12 w-full max-w-md mx-auto`}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">
              Login to Your Account
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Access your bookings, tools, and payments
            </p>
          </div>

          {/* Role Selector */}
          <div className="bg-white/60 p-2 rounded-2xl shadow-inner mb-8">
  <Tabs
    value={role}
    onChange={(e, v) => setRole(v)}
    variant="fullWidth"
    TabIndicatorProps={{ style: { display: "none" } }}
    sx={{
      "& .MuiTab-root": {
        fontWeight: 900,
        borderRadius: "14px",
        minHeight: "44px",
        textTransform: "none",
        transition: "0.3s",
        color: "#475569",
      },
    }}
  >
    <Tab
      label="🌱 Renter"
      sx={{
        bgcolor: role === 0 ? '#14da5cff' : 'transparent',
        color: role === 0 ? 'white !important' : '#475569',
        boxShadow: role === 0 ? '0 8px 20px rgba(85, 216, 133, 0.35)' : 'none',
        '&:hover': { bgcolor: role === 0 ? '#1dad51ff' : '#e5fbe9' }
        ,
      }}
    />
    <Tab
      label="🚜 Lister"
      sx={{
       bgcolor: role === 1 ? '#0ea5e9' : 'transparent',
        color: role === 1 ? 'white !important' : '#475569',
        boxShadow: role === 1 ? '0 8px 20px rgba(14,165,233,0.35)' : 'none',
        '&:hover': { bgcolor: role === 1 ? '#0284c7' : '#e0f2fe' 
        },
      }}
    />
  </Tabs>
</div>


          <form className="space-y-5" onSubmit={handleLogin}>
            <AnimatePresence mode="wait">
              {!isOTP ? (
                <motion.div
                  key="password-login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                 <TextField
  fullWidth
  label="Mobile Number / Email"
  value={emailOrMobile}
  onChange={(e) => setEmailOrMobile(e.target.value)}
  variant="outlined"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "rgba(255,255,255,0.5)",
    },
  }}
/>

                  <ul></ul>
                  <TextField
  fullWidth
  label="Password"
  type={showPass ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "rgba(255,255,255,0.5)",
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPass(!showPass)}>
          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>

                </motion.div>
              ) : (
                <motion.div
                  key="otp-login"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <TextField
                    fullWidth
                    label="Enter 6-digit OTP"
                    placeholder="● ● ● ● ● ●"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                        backgroundColor: "rgba(255,255,255,0.5)",
                      },
                    }}
                    inputProps={{
                      className: "text-center tracking-[1em] font-black",
                    }}
                  />
                  <div className="text-right">
                    <button className="text-xs font-bold text-emerald-600">
                      Resend OTP in 00:45
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center">
              <FormControlLabel
                control={<Checkbox size="small" color="success" />}
                label={
                  <span className="text-xs font-bold text-slate-500">
                    Remember me
                  </span>
                }
              />
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-xs text-emerald-600 font-bold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                className={`py-4 rounded-2xl font-black text-lg transition-all shadow-lg ${loading ? "bg-slate-400" : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200"}`}
                disabled={loading}
                sx={{
                  borderRadius: "16px",
                  textTransform: "none",
                  py: 1.5,
                  fontWeight: 900,
                }}
              >
                {loading ? "Verifying..." : "Login & Continue"}
              </Button>
            </motion.div>
          </form>

          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-xs font-black text-slate-400 uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => setIsOTP(!isOTP)}
            className="py-3 rounded-2xl border-slate-200 text-slate-600 font-bold normal-case hover:bg-white/50"
            startIcon={<Smartphone size={18} />}
            sx={{
              borderRadius: "16px",
              textTransform: "none",
              color: "#475569",
              borderColor: "#e2e8f0",
            }}
          >
            {isOTP ? "Login with Password" : "Login with OTP"}
          </Button>

          <div className="mt-8 text-center text-sm font-bold text-slate-500">
            New to AgroSwap?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-emerald-600 ml-1 hover:underline"
            >
              Create an Account
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Lock size={10} /> 256-bit Encrypted Login
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const TrustPoint = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-white/60 rounded-2xl shadow-sm border border-white/50">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

export default LoginPage;
