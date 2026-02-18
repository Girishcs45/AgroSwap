import React, { useState,useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from "react-router-dom";


import { 
  Phone, Chat, LocationOn, Verified, EventAvailable, 
  Receipt, Warning, Payment, Security, Info
} from '@mui/icons-material';
import { Button, Stepper, Step, StepLabel, Avatar, Tooltip } from '@mui/material';



const Action = () => {
    

const STATUS_STEP_MAP = {
  Requested: 0,
  Upcoming: 0,
  Active: 1,
  Returning: 2,
  Completed: 3,
};

const { id } = useParams();

const booking = useMemo(() => {
  const bookings =
    JSON.parse(localStorage.getItem("agroBookings")) || [];
  const tools =
    JSON.parse(localStorage.getItem("agroTools")) || [];
  const users =
    JSON.parse(localStorage.getItem("agroUsers")) || [];

  const b = bookings.find(b => b.id === Number(id));
  if (!b) return null;

  const tool = tools.find(t => t.id === b.toolId);
  const renter = users.find(u => u.id === b.renterId);

  return { ...b, tool, renter };
}, [id]);
if (!booking) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
      Booking not found or still loading
    </div>
  );
}

const currentStep = STATUS_STEP_MAP[booking.status] ?? 0;


      
  

  const glassStyle = "bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-6";

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: OVERVIEW & RENTER --- */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* 1. Booking Overview Card */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={glassStyle}>
            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
              <img src={booking.tool?.img} alt="Tractor" className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                Active
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{booking.tool?.name}</h2>
            <p className="text-slate-500 mb-4 font-medium uppercase tracking-wider text-xs">Category: {booking.tool?.category}</p>
            
            <div className="flex justify-between items-center py-4 border-t border-white/40">
              <div>
                <p className="text-xs text-slate-500 uppercase">{booking.tool?.price}</p>
                <p className="text-xl font-extrabold text-emerald-700">₹{booking.totalCost}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase">{booking.status}</p>
                <p className="text-sm font-bold text-sky-600 flex items-center gap-1">
                  <Security fontSize="inherit" /> Escrow Locked
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. Renter Details Panel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className={glassStyle}>
            <div className="flex items-center gap-4 mb-6">
             <Avatar>
  {booking.renter?.name?.[0] ?? "U"}
</Avatar>
<div>
<h3 className="font-bold text-lg flex items-center gap-1">
  {booking.renter?.name ?? "Renter"}
  <Verified className="text-sky-500" fontSize="small" />
</h3>

                <p className="text-sm text-slate-500 italic">{booking.tool?.rating} (24 Bookings)</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-6">
              <Button fullWidth variant="contained" className="bg-emerald-600 rounded-xl py-3"><Phone className="mr-2"/> Call</Button>
              <Button fullWidth variant="outlined" className="border-emerald-600 text-emerald-600 rounded-xl"><Chat className="mr-2"/> Chat</Button>
            </div>

            <div className="h-32 bg-slate-200 rounded-2xl overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic text-sm">
                 [Interactive Mini-Map]
               </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: ACTIONS & STATUS --- */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* 3. Live Status Timeline */}
          <div className={`${glassStyle} overflow-x-auto`}>
            <Stepper activeStep={currentStep} alternativeLabel>
  {['Requested', 'Active', 'Returning', 'Completed'].map(label => (
  <Step key={label}>
    <StepLabel>{label}</StepLabel>
  </Step>
))}

</Stepper>

          </div>

          {/* 4. Action Controls (Main Section) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

  {/* Requested → Approve / Reject */}
  {booking.status === "Requested" && (
  <>
    <ActionButton label="Approve" color="bg-emerald-500" />
    <ActionButton label="Reject" color="bg-rose-500" />
  </>
)}

{booking.status === "Active" && (
  <ActionButton label="Mark Returning" color="bg-sky-500" />
)}

{booking.status === "Returning" && (
  <ActionButton label="Complete Booking" color="bg-emerald-600" />
)}

{booking.status === "Completed" && (
  <p className="text-green-600 font-bold">Booking Completed ✔</p>
)}


</div>

          {/* 5. Slot & 6. Payment (Dual Row) */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className={glassStyle}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><EventAvailable className="text-emerald-600"/> Slot Manager</h3>
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 mb-2">
                <p className="text-sm font-bold text-emerald-800">{booking.start} – {booking.end}</p>
                <p className="text-xs text-emerald-600">No overlapping conflicts</p>
              </div>
              <Button fullWidth className="text-xs font-bold text-slate-500">Block Future Slots</Button>
            </div>

            <div className={glassStyle}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Payment className="text-sky-600"/> Security & Insurance</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Security Deposit</span>
                <span className="font-bold">₹5000.00</span>
              </div>
              <div className="flex items-center gap-2 bg-sky-100 text-sky-700 p-2 rounded-lg text-xs font-bold">
                <Security fontSize="small" /> Fully Insured by AgroProtect™
              </div>
            </div>
          </div>

         
          </div>
        </div>
      </div>
    
  );
};

const ActionButton = ({ icon, label, color }) => (
  <motion.button 
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`${color} text-white p-6 rounded-3xl flex flex-col items-center gap-2 shadow-xl border border-white/20`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </motion.button>
);

const LogItem = ({ time, text }) => (
  <div className="flex gap-4 items-start">
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
    <div>
      <p className="text-sm text-slate-800 font-medium">{text}</p>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
  </div>
);

export default Action;