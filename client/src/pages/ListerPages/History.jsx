import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Fuel, Settings, Calendar, ChevronRight, 
  Clock, CheckCircle2 
} from 'lucide-react';

// --- Glass Card ---
const GlassCard = ({ children, className = "", noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={noHover ? {} : { y: -4 }}
    className={`backdrop-blur-xl bg-white/60 border border-white/50 rounded-[2rem] shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

// --- Dummy Data ---
const RENTALS_DATA = [
  {
    id: 1,
    name: "John Deere 5050D",
    category: "Tractor",
    price: "3,200",
    unit: "day",
    hp: "50",
    fuel: "Diesel",
    drive: "4WD",
    dates: "Apr 24 - Apr 28",
    img: "https://images.unsplash.com/photo-1594495894542-a4e1707d7e7c?auto=format&fit=crop&q=80&w=600",
    status: "active"
  },
  {
    id: 2,
    name: "Mahindra Harvester",
    category: "Harvester",
    price: "7,500",
    unit: "day",
    hp: "60",
    fuel: "Diesel",
    drive: "2WD",
    dates: "May 02 - May 05",
    img: "https://images.unsplash.com/photo-1592910129881-892bbe239cc6?auto=format&fit=crop&q=80&w=600",
    status: "upcoming"
  },
  {
    id: 3,
    name: "DJI Agras T40 Drone",
    category: "Drone",
    price: "1,800",
    unit: "day",
    hp: "15",
    fuel: "Electric",
    drive: "N/A",
    dates: "Mar 12 - Mar 14",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    status: "completed"
  }
];

export default function History() {

  // 🔥 DEFAULT = ALL
  const [filter, setFilter] = useState("all");

  const filters = [
    { key: "all", label: "All", icon: Clock },
    { key: "active", label: "Active", icon: CheckCircle2 },
    { key: "upcoming", label: "Upcoming", icon: Clock },
    { key: "completed", label: "Completed", icon: Clock }
  ];

  // 🔥 COUNTS
  const counts = {
    all: RENTALS_DATA.length,
    active: RENTALS_DATA.filter(r => r.status === "active").length,
    upcoming: RENTALS_DATA.filter(r => r.status === "upcoming").length,
    completed: RENTALS_DATA.filter(r => r.status === "completed").length
  };

  // 🔥 FILTER LOGIC
  const filteredRentals =
    filter === "all"
      ? RENTALS_DATA
      : RENTALS_DATA.filter(r => r.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-sky-50/30 pt-24 pb-20 px-6">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-6">

          <div>
            <h1 className="text-4xl font-black text-slate-800">My Rentals</h1>
            <p className="text-slate-500 mt-1">Track all your rented tools</p>
          </div>

          {/* 🔥 FILTER BAR */}
         <div className="relative flex items-center p-1.5 bg-white/50 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-fit overflow-hidden">

  {/* 🔥 SLIDING INDICATOR (SMOOTHER + SOFTER) */}
  <motion.div
    layout
    transition={{ type: "spring", stiffness: 280, damping: 25 }}
    className="absolute top-1.5 bottom-1.5 rounded-2xl z-0"
    style={{
      width: "calc(100% / 5)",
      left:
        filter === "all"
          ? "0%"
          : filter === "active"
          ? "25%"
          : filter === "upcoming"
          ? "50%"
          : "75%",
      background:
        filter === "all"
          ? "linear-gradient(135deg,#64748b,#94a3b8)"
          : filter === "active"
          ? "linear-gradient(135deg,#10b981,#34d399)"
          : filter === "upcoming"
          ? "linear-gradient(135deg,#0ea5e9,#38bdf8)"
          : "linear-gradient(135deg,#e2e8f0,#cbd5f5)"
    }}
  />

  {filters.map(({ key, label, icon: Icon }) => (
    <button
      key={key}
      onClick={() => setFilter(key)}
      className={`relative z-10 flex items-center gap-7 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
        filter === key
          ? "text-white scale-[1.03]"
          : "text-slate-500 hover:text-slate-800"
      }`}
    >
      <Icon size={13} className={`${filter === key ? "opacity-100" : "opacity-70"}`} />

      {label}

      {/* 🔥 COUNT BADGE */}
      <span
        className={`ml-1 text-[8px] px-2 py-0.5 rounded-full font-black transition-all ${
          filter === key
            ? "bg-white/20 text-white"
            : "bg-slate-200 text-slate-600"
        }`}
      >
        {counts[key]}
      </span>
    </button>
  ))}
</div>
        </div>

        {/* CARDS */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">

            {filteredRentals.length > 0 ? (
              filteredRentals.map((rental) => (
                <motion.div key={rental.id} layout>
                  <GlassCard className="flex flex-col md:flex-row items-stretch md:items-center overflow-hidden h-full md:h-52 group cursor-default">

                    {/* IMAGE */}
                    <div className="w-full md:w-56 lg:w-64 h-52 md:h-full overflow-hidden shrink-0">
                      <img
                        src={rental.img}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-grow p-8 space-y-4">
                      <p className="text-[10px] text-emerald-600 uppercase font-black">
                        {rental.category}
                      </p>

                      <h2 className="text-2xl font-black text-slate-800">
                        {rental.name}
                      </h2>

                      <div className="flex gap-3">
                        <Badge icon={Zap} label={`${rental.hp} HP`} />
                        <Badge icon={Fuel} label={rental.fuel} />
                        <Badge icon={Settings} label={rental.drive} />
                      </div>

                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={16} />
                        <span className="text-sm font-bold uppercase">
                          {rental.dates}
                        </span>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="p-8 flex flex-col items-end gap-4 border-l border-white/30">

                      <div>
                        <p className="text-3xl font-black">₹{rental.price}</p>
                        <p className="text-[10px] uppercase text-slate-400">
                          per {rental.unit}
                        </p>
                      </div>

                      <StatusTag status={rental.status} />

                      <button className="flex items-center gap-2 text-emerald-600 font-black text-xs hover:translate-x-1 transition">
                        View <ChevronRight size={14}/>
                      </button>
                    </div>

                  </GlassCard>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-500">
                No {filter} rentals found
              </div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Badge ---
const Badge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1 px-3 py-1 bg-white/40 rounded-xl text-xs">
    <Icon size={14} />
    {label}
  </div>
);

// --- StatusTag ---
const StatusTag = ({ status }) => {
  const styles = {
    active: "bg-emerald-500 text-white shadow-lg",
    upcoming: "bg-sky-500 text-white shadow-lg",
    completed: "bg-slate-200 text-slate-600"
  };

  return (
    <div className={`${styles[status]} px-4 py-2 rounded-full text-[10px] font-black uppercase`}>
      {status}
    </div>
  );
};