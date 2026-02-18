import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../../components/GlassCard";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Tractor,
  Clock,
  CalendarCheck,
  MapPin,
  MessageSquare,
  AlertTriangle,
  Timer,
  Search,
} from "lucide-react";

import {
  Tabs,
  Tab,
  Chip,
  Avatar,
  Button,
  LinearProgress,
  Tooltip,
  TextField,
} from "@mui/material";
import { BOOKINGS } from "../../Data/Bookings";

/* ---------------- STATUS CHIP ---------------- */

const StatusChip = ({ status }) => {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Returning: "bg-sky-100 text-sky-700 border-sky-200",
    Completed: "bg-slate-100 text-slate-500 border-slate-200",
    Overdue: "bg-red-100 text-red-700 border-red-200 animate-pulse",
    Requested: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <Chip
      label={status}
      size="small"
      className={`${styles[status]} font-black text-[10px] px-2 border`}
    />
  );
};
const STATUS_PROGRESS = {
    Active: 60,
    Returning: 85,
    Completed: 100,
    Requested: 15,
    Upcoming: 0,
    Overdue: 100,
  };
/* ---------------- MAIN COMPONENT ---------------- */

export default function Bookings() {
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  
  /* -------- SAFE USER PARSE -------- */
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("agroUser"));
  } catch {
    user = null;
  }

  /* -------- AUTH GUARD (RUN ONCE) -------- */

  /* -------- LOAD BOOKINGS -------- */
  useEffect(() => {
    const storedBookings =
      JSON.parse(localStorage.getItem("agroBookings")) || [];
    setBookings(storedBookings);
  }, []);
  const tools = JSON.parse(localStorage.getItem("agroTools")) || [];

  const tabLabels = [
  "All",
  "Active",
  "Returning",
  "Completed",
  "Upcoming",
  "Requested",
];

  const myTools = tools.filter((tool) => tool.ownerId === user?.id);

  const myToolIds = myTools.map((tool) => tool.id);

  const activeTab = tabLabels[tabValue];

  /* -------- FILTER BOOKINGS -------- */
  const filteredBookings = useMemo(() => {
    if (!user) return [];

    return (
      bookings
        // only bookings for my tools
        .filter((b) => myToolIds.includes(b.toolId))

        // tab filter
        .filter((b) => (activeTab === "All" ? true : b.status === activeTab))

        // search filter
        .filter((b) =>
          `${b.toolId} ${b.renterId}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )

        // attach tool
        .map((b) => {
          const tool = tools.find((t) => t.id === b.toolId);

          return {
            ...b,
            tool,
            progress: STATUS_PROGRESS[b.status] ?? 0,
          };
        })

        // safety: remove broken records
        .filter((b) => b.tool)
    );
  }, [bookings, tools, myToolIds, user, activeTab, search]);

  /* -------- STATS -------- */
  const totalBookings = filteredBookings.length;
  const activeCount = filteredBookings.filter(
    (b) => b.status === "Active",
  ).length;
  const returningCount = filteredBookings.filter(
    (b) => b.status === "Returning",
  ).length;
  const requestedCount = filteredBookings.filter(
    (b) => b.status === "Requested",
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 pt-24 pb-16 px-4 md:px-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 mb-8">
            Booking Management
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Bookings",
                val: totalBookings,
                icon: <Box />,
                color: "text-indigo-600",
              },
              {
                label: "Active Rentals",
                val: activeCount,
                icon: <Tractor />,
                color: "text-emerald-600",
              },
              {
                label: "Returning Today",
                val: returningCount,
                icon: <Clock />,
                color: "text-sky-600",
              },
              {
                label: "New Requests",
                val: requestedCount,
                icon: <CalendarCheck />,
                color: "text-orange-600",
              },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-6">
                <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                <div className="text-3xl font-black text-slate-800">
                  {stat.val}
                </div>
                <div className="text-[10px] font-black uppercase text-slate-400 mt-1">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </header>

        {/* BOOKINGS LIST */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking) => (
              <GlassCard
                key={booking.id}
                className="p-5 flex flex-col md:flex-row gap-6 items-center"
              >
                {/* TOOL */}
                <div className="flex items-center gap-4 w-full md:w-1/3">
                  <img
                    src={booking.tool.img}
                    className="w-16 h-16 rounded-2xl object-cover"
                    alt={booking.tool.name}
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">
                      {booking.tool.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Avatar
                        src={booking.renterId}
                        sx={{ width: 16, height: 16 }}
                      />
                      {booking.renterId}
                    </div>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>
                      {booking.start} → {booking.end}
                    </span>
                    <span className="text-emerald-600">
                      ₹{booking.totalCost}
                    </span>
                  </div>

                  <LinearProgress
                    variant="determinate"
                    value={booking.progress || 0}
                    className="h-1.5 rounded-full"
                    sx={{
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#10b981",
                      },
                    }}
                  />

                  <div className="flex justify-between mt-2 items-center">
                    <StatusChip status={booking.status} />
                    <span className="text-[10px] text-slate-400">
                      {booking.duration}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <Tooltip title="Track">
                    <button className="p-2 bg-white/60 rounded-xl text-emerald-600 hover:bg-emerald-500 hover:text-white">
                      <MapPin size={18} />
                    </button>
                  </Tooltip>
                  <Tooltip title="Chat">
                    <button className="p-2 bg-white/60 rounded-xl text-sky-600 hover:bg-sky-500 hover:text-white">
                      <MessageSquare size={18} />
                    </button>
                  </Tooltip>
                  <button
                    className="px-4 py-2 bg-slate-800 text-white text-[10px] font-bold rounded-xl"
                    onClick={() => navigate(`/action/${booking.id}`)}
                  >
                    Actions
                  </button>
                </div>
              </GlassCard>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
