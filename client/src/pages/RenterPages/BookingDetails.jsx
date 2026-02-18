import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { 
  MapPin, Calendar, Clock, IndianRupee, Phone, 
  MessageSquare, ShieldCheck, ChevronLeft, Download, 
  AlertTriangle, Navigation, RotateCcw, PlusCircle,
  Tractor, Star, User, Timer
} from 'lucide-react';
import { 
  Chip, Avatar, Button, Stepper, Step, 
  StepLabel, LinearProgress, IconButton, Tooltip 
} from '@mui/material';

// --- Reusable Glass Component ---
const GlassCard = ({ children, className, noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={noHover ? {} : { y: -5, transition: { duration: 0.2 } }}
    className={`backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2.5rem] shadow-xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);



const STEPS = ['Booked', 'In Use', 'Returning', 'Completed'];

export default function BookingDetails() {
  
  const { id } = useParams();

// load all bookings
const user = JSON.parse(localStorage.getItem("agroUser"));
const users = JSON.parse(localStorage.getItem("agroUsers")) || [];
const bookings = JSON.parse(localStorage.getItem("agroBookings")) || [];
const tools = JSON.parse(localStorage.getItem("agroTools")) || [];


const myBookings = bookings
  .filter(b => b.renterId === user.id)
  .map(b => {
    const tool = tools.find(t => t.id === b.toolId);
    const owner = users.find(u => u.id === tool?.ownerId);

    return {
      ...b,
      tool: {
        ...tool,
        owner
      }
    };
  });

// find booking by id
const booking = myBookings.find(
  b => String(b.id) === String(id)
);
const owner = booking.tool?.owner;

const stepIndex = {
  Booked: 0,
  'In Use': 1,
  Returning: 2,
  Completed: 3,
};

const activeStep = stepIndex[booking.status] ?? 0;


  const navigate = useNavigate();

  
  if (!booking) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 font-bold">Booking not found</p>
    </div>
  );
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-32 px-4 md:px-10 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP NAV */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-emerald-600 transition-colors mb-6"
        >
          <ChevronLeft size={20} /> Back to My Bookings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: HERO & TRACKING */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. HERO TOOL CARD */}
            <GlassCard className="relative h-[400px] md:h-[450px]" noHover>
              <img src={booking.tool?.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="text-white">
                  <Chip 
                    label={booking.tool?.status} 
                    size="small" 
                    className="bg-emerald-500 text-white font-black text-[10px] uppercase mb-3" 
                  />
                  <h1 className="text-3xl md:text-4xl font-black">{booking.tool?.name}</h1>
                  <p className="flex items-center gap-2 text-white/80 font-medium">
                    <Tractor size={18} /> {booking.tool?.category} • <Star size={18} className="text-amber-400 fill-amber-400" /> {booking.rating}
                  </p>
                </div>
                <div className="text-right text-white">
                  <p className="text-3xl font-black text-emerald-400">₹{booking.tool?.price} 
                    <span className="text-sm font-normal text-white/60">/{booking.tool?.unit}</span></p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">Current Rate</p>
                </div>
              </div>
            </GlassCard>

            {/* 2. BOOKING TIMELINE */}
            <GlassCard className="p-8" noHover>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Timer className="text-emerald-500" /> Rental Progress
                </h3>
                
              </div>
              
              

              <Stepper activeStep={activeStep} alternativeLabel className="glass-stepper">

                {STEPS.map((label) => (
                  <Step key={label}>
                    <StepLabel 
                      StepIconProps={{ sx: { '&.Mui-active': { color: '#10b981' }, '&.Mui-completed': { color: '#10b981' } } }}
                    >
                      <span className="font-bold text-[10px] uppercase tracking-tighter text-slate-500">{label}</span>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </GlassCard>

            {/* 4. LIVE TRACKING UI */}
            <GlassCard className="h-[400px] relative" noHover>
              <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                 {/* Map Placeholder */}
                 <div className="text-center opacity-40">
                    <Navigation size={48} className="mx-auto mb-2 text-emerald-500" />
                    <p className="font-black text-slate-400 uppercase tracking-widest">Live Map View</p>
                 </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <GlassCard className="p-4 bg-white/80 border-none shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500 text-white rounded-2xl"><Navigation size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400">Current Location</p>
                      <p className="text-sm font-bold text-slate-800">{booking.location}</p>
                    </div>
                  </div>
                  <Button variant="contained" className="bg-emerald-600 font-bold rounded-xl normal-case">Track Live</Button>
                </GlassCard>
              </div>
            </GlassCard>
          </div>

          {/* RIGHT COLUMN: SUMMARY & OWNER */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 3. RENTAL SUMMARY */}
            <GlassCard className="p-8" noHover>
              <h3 className="text-xl font-bold text-slate-800 mb-6">Booking Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Calendar size={18} className="text-sky-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Start Date</p>
                      <p className="text-sm font-bold text-slate-700">{booking.start}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start border-b border-white/20 pb-6">
                  <div className="flex gap-3">
                    <Clock size={18} className="text-orange-500" />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">End Date</p>
                      <p className="text-sm font-bold text-slate-700">{booking.end}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Duration</p>
                    <p className="text-sm font-bold text-slate-700">{booking.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Total Cost</p>
                    <p className="text-xl font-black text-slate-900">₹{booking.totalCost}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="text-emerald-600" size={18} />
                      <span className="text-xs font-bold text-slate-700">Payment Status</span>
                   </div>
                   <Chip label={booking.paymentStatus} size="small" className="bg-emerald-500 text-white font-black text-[10px]" />
                </div>
              </div>
            </GlassCard>

            {/* 5. OWNER CONTACT PANEL */}
            <GlassCard className="p-8 text-center" noHover>
              <div className="relative inline-block mb-4">
                <Avatar src={booking.renterImg} sx={{ width: 80, height: 80, border: '4px solid white', mx: 'auto' }} />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                  <ShieldCheck size={14} />
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-800">{  owner?.name }</h4>
              <p className="text-[10px] font-bold text-emerald-600 uppercase mb-6 tracking-widest">Verified AgroSwap Owner</p>
              
              <div className="flex gap-2">
                <Button fullWidth variant="outlined" startIcon={<Phone size={18} />} className="rounded-xl border-slate-200 text-slate-600 font-bold normal-case">Call</Button>
                <Button fullWidth variant="outlined" startIcon={<MessageSquare size={18} />} className="rounded-xl border-slate-200 text-slate-600 font-bold normal-case">Chat</Button>
              </div>
              <Button fullWidth className="mt-4 text-slate-400 font-bold text-xs hover:text-emerald-600">View Owner Profile</Button>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* 6. STICKY ACTIONS BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-center pointer-events-auto">
          <GlassCard className="p-4 md:px-10 flex flex-wrap justify-center md:justify-between items-center gap-6 bg-slate-900/90 text-white border-white/20 shadow-2xl">
            <div className="flex gap-6">
               <button className="flex flex-col items-center gap-1 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-emerald-500 transition-colors"><PlusCircle size={20} /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Extend</span>
               </button>
               <button className="flex flex-col items-center gap-1 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-sky-500 transition-colors"><Download size={20} /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Invoice</span>
               </button>
               <button className="flex flex-col items-center gap-1 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-red-500 transition-colors"><AlertTriangle size={20} /></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter">Report</span>
               </button>
            </div>
            
            <div className="h-10 w-px bg-white/10 hidden md:block" />

            <Button 
              variant="contained" 
              startIcon={<RotateCcw />}
              className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-2xl font-black normal-case shadow-xl"
            >
              Mark as Returned
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}