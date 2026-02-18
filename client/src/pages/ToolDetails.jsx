
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, MapPin, ShieldCheck, Zap, Fuel, Settings, 
  UserCheck, MessageSquare, Calendar, Info, 
  Share2, Heart, Scale, ChevronRight, Clock, Truck
} from 'lucide-react';
import { 
  Chip, Avatar, Button, Tabs, Tab, 
  TextField, Switch, Rating, IconButton 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';


// --- Sub-Components ---

const GlassCard = ({ children, className }) => (
  <div className={`backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2.5rem] shadow-xl ${className}`}>
    {children}
  </div>
);

const InfoPill = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-white/30 rounded-2xl border border-white/40">
    <div className="text-emerald-600 bg-white/50 p-2 rounded-xl">{icon}</div>
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{label}</p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default function ToolDetails() {
      const navigate = useNavigate();  
  const [tabValue, setTabValue] = useState(0);
  const { state: tool } = useLocation();
const { id } = useParams();
const [withInsurance, setWithInsurance] = useState(true);

const [bookingType, setBookingType] = useState("day"); // day | hour | acre
const [fromDate, setFromDate] = useState("");
const [toDate, setToDate] = useState("");
const [fromTime, setFromTime] = useState("");
const [toTime, setToTime] = useState("");
const [acres, setAcres] = useState("");

const handleConfirmBooking = () => {
  if (!fromDate) return alert("Select booking date");

  if (bookingType === "day" && !toDate)
    return alert("Select end date");

  if (bookingType === "hour" && (!fromTime || !toTime))
    return alert("Select time slot");

  if (bookingType === "acre" && (!toDate || !acres))
    return alert("Select date range and acres");

  navigate(`/payment/${tool.id}`, {
  state: {
    tool,
    bookingType,
    fromDate,
    toDate,
    fromTime,
    toTime,
    acres,
    withInsurance
  }
});

};


  


if (!tool) return <div>Loading...</div>;


  return (
    <>
    <div><Navbar/></div>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-20 px-4 md:px-10 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 -left-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left: Image Carousel & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-[3rem] overflow-hidden group shadow-2xl h-[400px] md:h-[500px]"
            >
              <img 
  src={tool?.img} 
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
  alt={tool?.name}
/>

              <div className="absolute top-6 left-6 flex gap-2">
                <Chip label="Available Today" className="bg-emerald-500/90 text-white font-bold backdrop-blur-md" />
                <Chip label="Premium Listing" className="bg-amber-500/90 text-white font-bold backdrop-blur-md" />
              </div>
            </motion.div>

            <div className="flex justify-between items-center px-4">
              <div className="flex gap-4">
                <IconButton className="bg-white/60 hover:bg-white text-slate-700 shadow-md"><Heart size={20} /></IconButton>
                <IconButton className="bg-white/60 hover:bg-white text-slate-700 shadow-md"><Share2 size={20} /></IconButton>
                <IconButton className="bg-white/60 hover:bg-white text-slate-700 shadow-md"><Scale size={20} /></IconButton>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <Avatar key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="border-2 border-white" />
                ))}
                <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-700">+42 Reviews</div>
              </div>
            </div>
         

         {/* TOOL LOCATION MAP */}
<GlassCard className="p-6">
  <div className="flex items-center justify-between mb-3">
    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
      <MapPin className="text-emerald-600" size={20} />
      Tool Location
    </h3>

    <a
      href={`https://www.google.com/maps?q=${tool.location.lat},${tool.location.lng}`}
      target="_blank"
      rel="noreferrer"
      className="text-xs font-bold text-emerald-600 hover:underline"
    >
      Open in Maps →
    </a>
  </div>

  <div className="rounded-2xl overflow-hidden border border-white/40 shadow-inner">
    <iframe
      title="tool-location"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${tool.location.lat},${tool.location.lng}&z=14&output=embed`}
      className="w-full h-[260px]"
    />
  </div>

  <p className="mt-3 text-xs font-medium text-slate-500 flex items-center gap-1">
    📍 {tool.location.address}
  </p>
</GlassCard>
 </div>



          {/* Right: Floating Info & Booking Card */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-2 leading-tight">
               {tool?.name}

              </h1>
              <p className="flex items-center gap-2 text-slate-500 font-medium mb-6">
                <MapPin size={18} className="text-emerald-500" /> {tool?.location?.address} <br></br> {tool?.status}
              </p>

              <GlassCard className="p-8 relative overflow-hidden border-emerald-200/60">

  {/* Glow effects */}
  <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-300/30 blur-3xl rounded-full" />
  <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-300/30 blur-2xl rounded-full" />

  <div className="relative z-10 space-y-6">

    {/* Price Header */}
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Starting Price</p>
        <h2 className="text-4xl font-black text-slate-900">
          ₹{tool?.price}
          <span className="text-lg text-slate-500 font-bold"> / {tool?.unit}</span>
        </h2>
      </div>
      <div className="text-right">
        <Rating value={4.8} precision={0.1} readOnly />
        <p className="text-[10px] text-slate-400 font-bold mt-1">Top Rated</p>
      </div>
    </div>

    {/* Booking Type Selector */}
    <div className="flex bg-white/60 p-1 rounded-2xl shadow-inner">
      {["day", "hour", "acre"].map(type => (
        <button
          key={type}
          onClick={() => setBookingType(type)}
          className={`flex-1 py-2 rounded-xl text-sm font-black transition-all ${
            bookingType === type
              ? "bg-green-600 text-white shadow-md"
              : "text-slate-500 hover:bg-white/80"
          }`}
        >
          {type === "day" && "By Day"}
          {type === "hour" && "By Hour"}
          {type === "acre" && "By Acre"}
        </button>
      ))}
    </div>

    {/* Date / Time / Acre Inputs */}
    <div className="grid grid-cols-2 gap-4">
      <TextField
        type="date"
       
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        fullWidth
      />

      {bookingType !== "hour" && (
        <TextField
          type="date"
          
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          fullWidth
        />
      )}

      {bookingType === "hour" && (
        <>
          <TextField
            type="time"
            
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
          />
          <TextField
            type="time"
            
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
          />
        </>
      )}

      {bookingType === "acre" && (
        <TextField
          type="number"
          label="Area (Acres)"
          value={acres}
          onChange={(e) => setAcres(e.target.value)}
          fullWidth
        />
      )}
    </div>

    {/* Insurance Toggle */}
    <div className="flex items-center justify-between p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-emerald-600" size={20} />
        <span className="text-sm font-black text-slate-700">Add Equipment Insurance</span>
      </div>
      <Switch
        color="success"
        checked={withInsurance}
        onChange={(e) => setWithInsurance(e.target.checked)}
      />
    </div>

    {/* CTA Button */}
    <Button
      fullWidth
      variant="contained"
      className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 py-4 rounded-2xl text-lg font-black shadow-2xl shadow-emerald-300/50 transition-all active:scale-95"
      onClick={handleConfirmBooking}
    >
      Confirm Booking
    </Button>

    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
      🔒 Secured by AgroSwap Escrow
    </p>

  </div>
</GlassCard>

            </motion.div>
          </div>
        </div>

        {/* DETAILS TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <GlassCard className="p-2" hover={false}>
              <Tabs 
                value={tabValue} 
                onChange={(e, val) => setTabValue(val)} 
                className="px-4 border-b border-white/20"
                TabIndicatorProps={{ className: "bg-emerald-500 h-1 rounded-full" }}
              >
                <Tab label="Overview" className="font-bold normal-case py-6" />
                <Tab label="Specifications" className="font-bold normal-case py-6" />
                <Tab label="Reviews" className="font-bold normal-case py-6" />
              </Tabs>

              <div className="p-8">
                {tabValue === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <InfoPill icon={<Zap size={18} />} label="Power" value={tool?.hp}/>
                    <InfoPill icon={<Fuel size={18} />} label="Fuel Type" value={tool?.fuelType}/>
                    <InfoPill icon={<Settings size={18} />} label="Drive" value={tool?.drive} />
                    <InfoPill icon={<Clock size={18} />} label="Year" value={tool?.year} />
                    <div className="col-span-full pt-6">
                      <h4 className="font-bold text-slate-800 mb-2">Description</h4>
                      <p className="text-slate-600 leading-relaxed">
                        High-performance tractor ideal for heavy-duty farming tasks including ploughing, tilling, and transportation. Recently serviced and fuel-efficient. Includes multiple hitch points for all standard implements.
                      </p>
                    </div>
                  </motion.div>
                )}
                {tabValue === 1 && (
                  <div className="space-y-4">
                    <div className="flex justify-between p-3 border-b border-white/20">
                      <span className="text-slate-500 font-medium">Engine HP Range</span>
                      <span className="font-bold text-slate-800">{tool?.hp}</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-white/20">
                      <span className="text-slate-500 font-medium">Lifting Capacity</span>
                      <span className="font-bold text-slate-800">1800 kg</span>
                    </div>
                    <div className="flex justify-between p-3 border-b border-white/20">
                      <span className="text-slate-500 font-medium">Clutch Type</span>
                      <span className="font-bold text-slate-800">Dual Clutch</span>
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Owner Info Sidebar */}
          <div className="lg:col-span-4">
            <GlassCard className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar 
                  src="https://i.pravatar.cc/150?u=farmer_subhash" 
                  sx={{ width: 80, height: 80, border: '4px solid white' }} 
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                  <UserCheck size={14} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{tool?.ownerName}</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase mb-6">Verified Owner • Since 2021</p>
              
              <div className="flex gap-2 w-full">
                <Button fullWidth variant="outlined" startIcon={<MessageSquare size={18} />} className="rounded-xl border-slate-200 text-slate-600 font-bold normal-case">Chat</Button>
                <Button fullWidth variant="outlined" startIcon={<Clock size={18} />} className="rounded-xl border-slate-200 text-slate-600 font-bold normal-case">History</Button>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* TRUST STRIP */}
        <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <UserCheck />, title: "KYC Verified", sub: "Trusted Farmers" },
            { icon: <ShieldCheck />, title: "Secure Pay", sub: "Escrow Protected" },
            { icon: <MapPin />, title: "GPS Tracking", sub: "Live Location" },
            { icon: <Truck />, title: "On-Time Delivery", sub: "Guaranteed" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-white/20 rounded-3xl border border-white/40">
              <div className="text-emerald-600 mb-2">{item.icon}</div>
              <h5 className="font-bold text-slate-800 text-sm">{item.title}</h5>
              <p className="text-[10px] text-slate-400 font-bold uppercase">{item.sub}</p>
            </div>
          ))}
        </section>

      </div>
    </div>
    </>
  );
}