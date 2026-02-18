import React from "react";
import { motion } from "framer-motion";

import GlassCard from "../../components/GlassCard";

import {
  Tractor,
  Calendar,
  CreditCard,
  Star,
  MapPin,
  User,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  Bell,
  ChevronRight,
  Download,
  RefreshCw,
} from "lucide-react";
import { Chip, Avatar, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

export default function RenterDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("agroUser"));


  useEffect(() => {
    
    if (!user || user.role !== "renter") {
      navigate("/login");
    }
  }, [user,navigate]);

  
  const allBookings = JSON.parse(localStorage.getItem("agroBookings")) || [];

  const myBookings = user
  ? allBookings.filter(b => b.renterId === user.id)
  : [];


  const tools = JSON.parse(localStorage.getItem("agroTools")) || [];

  const detailedBookings = myBookings.map((b) => {
    const tool = tools.find((t) => t.id === b.toolId);
    return {
      ...b,
      tool,
    };
  });
  const activeBookings = detailedBookings.filter((b) => b.status === "Active");
  const completedBookings = detailedBookings.filter(
  b => b.status?.toLowerCase() === "completed"
);


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-16 px-4 md:px-10 relative overflow-hidden">
        {/* Background Decor */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* 1. HEADER SECTION */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h1 className="text-4xl font-black text-slate-800">My Rentals</h1>
              <p className="text-slate-500 font-medium">
                Manage your machinery rentals and bookings
              </p>
            </motion.div>

            <GlassCard
              className="px-6 py-3 flex items-center gap-4 border-emerald-200/50"
              hover={false}
            >
              <div className="text-right hidden sm:block">
                <p className="font-bold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">{user.location}</p>
              </div>
              <div className="relative">
                <Avatar
                  src="https://i.pravatar.cc/150?u=harish"
                  sx={{ width: 48, height: 48, border: "2px solid white" }}
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white">
                  <CheckCircle size={12} fill="currentColor" />
                </div>
              </div>
            </GlassCard>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* LEFT SIDE: MAIN DASHBOARD */}
            <div className="lg:col-span-3 space-y-8">
              {/* 2. QUICK ACTION CARDS */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  {
                    label: "Rent Tools",
                    icon: <Tractor />,
                    color: "bg-emerald-500",
                    path: "/tools",
                  },
                  {
                    label: "My Bookings",
                    icon: <Calendar />,
                    color: "bg-sky-500",
                    path: "/my-bookings",
                  },
                  {
                    label: "Payments",
                    icon: <CreditCard />,
                    color: "bg-orange-500",
                    path: "/payments",
                  },
                  {
                    label: "Reviews",
                    icon: <Star />,
                    color: "bg-purple-500",
                    path: "/reviews",
                  },
                ].map((item, i) => (
                  <GlassCard
                    key={i}
                    onClick={() => navigate(item.path)}
                    className="p-6 text-center group cursor-pointer hover:scale-105 transition"
                  >
                    <div
                      className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-lg group-hover:rotate-12 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {item.label}
                    </span>
                  </GlassCard>
                ))}
              </motion.div>

              {/* 3. ACTIVE RENTALS SECTION */}
              {activeBookings.length === 0 && (
                <p className="text-slate-500 text-sm">No active rentals</p>
              )}

              {activeBookings.map((b) => (
                <GlassCard key={b.id} className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={b.tool?.img}
                      className="w-40 h-32 rounded-2xl object-cover"
                      alt={b.tool?.name}
                    />

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-lg">{b.tool?.name}</h4>
                        <Chip
                          label={b.status}
                          className="bg-emerald-100 text-emerald-700"
                        />
                      </div>

                      <p className="text-sm text-slate-500">
                        {b.start} → {b.end}
                      </p>

                      <p className="text-xs font-bold text-emerald-600 mt-2">
                        ₹{b.tool?.price}/{b.tool?.unit}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <Button size="small" variant="contained">
                          Track
                        </Button>
                        <Button size="small" variant="outlined">
                          Extend
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}

              {/* 5. RENTAL HISTORY */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-slate-800">
                    Recent History
                  </h3>
                  <Button size="small" className="text-emerald-600 font-bold">
                    View All
                  </Button>
                </div>
                <GlassCard className="overflow-x-auto" hover={false}>
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/30 text-slate-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-bold">Tool</th>
                        <th className="px-6 py-4 font-bold">Duration</th>
                        <th className="px-6 py-4 font-bold">Amount</th>
                        <th className="px-6 py-4 font-bold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/20">
                      {completedBookings.map((b) => (
                        <tr key={b.id}>
                          <td className="px-6 py-4 font-bold">
                            {b.tool?.name}
                          </td>
                          <td className="px-6 py-4 text-xs">
                            {b.start} - {b.end}
                          </td>
                          <td className="px-6 py-4 font-bold">
                            ₹{b.tool?.price}
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-2 hover:bg-emerald-100 rounded">
                              <Download size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </GlassCard>
              </section>
            </div>

            {/* RIGHT SIDE: PROFILE & NOTIFICATIONS */}
            <div className="space-y-8">
              {/* 6. RENTER PROFILE PANEL */}
              <GlassCard className="p-6 text-center border-emerald-100/50">
                <Avatar
                  src="https://i.pravatar.cc/150?u=harish"
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid white",
                  }}
                />
                <h3 className="font-bold text-slate-800 text-xl">
                  {user.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{user.mobile}</p>
                <div className="flex justify-center gap-2 mb-6">
                  <Chip
                    label="KYC Verified"
                    size="small"
                    icon={<CheckCircle size={14} />}
                    className="bg-blue-50 text-blue-600 font-bold"
                  />
                </div>
                <Button
                  fullWidth
                  variant="outlined"
                  className="rounded-xl border-slate-200 text-slate-600 normal-case font-bold"
                >
                  Edit Profile
                </Button>
              </GlassCard>

              {/* 7. NOTIFICATIONS */}
              <section>
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Bell size={18} className="text-orange-500" /> Alerts
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      text: "Tractor booking confirmed",
                      time: "2h ago",
                      icon: <CheckCircle className="text-emerald-500" />,
                    },
                    {
                      text: "Payment pending for Tiller",
                      time: "1d ago",
                      icon: <Clock className="text-orange-500" />,
                    },
                  ].map((note, i) => (
                    <GlassCard
                      key={i}
                      className="p-4 flex gap-3 items-start"
                      hover={true}
                    >
                      <div className="mt-1">{note.icon}</div>
                      <div>
                        <p className="text-xs font-bold text-slate-700 leading-tight">
                          {note.text}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {note.time}
                        </p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* 8. CALL TO ACTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <GlassCard className="bg-gradient-to-r from-emerald-600 to-sky-600 p-8 md:p-12 text-center text-white border-none overflow-hidden relative">
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-black mb-4">
                  Need More Equipment?
                </h2>
                <p className="text-white/80 mb-8">
                  Access over 500+ verified tools nearby at the best community
                  prices.
                </p>
                <Button
                  variant="contained"
                  className="bg-white text-emerald-700 font-bold px-10 py-3 rounded-xl normal-case hover:bg-emerald-50"
                  endIcon={<ChevronRight />}
                >
                  Browse Tools Marketplace
                </Button>
              </div>
              <Tractor
                size={200}
                className="absolute -bottom-10 -left-10 text-white/10 -rotate-12"
              />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}
