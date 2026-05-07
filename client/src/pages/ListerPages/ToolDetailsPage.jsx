import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import {
  deleteToolService,
  toggleToolVisibilityService,
} from "../../services/tool.services";
import {
  Zap,
  Fuel,
  Settings,
  Calendar,
  MapPin,
  Edit3,
  Trash2,
  Package,
  ChevronLeft,
  User,
  CheckCircle2,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Switch, Avatar, Chip, Tooltip } from "@mui/material";

// --- Reusable Modern Glass Card ---
const GlassCard = ({ children, className = "", noHover = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={noHover ? {} : { y: -4, transition: { duration: 0.2 } }}
    className={`backdrop-blur-2xl bg-white/40 border border-white/60 rounded-[2rem] shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

// --- Minimal Info Pill ---
const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-5 bg-white/30 rounded-2xl border border-white/20 transition-all hover:bg-white/50">
    <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <div>
      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-0.5">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

// --- Minimal Booking Row ---
const BookingRow = ({ user, range, status }) => (
  <div className="flex items-center justify-between p-4 bg-white/20 hover:bg-white/40 rounded-2xl transition-all border border-transparent hover:border-white/40 group">
    <div className="flex items-center gap-4">
      <Avatar
        sx={{ width: 42, height: 42, border: "2px solid white" }}
        src={`https://i.pravatar.cc/150?u=${user}`}
      />
      <div>
        <h4 className="text-sm font-bold text-slate-800">{user}</h4>
        <p className="text-[11px] font-medium text-slate-500">{range}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Chip
        label={status}
        size="small"
        className={`text-[10px] font-black uppercase px-1 ${
          status === "Active"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-sky-100 text-sky-600"
        }`}
      />
      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
        <MoreHorizontal size={18} />
      </button>
    </div>
  </div>
);

export default function ToolDetailsPage() {
  const { id } = useParams();
  const { state: tool } = useLocation();
  const [deleting, setDeleting] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
const toolData = tool;
if (!toolData) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-slate-500 font-bold">
        Tool data not found
      </p>
    </div>
  );
}
const [isActive, setIsActive] = useState(
  toolData?.isActive ?? true
);

const [visibilityLoading, setVisibilityLoading] = useState(false);

const handleToggleVisibility = async () => {
  try {
    setVisibilityLoading(true);

    const res = await toggleToolVisibilityService(toolData._id);

    setIsActive(res.tool.isActive);

    toast.success(
      res.tool.isActive
        ? "Tool is now active"
        : "Tool is now paused"
    );
  } catch (error) {
    console.log(error);

    toast.error("Failed to update visibility");
  } finally {
    setVisibilityLoading(false);
  }
};
  

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deleteToolService(id);

      setOpenDelete(false);

      toast.success("Tool deleted successfully");

      navigate("/my-dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete tool");
    } finally {
      setDeleting(false);
    }
  };
  // ONLY CHANGED PARTS SHOWN CLEANLY — replace your return JSX with this

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-sky-100 pt-24 pb-20 px-4 md:px-10 overflow-hidden relative">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[120px]" />

      {/* 🔥 WIDTH FIX */}
      <div className="max-w-7xl mx-auto px-2 md:px-4 relative z-10 space-y-10">
        {/* BACK BUTTON */}
        <motion.button
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* 🔥 HERO CARD */}
        <GlassCard
          className="p-10 md:p-12 border-white/80 bg-white/60 shadow-[0_30px_80px_rgba(16,185,129,0.15)]"
          noHover
        >
          <div className="flex flex-col lg:flex-row gap-12">
            {/* IMAGE */}
            <div className="w-full lg:w-[55%] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.2)] h-80 lg:h-[420px]">
              <img
                src={toolData.image}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center space-y-6">
              <div>
                <p className="text-emerald-600 font-black text-[11px] uppercase tracking-widest">
                  {toolData.category}
                </p>

                <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  {toolData.name}
                </h1>

                <p className="flex items-center gap-1.5 text-slate-400 font-bold text-sm mt-1">
                  <MapPin size={14} /> {toolData.location}
                </p>
              </div>

              {/* 🔥 PRICE GRADIENT */}
              <div className="flex items-end gap-3">
                <span className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  ₹{toolData.price}
                </span>
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest pb-1">
                  / day
                </span>
              </div>

              <Chip
                label={isActive ? "Active on Marketplace" : "Paused"}
                className={`font-black text-[10px] uppercase px-2 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100"
                    : "bg-slate-200 text-slate-500"
                }`}
              />
            </div>
          </div>
        </GlassCard>

        {/* 🔥 ACTION BAR */}
        <GlassCard
          className="px-10 py-6 bg-white/60 shadow-lg border-white/70"
          noHover
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                className={`text-xs font-black uppercase tracking-widest ${isActive ? "text-emerald-600" : "text-slate-400"}`}
              >
                Visibility
              </span>
              <Switch
                checked={isActive}
               onChange={handleToggleVisibility}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: "#10b981" },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#10b981",
                  },
                }}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* EDIT */}
              <CustomButton
                variantType="primary"
                size="large"
                onClick={() =>
                  navigate(`/edit-tool/${toolData._id}`, {
                    state: toolData,
                  })
                }
                startIcon={<Edit3 size={16} />}
                sx={{
                  px: 3,
                  borderRadius: "999px",
                  letterSpacing: "0.5px",
                }}
              >
                Edit Tool
              </CustomButton>
              {/* DELETE */}
              <CustomButton
                variantType="danger"
                size="large"
                onClick={() => setOpenDelete(true)}
                startIcon={<Trash2 size={16} />}
                sx={{
                  px: 3,
                  borderRadius: "999px", // pill shape 👀
                  letterSpacing: "0.5px",
                }}
              >
                Delete Listing
              </CustomButton>
            </div>
          </div>
        </GlassCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-8">
            {/* INFO */}
            <div className="grid grid-cols-2 gap-5">
              <InfoPill
                icon={Zap}
                label="Engine Power"
                value={toolData.power ? `${toolData.power} HP` : "N/A"}
              />

              <InfoPill
                icon={Fuel}
                label="Fuel Type"
                value={toolData.fuel || "N/A"}
              />

              <InfoPill
                icon={Settings}
                label="Drive"
                value={toolData.drive || "N/A"}
              />
            </div>

            {/* DESCRIPTION */}
            <GlassCard className="p-10 bg-white/60 border-white/80" noHover>
              <h3 className="text-xl font-black text-slate-800 mb-4">
                About this tool
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {toolData.description}
              </p>
            </GlassCard>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <GlassCard
              className="p-10 h-full bg-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              noHover
            >
              <h3 className="text-xl font-black text-slate-800 mb-6">
                Bookings
              </h3>

              <div className="text-sm text-slate-400 font-medium">
  No bookings available
</div>
            </GlassCard>
          </div>
        </div>
      </div>
      {/* DELETE CONFIRM MODAL */}
      <AnimatePresence>
        {openDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="text-red-500" size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-slate-800">
                    Delete Listing?
                  </h2>

                  <p className="text-sm text-slate-400">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6">
                <p className="text-sm text-red-600 leading-relaxed">
                  Deleting this tool will permanently remove:
                </p>

                <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
                  <li>Marketplace listing</li>
                  <li>Booking history</li>
                  <li>Tool analytics & stats</li>
                  <li>Future renter access</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenDelete(false)}
                  className="px-5 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className={`px-5 py-2 rounded-xl text-white font-bold shadow-lg shadow-red-100 transition-all
${deleting ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
