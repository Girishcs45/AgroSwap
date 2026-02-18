import React, { useState, useMemo,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../../components/GlassCard";

import {
  Tractor,
  Clock,
  CheckCircle2,
  MessageSquare,
  Navigation,
  History,
  Star,
} from "lucide-react";

import {
  Tabs,
  Tab,
  Chip,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";

export default function MyBookings() {
  const navigate = useNavigate();

  


  // ✅ get logged-in user
  const user = JSON.parse(localStorage.getItem("agroUser"));

  // ✅ load data
  const allBookings =
    JSON.parse(localStorage.getItem("agroBookings")) || [];
  const tools =
    JSON.parse(localStorage.getItem("agroTools")) || [];

  const [tabValue, setTabValue] = useState(0);

  const filterLabels = ["All", "Active", "Upcoming", "Returning", "Completed"];

  // ✅ filter bookings for this renter + attach tool
  const bookings = allBookings
    .filter(b => b.renterId === user?.id)
    .map(b => {
      const tool = tools.find(t => t.id === b.toolId);
      return { ...b, tool };
    });

  // ✅ tab filtering
  const filteredBookings = useMemo(() => {
    if (tabValue === 0) return bookings;
    return bookings.filter(
      b => b.status === filterLabels[tabValue]
    );
  }, [tabValue, bookings]);

  // ✅ stats
  const totalBookings = bookings.length;
  const activeCount = bookings.filter(b => b.status === "Active").length;
  const returningCount = bookings.filter(b => b.status === "Returning").length;
  const completedCount = bookings.filter(b => b.status === "Completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl font-black text-slate-800">My Bookings</h1>
            <p className="text-slate-500">
              Track all your rented tools in real-time
            </p>
          </motion.div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Bookings", val: totalBookings, icon: <History />, color: "text-indigo-600" },
            { label: "Active Rentals", val: activeCount, icon: <Tractor />, color: "text-emerald-600" },
            { label: "Returning Today", val: returningCount, icon: <Clock />, color: "text-sky-600" },
            { label: "Completed", val: completedCount, icon: <CheckCircle2 />, color: "text-slate-500" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6 text-center" hover={false}>
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-slate-800">{stat.val}</p>
              <p className="text-[10px] uppercase text-slate-400 font-bold">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* FILTER TABS */}
        <GlassCard className="p-2 mb-8" hover={false}>
          <Tabs
            value={tabValue}
            onChange={(e, val) => setTabValue(val)}
            TabIndicatorProps={{ className: "bg-emerald-500 h-1 rounded-full" }}
          >
            {filterLabels.map((label, i) => (
              <Tab key={i} label={label} className="font-bold text-xs normal-case" />
            ))}
          </Tabs>
        </GlassCard>

        {/* BOOKINGS LIST */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <GlassCard key={booking.id} className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">

                {/* LEFT */}
                <div className="flex gap-4 items-center">
                  <img
                    src={booking.tool?.img}
                    className="w-20 h-20 rounded-2xl object-cover"
                    alt={booking.toolName}
                  />
                  <div>
                    <h3 className="font-black text-slate-800">
                      {booking.tool?.name}
                    </h3>

                    <p className="text-xs text-emerald-600">
                      {booking.tool?.category}
                    </p>

                    <Chip
                      label={booking.status}
                      size="small"
                      className={`mt-1 font-black text-[10px] ${
                        booking.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : booking.status === "Returning"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    />

                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                      <Star size={14} fill="currentColor" />
                      {booking.tool?.rating || 4.5}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex gap-3">
                  <Tooltip title="Track">
                    <IconButton className="bg-white/60">
                      <Navigation />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chat">
                    <IconButton className="bg-white/60">
                      <MessageSquare />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    className="bg-slate-900"
                    onClick={() =>
                      navigate(`/booking-details/${booking.id}`, {
                        state: booking,
                      })
                    }
                  >
                    Details
                  </Button>
                </div>

              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </div>
  );
}
