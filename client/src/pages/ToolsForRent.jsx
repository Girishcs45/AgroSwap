import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  Filter,
  ArrowRight,
  Tractor,
  Droplets,
  Gauge,
  Wheat,
  Cog,
  Wrench,
  Sprout,
  Target,
} from "lucide-react";

import {
  Chip,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import GlassCard from "../components/GlassCard";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";

import { getAllTools } from "../services/tool.services";

let user = null;

try {
  user = JSON.parse(localStorage.getItem("user"));
} catch {
  user = null;
}

const CATEGORIES = [
  { name: "All", key: "All", icon: <BookmarksIcon size={18} /> },
  { name: "Tractors", key: "Tractor", icon: <Tractor size={18} /> },
  { name: "Harvesters", key: "Harvester", icon: <Wheat size={18} /> },
  { name: "Sprayers", key: "Sprayer", icon: <Droplets size={18} /> },
  { name: "Rotavators", key: "Rotavator", icon: <Cog size={18} /> },
  { name: "Tillers", key: "Tiller", icon: <Wrench size={18} /> },
  { name: "Seeders", key: "Seeder", icon: <Sprout size={18} /> },
  { name: "Balers", key: "Baler", icon: <Target size={18} /> },
];


// ---------------- TOOL CARD ----------------

const ToolCard = ({ tool, navigate }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3 }}
    className="group"
  >

    <div
      className="
        relative overflow-hidden
        rounded-[36px]
        bg-white/80
        backdrop-blur-2xl
        border border-white
        shadow-[0_10px_50px_rgba(15,23,42,0.08)]
        hover:shadow-[0_20px_70px_rgba(15,23,42,0.12)]
        transition-all duration-500
        h-full
      "
    >

      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden">

        <img
          src={tool.image}
          alt={tool.name}
          className="
            w-full h-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* OVERLAY */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/60 via-black/10 to-transparent
        " />
        {!tool.isActive && (
  <div className="
    absolute inset-0
    bg-black/50
    backdrop-blur-[2px]
    flex items-center justify-center
    z-20
  ">
    <div className="
      px-6 py-3
      rounded-2xl
      bg-red-500
      text-white
      font-black
      uppercase tracking-[2px]
      text-sm
      shadow-xl
    ">
      Currently Unavailable
    </div>
  </div>
)}

        {/* STATUS */}
        <div className="absolute top-5 left-5">

          <div className={`
            px-4 py-2 rounded-2xl
            text-[10px]
            uppercase tracking-[2px]
            font-black
            backdrop-blur-xl

            ${tool.status === "Available Today"
              ? "bg-emerald-500/90 text-white"
              : "bg-orange-500/90 text-white"
            }
          `}>
            {tool.status}
          </div>

        </div>

        {/* PRICE */}
        <div className="
          absolute bottom-5 right-5
          bg-white/90
          backdrop-blur-xl
          px-4 py-3
          rounded-2xl
          shadow-lg
        ">

          <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-black">
            Per Day
          </p>

          <h3 className="text-2xl font-black text-emerald-600">
            ₹{tool.price}
          </h3>

        </div>

      </div>

      {/* CONTENT */}
      <div className="p-6">

        {/* TITLE */}
        <div className="mb-4">

          <h2 className="
            text-2xl
            font-black
            text-slate-900
            tracking-tight
          ">
            {tool.name}
          </h2>

          <div className="
            flex items-center gap-2
            text-slate-500
            text-sm
            mt-2
          ">
            <MapPin size={15} className="text-emerald-500" />
            {tool.location}
          </div>

        </div>

        {/* OWNER */}
        <div className="
          flex items-center gap-3
          p-4
          rounded-[24px]
          bg-slate-50
          border border-slate-100
          mb-6
        ">

          <Avatar
            sx={{
              width: 42,
              height: 42,
              bgcolor: "#16a34a",
              fontWeight: "bold",
            }}
          >
            {tool?.owner?.fullName?.charAt(0)?.toUpperCase()}
          </Avatar>

          <div>

            <p className="
              text-[10px]
              uppercase
              tracking-[2px]
              text-slate-400
              font-black
            ">
              Owner
            </p>

            <h4 className="font-black text-slate-800">
              {tool.owner.fullName}
            </h4>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() =>
              navigate(`/tooldetails/${tool._id}`, { state: tool })
            }
            className="
              py-4
              rounded-[22px]
              border border-emerald-200
              bg-emerald-50
              text-emerald-700
              font-black
              hover:bg-emerald-100
              transition-all
            "
          >
            View Details
          </button>

          <button
  disabled={!tool.isActive}
  onClick={() =>
    tool.isActive &&
    navigate(`/tooldetails/${tool._id}`, { state: tool })
  }
  className={`
    py-4
    rounded-[22px]
    text-white
    font-black
    transition-all duration-300

    ${
      tool.isActive
        ? `
          bg-gradient-to-r from-emerald-600 to-green-500
          hover:from-emerald-700 hover:to-green-600
          shadow-[0_15px_35px_rgba(16,185,129,0.28)]
          hover:scale-[1.02]
        `
        : `
          bg-slate-300
          cursor-not-allowed
          opacity-70
        `
    }
  `}
>
  {tool.isActive ? "Rent Now" : "Unavailable"}
</button>

        </div>

      </div>

    </div>
  </motion.div>
);


// ---------------- PAGE ----------------

export default function ToolsForRent() {

  const [tools, setTools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await getAllTools();
        setTools(res);
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      }
    };

    fetchTools();
  }, []);

  const filteredTools =
    selectedCategory === "All"
      ? tools
      : tools.filter((tool) => tool.category === selectedCategory);

  return (

    <div className="
      min-h-screen
      bg-[#f6f9f8]
      pt-24
      pb-24
      px-4 md:px-8
      overflow-hidden
      relative
    ">

      {/* TOP GRADIENT */}
      <div className="
        absolute top-0 inset-x-0
        h-[420px]
        bg-gradient-to-b from-emerald-100/40 to-transparent
        pointer-events-none
      " />

      {/* BG BLOBS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity
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
            x: [0, -60, 0],
            y: [0, 80, 0]
          }}
          transition={{
            duration: 16,
            repeat: Infinity
          }}
          className="
            absolute bottom-[-120px] right-[-120px]
            w-[360px] h-[360px]
            bg-sky-300/20
            rounded-full blur-[120px]
          "
        />

      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-16">

          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              text-5xl md:text-7xl
              font-black
              tracking-tight
              text-slate-900
              leading-[1]
              mb-6
            "
          >
            Rent Farming Tools
            <br />

            <span className="text-emerald-600">
              Near You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="
              text-lg
              text-slate-500
              max-w-2xl
              mx-auto
              leading-relaxed
              mb-10
            "
          >
            Discover affordable farming equipment directly from trusted
            farmers in your local community.
          </motion.p>

          {/* SEARCH BAR */}
          <div className="
            max-w-5xl
            mx-auto
            bg-white/80
            backdrop-blur-2xl
            border border-white
            rounded-[36px]
            shadow-[0_10px_50px_rgba(15,23,42,0.08)]
            p-4 md:p-5
          ">

            <div className="
              grid grid-cols-1 md:grid-cols-4
              gap-4
            ">

              {/* SEARCH */}
              <div className="
                flex items-center gap-3
                bg-slate-50
                rounded-[24px]
                px-5 py-4
                border border-slate-100
              ">

                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search tool..."
                  className="
                    bg-transparent
                    outline-none
                    w-full
                    text-sm
                    font-semibold
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

              </div>

              {/* LOCATION */}
              <div className="
                flex items-center gap-3
                bg-slate-50
                rounded-[24px]
                px-5 py-4
                border border-slate-100
              ">

                <MapPin size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Village / City"
                  className="
                    bg-transparent
                    outline-none
                    w-full
                    text-sm
                    font-semibold
                    text-slate-700
                    placeholder:text-slate-400
                  "
                />

              </div>

              {/* DATE */}
              <div className="
                flex items-center gap-3
                bg-slate-50
                rounded-[24px]
                px-5 py-4
                border border-slate-100
              ">

                <Calendar size={18} className="text-slate-400" />

                <input
                  type="date"
                  className="
                    bg-transparent
                    outline-none
                    w-full
                    text-sm
                    font-semibold
                    text-slate-600
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                className="
                  rounded-[24px]
                  bg-gradient-to-r from-emerald-600 to-green-500
                  hover:from-emerald-700 hover:to-green-600
                  text-white
                  font-black
                  shadow-[0_15px_35px_rgba(16,185,129,0.28)]
                  transition-all duration-300
                  hover:scale-[1.02]
                  flex items-center justify-center gap-2
                "
              >

                <SearchIcon />

                Search

              </button>

            </div>

          </div>

        </section>

        {/* CATEGORIES */}
        <section className="mb-16">

          <div className="
            flex overflow-x-auto
            gap-4
            pb-2
            no-scrollbar
          ">

            {CATEGORIES.map((cat, idx) => (

              <motion.button
                key={idx}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat.key)}
                className={`
                  flex items-center gap-3
                  px-6 py-4
                  rounded-[22px]
                  whitespace-nowrap
                  font-black
                  transition-all duration-300
                  border

                  ${selectedCategory === cat.key
                    ? `
                      bg-gradient-to-r from-emerald-600 to-green-500
                      text-white
                      border-emerald-500
                      shadow-[0_15px_35px_rgba(16,185,129,0.28)]
                    `
                    : `
                      bg-white/80
                      backdrop-blur-xl
                      border-white
                      text-slate-700
                      hover:bg-emerald-50
                    `
                  }
                `}
              >

                {cat.icon}

                {cat.name}

              </motion.button>

            ))}

          </div>

        </section>

        {/* HEADER */}
        <section className="mb-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="
                text-4xl
                font-black
                tracking-tight
                text-slate-900
              ">
                Available Tools
              </h2>

              <p className="text-slate-500 mt-2">
                {filteredTools.length} tools available near you
              </p>

            </div>

            <button
              className="
                flex items-center gap-2
                px-5 py-3
                rounded-[22px]
                bg-white/80
                backdrop-blur-xl
                border border-white
                text-slate-700
                font-black
                shadow-sm
                hover:shadow-lg
                transition-all
              "
            >

              <Filter size={18} />

              Filters

            </button>

          </div>

        </section>

        {/* GRID */}
        <section className="mb-24">

          <div className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
          ">

            {filteredTools.map((tool) => (
              <ToolCard
                key={tool._id}
                tool={tool}
                navigate={navigate}
              />
            ))}

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section>

          <div className="text-center mb-14">

            <h2 className="
              text-5xl
              font-black
              tracking-tight
              text-slate-900
              mb-4
            ">
              How It Works
            </h2>

            <p className="
              text-slate-500
              max-w-xl
              mx-auto
            ">
              Simple booking process designed for farmers and renters.
            </p>

          </div>

          <div className="
            grid grid-cols-1
            md:grid-cols-4
            gap-6
          ">

            {[
              {
                step: "01",
                title: "Search Tool",
                desc: "Browse nearby farming tools",
                icon: <Search />,
              },
              {
                step: "02",
                title: "Select Date",
                desc: "Choose your booking schedule",
                icon: <Calendar />,
              },
              {
                step: "03",
                title: "Book & Pay",
                desc: "Secure online payment flow",
                icon: <Gauge />,
              },
              {
                step: "04",
                title: "Get Delivered",
                desc: "Receive tool at your farm",
                icon: <Tractor />,
              },
            ].map((item, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="
                  relative overflow-hidden
                  rounded-[36px]
                  bg-white/80
                  backdrop-blur-2xl
                  border border-white
                  shadow-[0_10px_50px_rgba(15,23,42,0.08)]
                  p-8
                  text-center
                "
              >

                <div className="
                  absolute top-0 right-0
                  w-32 h-32
                  bg-emerald-100/40
                  rounded-full blur-3xl
                " />

                <div className="relative z-10">

                  <div className="
                    w-20 h-20
                    mx-auto mb-6
                    rounded-[28px]
                    bg-gradient-to-br from-emerald-500 to-green-600
                    text-white
                    flex items-center justify-center
                    shadow-[0_15px_35px_rgba(16,185,129,0.28)]
                  ">
                    {item.icon}
                  </div>

                  <div className="
                    text-[11px]
                    uppercase
                    tracking-[3px]
                    text-emerald-600
                    font-black
                    mb-2
                  ">
                    Step {item.step}
                  </div>

                  <h3 className="
                    text-2xl
                    font-black
                    text-slate-900
                    mb-3
                  ">
                    {item.title}
                  </h3>

                  <p className="
                    text-slate-500
                    leading-relaxed
                  ">
                    {item.desc}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

      </div>
    </div>
  );
}