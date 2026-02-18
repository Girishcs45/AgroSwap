import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from "../../components/GlassCard";
import { useEffect } from 'react';
import { TOOLS } from '../../Data/Tools';
import { BOOKINGS } from '../../Data/Bookings';

import { 
  Plus, Tractor, CalendarCheck, Wallet, MessageSquare, 
  Star, MoreVertical, Check, X, MapPin, 
  TrendingUp, AlertCircle, Trash2, Edit3 ,Mail
} from 'lucide-react';
import { Chip, Avatar, Button, Switch, Tooltip } from '@mui/material';



// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};




export default function ListerDashboard() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("agroUser"));
  useEffect(() => {
  if (!user || user.role !== "lister") {
    navigate("/login",{ replace: true });
  }
}, []);

const myTools = TOOLS.filter(tool => tool.ownerId === user.id);
const myBookings = BOOKINGS.filter(booking => booking.listerId === user.id);



  

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-100 pt-24 pb-16 px-4 md:px-10 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. FARMER PROFILE HEADER */}
        <header className="mb-10">
          <GlassCard className="p-6 md:p-8 border-emerald-200/50" hover={false}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                <Avatar 
                  src="https://i.pravatar.cc/150?u=farmer_subhash" 
                  sx={{ width: 100, height: 100, border: '4px solid white', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} 
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full border-4 border-white">
                  <Check size={16} strokeWidth={4} />
                </div>
              </div>
              
              <div className="text-center md:text-left flex-grow">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black text-slate-800">{user.name}</h1>
                  <Chip label={user.kycStatus} size="small" className="bg-blue-100 text-blue-700 font-bold" />
                </div>
                <p className="flex items-center justify-center md:justify-start gap-1 text-slate-600 font-medium">
                <MapPin size={18} className="text-emerald-500" /> {user.location}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-3">
                  <span className="flex items-center gap-1 font-bold text-amber-500"><Star size={18} fill="currentColor" /> {user.rating}</span>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-700 font-semibold"> <Mail />{user.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-white/40 p-4 rounded-3xl text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Monthly Earnings</p>
                  <p className="text-2xl font-black text-emerald-600">₹42,500</p>
                </div>
                <div className="bg-white/40 p-4 rounded-3xl text-center">
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Active Rentals</p>
                  <p className="text-2xl font-black text-sky-600">08</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </header>

        {/* 2. QUICK ACTION CARDS */}
        <motion.section 
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
        >
          {[
            { label: "Add Tool", icon: <Plus />, color: "bg-emerald-500", path: "/add-tool" },
            { label: "My Tools", icon: <Tractor />, color: "bg-teal-500", path: "/my-tools" },
            { label: "Bookings", icon: <CalendarCheck />, color: "bg-sky-500", path: "/bookings" },
            { label: "Earnings", icon: <Wallet />, color: "bg-orange-500", path: "/earnings" },
            { label: "Messages", icon: <MessageSquare />, color: "bg-indigo-500", path: "/messages" },
            
        ].map((action, i) => (
            <GlassCard 
              key={i} 
              className="p-6 text-center cursor-pointer group"
              onClick={() => navigate(action.path)}
            >
              <div className={`${action.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <p className="text-sm font-bold text-slate-700">{action.label}</p>
            </GlassCard>
          ))}
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* 3. ACTIVE RENTALS SECTION (LISTER VIEW) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-800 px-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Rental Monitoring
            </h3>
            <GlassCard className="overflow-hidden" hover={false}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/20 text-slate-500 text-xs uppercase font-bold">
                    <tr>
                      <th className="px-6 py-4">Tool & Renter</th>
                      <th className="px-6 py-4">Duration</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
  {myBookings.map((booking) => ( 

    <tr key={booking.id} className="hover:bg-white/10 transition-colors">
      <td className="px-6 py-4">
        <div className="font-bold text-slate-800 text-sm">{booking.name}</div>
        <div className="text-xs text-slate-500">Owner: {user.name}</div>
      </td>

      <td className="px-6 py-4 text-xs font-semibold text-slate-600">
        {booking.duration === "day" ? "Full Day" : "Per " + booking.duration}
      </td>

      <td className="px-6 py-4">
        <Chip 
          label={booking.status} 
          size="small" 
          className={`font-black text-[10px] ${
            booking.status === "Booked"
              ? "text-red-600 bg-red-100"
              : "text-emerald-600 bg-emerald-100"
          }`} 
        />
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">
          <Tooltip title="Track Location">
            <button className="p-2 bg-white/50 rounded-lg text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
              <MapPin size={16} />
            </button>
          </Tooltip>

          <Tooltip title="Chat">
            <button className="p-2 bg-white/50 rounded-lg text-sky-600 hover:bg-sky-500 hover:text-white transition-all">
              <MessageSquare size={16} />
            </button>
          </Tooltip>
        </div>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            </GlassCard>

            {/* 5. MY TOOLS PREVIEW */}
            <h3 className="text-xl font-bold text-slate-800 px-2 pt-4">Inventory Quick-Look</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTools.map((tool) => (
  <GlassCard key={tool.ownerId} className="p-4 flex items-center gap-4" hover={true}>
    <img src={tool.img} className="w-20 h-20 rounded-2xl object-cover" alt={tool.name} />
    <div className="flex-grow">
      <h4 className="font-bold text-slate-800 text-sm">{tool.name}</h4>
      <p className="text-xs font-bold text-emerald-600">₹{tool.price}/{tool.unit}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[10px] uppercase font-black text-slate-400">
          {tool.status === "Booked" ? "Hidden" : "Listed"}
        </span>
        <Switch checked={tool.status !== "Booked"} size="small" color="success" />
      </div>
    </div>
    <div className="flex flex-col gap-1">
      <button onClick={() => navigate(`/edit-tool/${tool.id}`)} className="p-2 text-slate-400 hover:text-emerald-600">
        <Edit3 size={16} />
      </button>
      <button className="p-2 text-slate-400 hover:text-red-500">
        <Trash2 size={16} />
      </button>
    </div>
  </GlassCard>
))}

            </div>
          </div>

          {/* RIGHT COLUMN: REQUESTS & ALERTS */}
          <div className="space-y-8">
            {/* 4. BOOKING REQUESTS PANEL */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">New Requests</h3>
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <GlassCard key={i} className="p-5 border-l-4 border-l-sky-400" hover={true}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-slate-800">Harvester Rental</h4>
                        <p className="text-xs text-slate-500">By Amit Singh • 3 Days</p>
                      </div>
                      <p className="font-black text-emerald-600 text-sm">₹4,500</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button fullWidth variant="contained" size="small" className="bg-emerald-500 hover:bg-emerald-600 rounded-xl text-xs font-bold py-2 shadow-none"><Check size={16} className="mr-1" /> Accept</Button>
                      <Button fullWidth variant="outlined" size="small" className="border-slate-200 text-slate-500 rounded-xl text-xs font-bold py-2"><X size={16} className="mr-1" /> Decline</Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </section>

            {/* 7. NOTIFICATIONS PANEL */}
            <section>
              <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">Recent Alerts</h3>
              <div className="space-y-3">
                {[
                  { title: "Payment Received", msg: "₹1,200 for Tiller rental", icon: <Wallet size={16} />, color: "text-emerald-500 bg-emerald-50" },
                  { title: "New Review", msg: "5-star rating from Anil M.", icon: <Star size={16} />, color: "text-amber-500 bg-amber-50" }
                ].map((note, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-2xl bg-white/40 border border-white/60">
                    <div className={`p-2 rounded-xl h-fit ${note.color}`}>{note.icon}</div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">{note.title}</h5>
                      <p className="text-[10px] text-slate-500">{note.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* 8. CALL TO ACTION */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <GlassCard className="bg-gradient-to-r from-emerald-600 to-sky-600 p-8 md:p-12 text-center text-white border-none overflow-hidden relative" hover={false}>
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4">Grow Your Earnings with AgroSwap</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto font-medium">Have more equipment sitting idle? List them now and join Pune's largest community-driven agricultural tool network.</p>
              <Button 
                variant="contained" 
                onClick={() => navigate('/add-tool')}
                className="bg-white text-emerald-700 font-black px-12 py-4 rounded-2xl normal-case text-lg shadow-xl hover:bg-emerald-50"
              >
                + List New Tool
              </Button>
            </div>
            {/* Abstract Shape */}
            <Tractor size={200} className="absolute -bottom-10 -right-10 text-white/10 -rotate-12" />
          </GlassCard>
        </motion.div>

      </div>
    </div>
    
    </>
  );
}