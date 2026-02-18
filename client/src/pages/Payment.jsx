import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


import { 
  ShieldCheck, Lock,  Info, Clock, 
  CreditCard, Smartphone, Landmark, Wallet, 
   Check, MapPin, Calendar, Timer
} from 'lucide-react';
import { Button, Tooltip, Stepper, Step, StepLabel, Divider } from '@mui/material';

const PaymentPage = () =>     {
    const navigate = useNavigate();
  const [payStatus, setPayStatus] = useState('idle'); // idle, processing, success
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
 

  const { state } = useLocation();
const { id } = useParams();

if (!state) {
  return <div className="min-h-screen flex items-center justify-center">No booking data found</div>;
}

const { tool, fromDate, toDate, fromTime, toTime, acres, bookingType, withInsurance } = state;

let rentAmount = 0;
let durationLabel = "";

if (bookingType === "hour") {
  const start = new Date(`${fromDate}T${fromTime}`);
  const end = new Date(`${fromDate}T${toTime}`);
  const hours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
  rentAmount = hours * tool.price;
  durationLabel = `${hours} hours`;
}

if (bookingType === "day") {
  const days = Math.max(
    1,
    Math.ceil((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24))
  );
  rentAmount = days * tool.price;
  durationLabel = `${days} days`;
}

if (bookingType === "acre") {
  const area = Number(acres || 1);
  rentAmount = area * tool.price;
  durationLabel = `${area} acres`;
}



const platformFee = Math.round(rentAmount * 0.15); // 5%
const insuranceFee = withInsurance ? Math.round(rentAmount * 0.10) : 0; // only if selected
const securityDeposit = 1500;

const totalAmount = rentAmount + platformFee + insuranceFee + securityDeposit;





  // Timer Logic
  useEffect(() => {
    if (timeLeft > 0 && payStatus === 'idle') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, payStatus]);
     


  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const glassStyle = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl";

  const handlePayment = () => {
    setPayStatus('processing');
    setTimeout(() => setPayStatus('success'), 2000);
  };

  if (payStatus === 'success') return <SuccessState />;
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 pt-24 pb-12 px-4 md:px-10">
      
      {/* 9. Stepper Header */}
      <div className="max-w-4xl mx-auto mb-10">
        <Stepper activeStep={2} alternativeLabel sx={{ '& .MuiStepIcon-root.Mui-active': { color: '#10b981' } }}>
          {['Select Tool', 'Choose Slot', 'Payment', 'Confirmed'].map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Booking & Payment Selection */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Header & Trust Badges */}
          <header>
            <h1 className="text-3xl font-black text-slate-800">Secure Payment</h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
              Complete your payment to confirm your booking. Your amount is held safely in escrow.
            </p>
            <div className="flex gap-3 mt-4">
              <Badge icon={<Lock size={14}/>} text="Escrow Protected" color="text-indigo-600 bg-indigo-50" />
              <Badge icon={<ShieldCheck size={14}/>} text="Insurance Covered" color="text-emerald-600 bg-emerald-50" />
            </div>
          </header>

          {/* 5. Payment Method Selector */}
          <div className={`${glassStyle} p-6`}>
            <h3 className="font-bold text-slate-800 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <PaymentOption 
                id="upi" icon={<Smartphone/>} label="UPI" 
                selected={selectedMethod === 'upi'} onClick={setSelectedMethod} 
              />
              <PaymentOption 
                id="card" icon={<CreditCard/>} label="Card" 
                selected={selectedMethod === 'card'} onClick={setSelectedMethod} 
              />
              <PaymentOption 
                id="net" icon={<Landmark/>} label="Banking" 
                selected={selectedMethod === 'net'} onClick={setSelectedMethod} 
              />
              <PaymentOption 
                id="wallet" icon={<Wallet/>} label="Wallet" 
                selected={selectedMethod === 'wallet'} onClick={setSelectedMethod} 
              />
            </div>
          </div>

          {/* 6. Escrow & Safety Explanation */}
          <div className="bg-emerald-900/5 border border-emerald-200 p-6 rounded-3xl flex gap-4">
            <Info className="text-emerald-600 shrink-0" />
            <div className="text-sm text-emerald-800 leading-relaxed">
              <b>AgroSwap Escrow:</b> Owner receives money only when you confirm successful return. 
              In case of dispute, our protection covers damages and refunds.
            </div>
          </div>
        </div>

        {/* RIGHT: Price Breakdown & Preview */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 2 & 4. Preview & Slot Card */}
          <div className={`${glassStyle} p-6 overflow-hidden relative`}>
             <div className="absolute top-0 right-0 p-3 bg-rose-500 text-white text-[10px] font-bold rounded-bl-2xl flex items-center gap-1">
               <Timer size={12}/> {formatTime(timeLeft)}
             </div>
             
             <div className="flex gap-4 mb-6">
               <img src={tool.img}
                    className="w-20 h-20 rounded-2xl object-cover" alt="Tool" />
               <div>
                 <h4 className="font-bold text-slate-800">{tool.name}</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tool.category}</p>
                 <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                   <MapPin size={10}/> {tool.location}
                 </div>
               </div>
             </div>

             <div className="flex gap-2 mb-4">
               <div className="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold border border-white/50 flex items-center gap-1">
                 <Calendar size={12}/> {fromDate} To {toDate}
               </div>
            
                <div className="px-3 py-1 bg-white/60 rounded-full text-[10px] font-bold border border-white/50 flex items-center gap-1">
  <Clock size={12}/> {durationLabel}
</div>

              
             </div>
          </div>

          {/* 3. Price Breakdown Panel */}
          <div className={`${glassStyle} p-6`}>
            <h3 className="font-bold text-slate-800 mb-4">Price Breakdown</h3>
           <PriceRow label={`Rental Charge (${durationLabel})`} value={`₹${rentAmount}`} />
<PriceRow label="Platform Service Fee" value={`₹${platformFee}`} />
<PriceRow label="Insurance Fee" value={`₹${insuranceFee}`} />
<PriceRow label="Security Deposit refunded " value={`₹${securityDeposit}`} isRefundable />


              <Divider className="my-2" />
              <div className="flex justify-between items-center pt-2">
                <span className="font-black text-slate-800 text-lg">Total Amount</span>
                <span className="font-black text-emerald-600 text-2xl">₹{totalAmount}</span>

              </div>
            </div>

            {/* 7. Action Buttons */}
            <div className="mt-8 space-y-3">
             <button 
  onClick={handlePayment}
  disabled={payStatus === 'processing'}
  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
>
  {payStatus === 'processing'
    ? 'Processing...'
    : `Pay ₹${totalAmount} & Confirm Booking`}
</button>

              <button className="w-full text-slate-400 font-bold text-sm py-2 hover:text-rose-500 transition-colors"
              onClick={() => navigate("/tools")}
              >
                Cancel & Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

// --- Sub-Components ---
 
const SuccessState = () => {
    const navigate = useNavigate();

    return(
     
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-6 text-center"
  >
    <div className="max-w-md">
      <motion.div 
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
        className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>
      <h1 className="text-4xl font-black text-slate-800 mb-2">Payment Successful!</h1>
      <p className="text-slate-500 mb-8">🎉 Your booking is confirmed. The owner has been notified.</p>
      
      <div className="bg-slate-50 border rounded-3xl p-6 text-left space-y-3 mb-8">
        <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
          <span>Booking ID: #AGRO-9821</span>
          <span>Verified Tool</span>
        </div>
        <h4 className="font-bold text-slate-800">Mahindra Arjun 555</h4>
        <p className="text-sm text-slate-600">Rental: Sept 12 - Sept 14</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button variant="contained" className="bg-emerald-600 py-3 rounded-xl font-bold shadow-none">Track Tool Live</Button>
        <Button variant="outlined" className="border-slate-200 text-slate-600 py-3 rounded-xl font-bold"
        onClick={() => navigate("/my-bookings")}
        >Go to My Bookings</Button>
      </div>
    </div>
  </motion.div>
    );
};
  
const PaymentOption = ({ id, icon, label, selected, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
      selected ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-md ring-2 ring-emerald-200' : 'border-white/20 bg-white/40 text-slate-400'
    }`}
  >
    {icon}
    <span className="text-[10px] font-black uppercase">{label}</span>
  </button>
);

const PriceRow = ({ label, value, tooltip, isRefundable }) => (
  <div className="flex justify-between items-center text-slate-600">
    <div className="flex items-center gap-1">
      {label}
      {tooltip && (
        <Tooltip title={tooltip} arrow>
          <Info size={12} className="cursor-help text-slate-400" />
        </Tooltip>
      )}
    </div>
    <span className={`font-bold ${isRefundable ? 'text-indigo-600' : 'text-slate-800'}`}>{value}</span>
  </div>
);

const Badge = ({ icon, text, color }) => (
  <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${color}`}>
    {icon} {text}
  </div>
);

export default PaymentPage;