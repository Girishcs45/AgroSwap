import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../../components/CustomButton";
import {
  Plus,
  Zap,
  Fuel,
  Settings,
  Package,
  ChevronRight,
  CheckCircle2,
  Tractor,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@mui/material";

// --- Reusable Components ---

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-[2rem] shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
    <Icon size={14} strokeWidth={2.5} />
    {label}
  </div>
);

// --- Dummy Data ---

const DUMMY_TOOLS = [
  {
    id: 1,
    name: "John Deere 5050D",
    category: "Tractor",
    price: "800",
    unit: "day",
    hp: "50",
    fuel: "Diesel",
    drive: "4WD",
    img: "https://images.unsplash.com/photo-1594495894542-a4e1707d7e7c?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    name: "Mahindra Rice Harvester",
    category: "Harvester",
    price: "2500",
    unit: "day",
    hp: "60",
    fuel: "Diesel",
    drive: "2WD",
    img: "https://images.unsplash.com/photo-1592910129881-892bbe239cc6?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    name: "DJI Agras T40 Drone",
    category: "Drone",
    price: "1200",
    unit: "day",
    hp: "15",
    fuel: "Electric",
    drive: "N/A",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
  },
];

// --- Main Section Component ---

export default function ListerInventory() {
  const navigate = useNavigate();
  const tools = DUMMY_TOOLS; // Replace with actual state in production

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6 overflow-x-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* 1. HERO CARD (Add Tool CTA) */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-2xl shadow-emerald-200/50 p-10 md:p-16 text-white">
            {/* Animated Inner Glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] -ml-32 -mb-32" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
                    Earn More With <br />
                    Your Tools 🚜
                  </h1>
                  <p className="text-lg text-emerald-50/90 font-medium max-w-md leading-relaxed">
                    List your farming equipment and generate passive income by
                    renting them to verified farmers near you.
                  </p>
                </div>

                <CustomButton
                  onClick={() => navigate("/add-tool")}
                  size="large"
                  sx={{
                    px: 3,
                    borderRadius: "999px", // pill shape 👀
                    letterSpacing: "0.5px",
                  }}
                >
                  ADD YOUR TOOL'S
                </CustomButton>
              </div>

              {/* Right Side */}
              <div className="hidden lg:block">
                <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 space-y-6 shadow-2xl">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-400/20 p-2.5 rounded-xl">
                      <TrendingUp size={24} />
                    </div>
                    <span className="font-bold text-lg">
                      Earn passive income
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-400/20 p-2.5 rounded-xl">
                      <Tractor size={24} />
                    </div>
                    <span className="font-bold text-lg">
                      Help other farmers
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-400/20 p-2.5 rounded-xl">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-bold text-lg">
                      Fully secured rentals
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. TOOL LIST (HORIZONTAL CARDS) */}
        <section className="space-y-8">
          <div className="flex justify-between items-end mb-8 px-2">
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                My Equipment
              </h2>
              <p className="text-slate-500 font-bold mt-1 uppercase tracking-widest text-[10px]">
                Active Listings
              </p>
            </div>
            <div className="h-0.5 flex-grow mx-8 bg-slate-200/50 mb-3" />
          </div>

          <AnimatePresence>
            {tools.length > 0 ? (
              <div className="space-y-6">
                {tools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                  >
                    <GlassCard className="flex flex-col md:flex-row items-stretch md:items-center overflow-hidden h-full md:h-52 group cursor-default">
                      {/* LEFT: IMAGE */}
                      <div className="w-full md:w-56 lg:w-64 h-52 md:h-full overflow-hidden shrink-0">
                        <img
                          src={tool.img}
                          alt={tool.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* CENTER: DETAILS */}
                      <div className="flex-grow p-6 md:px-10 flex flex-col justify-center space-y-4">
                        <div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">
                            {tool.category}
                          </p>
                          <h3 className="text-2xl font-black text-slate-800 leading-tight">
                            {tool.name}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Badge icon={Zap} label={`${tool.hp} HP`} />
                          <Badge icon={Fuel} label={tool.fuel} />
                          <Badge icon={Settings} label={tool.drive} />
                        </div>
                      </div>

                      {/* RIGHT: PRICE & ACTION */}
                      <div className="p-6 md:pr-10 md:pl-10 border-t md:border-t-0 md:border-l border-slate-200/50 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4">
                        <div className="text-left md:text-right">
                          <p className="text-3xl font-black text-slate-900 leading-none">
                            ₹{tool.price}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            per {tool.unit}
                          </p>
                        </div>

                        <CustomButton
                       onClick={() => navigate(`/tool/${tool.id}`, { state: tool })}
                          variantType="success"
                          size="medium"
                          sx={{
                            borderRadius: "999px",
                            px: 4,
                          }}
                        >
                          View Details
                        </CustomButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <GlassCard className="p-12 max-w-md text-center bg-white/40 border-slate-200/50 shadow-2xl">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">
                    No tools added yet
                  </h3>
                  <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                    Ready to monetize your equipment? Start your first listing
                    and reach farmers across the region.
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/add-tool")}
                    className="bg-emerald-600 hover:bg-emerald-700 px-10 py-4 rounded-2xl font-black shadow-xl normal-case text-lg"
                  >
                    + Add Your First Tool
                  </Button>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
