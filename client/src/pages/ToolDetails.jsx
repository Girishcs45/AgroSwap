import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  ShieldCheck,
  Zap,
  Fuel,
  Settings,
  UserCheck,
  Share2,
  Heart,
  Scale,
  Truck,
  Phone,
} from 'lucide-react';

import {
  Chip,
  Avatar,
  Button,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';

import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


// ---------------- COMPONENTS ----------------

const GlassCard = ({ children, className }) => (
  <div
    className={`
      bg-white/75
      backdrop-blur-2xl
      border border-white/70
      rounded-[32px]
      shadow-[0_10px_50px_rgba(15,23,42,0.08)]
      ${className}
    `}
  >
    {children}
  </div>
);

const InfoPill = ({ icon, label, value }) => (
  <div className="
    flex items-center gap-4
    p-5
    bg-white/70
    rounded-[28px]
    border border-white
    shadow-sm
  ">
    <div className="
      w-12 h-12
      rounded-2xl
      bg-emerald-100
      flex items-center justify-center
      text-emerald-600
    ">
      {icon}
    </div>

    <div>
      <p className="text-[10px] uppercase tracking-[2px] font-black text-slate-400">
        {label}
      </p>

      <p className="text-sm font-black text-slate-800 mt-1">
        {value}
      </p>
    </div>
  </div>
);


// ---------------- PAGE ----------------

export default function ToolDetails() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  const { state: tool } = useLocation();
  const { _id } = useParams();

  const [bookingType] = useState("day");
  const [range, setRange] = useState("");

  const handleConfirmBooking = () => {
    if (!range?.from || !range?.to) {
      return alert("Select date range");
    }

    navigate(`/payment/${tool._id}`, {
      state: {
        tool,
        bookingType,
        fromDate: range.from,
        toDate: range.to,
      }
    });
  };

  return (
    <>
      <Navbar />

      {/* TOP GLOW */}
      <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-emerald-100/40 to-transparent pointer-events-none" />

      <div className="min-h-screen bg-[#f6f9f8] pt-24 pb-24 px-4 md:px-8 overflow-hidden relative">

        {/* BACKGROUND BLOBS */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">

          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
            }}
            className="
              absolute top-[-120px] left-[-120px]
              w-[420px] h-[420px]
              bg-emerald-300/20
              rounded-full blur-[120px]
            "
          />

          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
            }}
            className="
              absolute bottom-[-100px] right-[-100px]
              w-[360px] h-[360px]
              bg-sky-300/20
              rounded-full blur-[120px]
            "
          />

        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* HERO SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

            {/* LEFT */}
            <div className="lg:col-span-7 space-y-6">

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="
                  relative overflow-hidden
                  rounded-[38px]
                  h-[420px] md:h-[560px]
                  shadow-[0_20px_80px_rgba(0,0,0,0.18)]
                  group
                "
              >
                <img
                  src={tool?.image}
                  alt={tool?.name}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* CHIP */}
                <div className="absolute top-6 left-6 z-10">
                  <Chip
                    label="Premium Listing"
                    className="!bg-white/90 !text-slate-800 !font-black backdrop-blur-xl"
                  />
                </div>
                {!tool?.isActive && (
  <div className="mt-3">
    <Chip
      label="Currently Unavailable"
      className="!bg-red-500 !text-white !font-black"
    />
  </div>
)}
              </motion.div>

              {/* ACTIONS */}
              <div className="flex justify-between items-center px-2">

                <div className="flex gap-4">

                  <IconButton
                    className="
                      !bg-white/80 hover:!bg-white
                      !text-slate-700
                      backdrop-blur-xl
                      border border-white/60
                      shadow-lg
                      hover:scale-105
                      transition-all
                    "
                  >
                    <Heart size={20} />
                  </IconButton>

                  <IconButton
                    className="
                      !bg-white/80 hover:!bg-white
                      !text-slate-700
                      backdrop-blur-xl
                      border border-white/60
                      shadow-lg
                      hover:scale-105
                      transition-all
                    "
                  >
                    <Share2 size={20} />
                  </IconButton>

                  <IconButton
                    className="
                      !bg-white/80 hover:!bg-white
                      !text-slate-700
                      backdrop-blur-xl
                      border border-white/60
                      shadow-lg
                      hover:scale-105
                      transition-all
                    "
                  >
                    <Scale size={20} />
                  </IconButton>

                </div>

                {/* REVIEWS */}
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <Avatar
                      key={i}
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      className="border-[3px] border-white"
                    />
                  ))}

                  <div className="
                    w-11 h-11 rounded-full
                    bg-emerald-100
                    border-[3px] border-white
                    flex items-center justify-center
                    text-[10px]
                    font-black
                    text-emerald-700
                  ">
                    +42
                  </div>
                </div>
              </div>

              {/* TABS */}
              <GlassCard className="p-3 bg-white/80">

                <Tabs
                  value={tabValue}
                  onChange={(e, val) => setTabValue(val)}
                  className="px-4 border-b border-slate-100"
                  TabIndicatorProps={{
                    className: "!bg-emerald-500 h-1 rounded-full"
                  }}
                >
                  <Tab label="Overview" className="!font-black !normal-case !text-base !py-5" />
                  <Tab label="Specifications" className="!font-black !normal-case !text-base !py-5" />
                  <Tab label="Reviews" className="!font-black !normal-case !text-base !py-5" />
                </Tabs>

                <div className="p-8">

                  {tabValue === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    >
                      <InfoPill
                        icon={<Zap size={18} />}
                        label="Power"
                        value={tool?.power || "N/A"}
                      />

                      <InfoPill
                        icon={<Fuel size={18} />}
                        label="Fuel Type"
                        value={tool?.fuel || "N/A"}
                      />

                      <InfoPill
                        icon={<Settings size={18} />}
                        label="Drive"
                        value={tool?.drive || "N/A"}
                      />

                      <div className="md:col-span-3 pt-4">
                        <h3 className="text-xl font-black text-slate-900 mb-3">
                          Description
                        </h3>

                        <p className="text-slate-600 leading-relaxed text-[15px]">
                          {tool?.description}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {tabValue === 1 && (
                    <div className="space-y-4">

                      {[
                        {
                          label: "Engine HP Range",
                          value: tool?.power
                        },
                        {
                          label: "Lifting Capacity",
                          value: "1800 KG"
                        },
                        {
                          label: "Clutch Type",
                          value: "Dual Clutch"
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="
                            flex items-center justify-between
                            p-5
                            rounded-3xl
                            bg-slate-50
                            border border-slate-100
                          "
                        >
                          <span className="text-slate-500 font-bold">
                            {item.label}
                          </span>

                          <span className="font-black text-slate-900">
                            {item.value}
                          </span>
                        </div>
                      ))}

                    </div>
                  )}

                </div>
              </GlassCard>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-5 space-y-6">

              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
              >

                {/* TITLE */}
                <h1 className="
                  text-5xl md:text-6xl
                  font-black
                  tracking-tight
                  text-slate-900
                  leading-[1]
                  mb-4
                ">
                  {tool?.name}
                </h1>

                {/* LOCATION */}
                <p className="
                  flex items-center gap-2
                  text-slate-500
                  font-semibold
                  text-sm
                  mb-8
                ">
                  <MapPin size={18} className="text-emerald-500" />
                  {tool?.location}
                </p>

                {/* BOOKING CARD */}
                <GlassCard className="
                  p-8 md:p-10
                  relative overflow-hidden
                  border border-emerald-100
                  bg-white/85
                  shadow-[0_20px_70px_rgba(16,185,129,0.12)]
                ">

                  {/* GLOWS */}
                  <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-300/20 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 w-44 h-44 bg-sky-300/20 blur-3xl rounded-full" />

                  <div className="relative z-10 space-y-8">

                    {/* PRICE */}
                    <div>
                      <p className="text-xs uppercase tracking-[4px] text-slate-400 font-black">
                        Starting Price
                      </p>

                      <h2 className="text-5xl font-black tracking-tight text-slate-900 mt-2">
                        ₹{tool?.price}
                      </h2>
                    </div>

                    {/* DATE PICKER */}
                    <div className="
                      bg-slate-50/80
                      p-5
                      rounded-[28px]
                      border border-slate-100
                      shadow-inner
                    ">

                      <DayPicker
  mode="range"
  selected={range}
  onSelect={setRange}
  disabled={
    tool?.isActive
      ? { before: new Date() }
      : true
  }
  className={`w-full ${
    !tool?.isActive ? "opacity-50 pointer-events-none" : ""
  }`}
/>

                      {range?.from && (
                        <div className="
                          mt-5
                          p-4
                          rounded-2xl
                          bg-white
                          border border-slate-100
                        ">
                          <p className="font-bold text-slate-700">
                            From: {range.from.toDateString()}
                          </p>

                          <p className="font-bold text-slate-700 mt-1">
                            To: {range.to?.toDateString()}
                          </p>
                        </div>
                      )}

                    </div>

                    {/* BUTTON */}
                   <Button
  fullWidth
  variant="contained"
  disabled={!tool?.isActive}
  onClick={handleConfirmBooking}
  className={`
    !py-5
    !rounded-[24px]
    !text-lg
    !font-black
    tracking-wide
    transition-all duration-300

    ${
      tool?.isActive
        ? `
          !bg-gradient-to-r !from-emerald-600 !via-green-500 !to-emerald-500
          hover:!from-emerald-700 hover:!to-green-600
          !shadow-[0_15px_40px_rgba(16,185,129,0.35)]
          hover:scale-[1.02]
        `
        : `
          !bg-slate-300
          !text-slate-500
          cursor-not-allowed
          opacity-80
        `
    }
  `}
>
  {tool?.isActive ? "Confirm Booking" : "Currently Unavailable"}
</Button>

                    <p className="
                      text-center
                      text-[10px]
                      text-slate-400
                      font-black
                      uppercase
                      tracking-[3px]
                    ">
                      🔒 Secured by AgroSwap Escrow
                    </p>

                  </div>
                </GlassCard>

              </motion.div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* MAP */}
            <div className="lg:col-span-8">

              <GlassCard className="p-7 bg-white/80">

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <MapPin className="text-emerald-600" size={20} />
                    Tool Location
                  </h3>

                  <a
                    href={`https://www.google.com/maps?q=${tool.location}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-black text-emerald-600 hover:underline"
                  >
                    Open Maps →
                  </a>

                </div>

                <div className="
                  rounded-[28px]
                  overflow-hidden
                  border border-slate-100
                  shadow-inner
                ">
                  <iframe
                    title="tool-location"
                    loading="lazy"
                    src={`https://www.google.com/maps?q=${tool.location}&z=14&output=embed`}
                    className="w-full h-[320px]"
                  />
                </div>

              </GlassCard>

            </div>

            {/* OWNER CARD */}
            <div className="lg:col-span-4">

              <GlassCard className="p-0 overflow-hidden bg-white/80">

                {/* HEADER */}
                <div className="
                  relative h-28
                  bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500
                ">
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* CONTENT */}
                <div className="px-7 pb-7 -mt-14 relative z-10">

                  {/* AVATAR */}
                  <div className="relative w-fit mx-auto">

                    <Avatar
  src={tool?.owner?.profileImage}
  sx={{
    width: 96,
    height: 96,
    bgcolor: "#16a34a",
    fontSize: 36,
    fontWeight: "bold",

    border: "5px solid #22c55e",

    boxShadow: `
      0 0 0 5px rgba(34,197,94,0.18),
      0 14px 34px rgba(22,163,74,0.35)
    `,
  }}
>
  {!tool?.owner?.profileImage &&
    tool?.owner?.fullName?.charAt(0)?.toUpperCase()}
</Avatar>

                    <div className="
                      absolute bottom-1 right-1
                      w-8 h-8 rounded-full
                      bg-blue-500
                      border-[3px] border-white
                      flex items-center justify-center
                    ">
                      <UserCheck size={14} className="text-white" />
                    </div>

                  </div>

                  {/* INFO */}
                  <div className="text-center mt-5">

                    <h2 className="text-2xl font-black text-slate-900">
                      {tool?.owner?.fullName}
                    </h2>

                    <p className="
                      mt-1
                      text-xs
                      uppercase
                      tracking-[3px]
                      text-emerald-600
                      font-black
                    ">
                      Verified Owner
                    </p>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-7 space-y-4">

                    <div className="
                      flex items-center gap-4
                      p-4
                      rounded-3xl
                      bg-white
                      border border-slate-100
                    ">

                      <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-emerald-100
                        flex items-center justify-center
                      ">
                        <Phone size={20} className="text-emerald-600" />
                      </div>

                      <div>
                        <p className="
                          text-[10px]
                          uppercase
                          tracking-[2px]
                          text-slate-400
                          font-black
                        ">
                          Contact Number
                        </p>

                        <h4 className="font-black text-slate-800 mt-1">
                          {tool?.owner?.mobile}
                        </h4>
                      </div>

                    </div>

                    <div className="
                      flex items-center gap-4
                      p-4
                      rounded-3xl
                      bg-white
                      border border-slate-100
                    ">

                      <div className="
                        w-12 h-12
                        rounded-2xl
                        bg-sky-100
                        flex items-center justify-center
                      ">
                        <MapPin size={20} className="text-sky-600" />
                      </div>

                      <div>
                        <p className="
                          text-[10px]
                          uppercase
                          tracking-[2px]
                          text-slate-400
                          font-black
                        ">
                          Location
                        </p>

                        <h4 className="font-black text-slate-800 mt-1">
                          {tool?.owner?.location
                            ? `${tool.owner.location.village || ""}, ${tool.owner.location.district || ""}, ${tool.owner.location.state || ""}`
                            : tool?.location}
                        </h4>
                      </div>

                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="
                    mt-5
                    flex items-center justify-center gap-2
                    text-xs
                    text-slate-400
                    font-semibold
                  ">
                    <ShieldCheck size={14} />
                    Trusted AgroSwap Member
                  </div>

                </div>

              </GlassCard>

            </div>

          </div>

          {/* TRUST STRIP */}
          <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">

            {[
              {
                icon: <UserCheck />,
                title: "KYC Verified",
                sub: "Trusted Farmers"
              },
              {
                icon: <ShieldCheck />,
                title: "Secure Pay",
                sub: "Escrow Protected"
              },
              {
                icon: <MapPin />,
                title: "GPS Tracking",
                sub: "Live Location"
              },
              {
                icon: <Truck />,
                title: "On-Time Delivery",
                sub: "Guaranteed"
              },
            ].map((item, i) => (

              <div
                key={i}
                className="
                  flex flex-col items-center text-center
                  p-7
                  bg-white/70
                  backdrop-blur-xl
                  rounded-[28px]
                  border border-white
                  shadow-sm
                  hover:-translate-y-1
                  hover:shadow-xl
                  transition-all duration-300
                "
              >
                <div className="text-emerald-600 mb-3">
                  {item.icon}
                </div>

                <h5 className="font-black text-slate-900 text-sm">
                  {item.title}
                </h5>

                <p className="
                  text-[10px]
                  text-slate-400
                  font-black
                  uppercase
                  tracking-[2px]
                  mt-1
                ">
                  {item.sub}
                </p>

              </div>
            ))}

          </section>

        </div>
      </div>
    </>
  );
}