import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "../../components/GlassCard";
import { TOOLS } from "../../Data/Tools";
import { useEffect } from "react";
import {
  Tractor,
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Settings,
  Zap,
  Fuel,
  Calendar,
  Star,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  Chip,
  Switch,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";




// --- Dummy Data ---


export default function MyTools() {
  const navigate = useNavigate();
  
    const user = JSON.parse(localStorage.getItem("agroUser"));
    useEffect(() => {
    if (!user || user.role !== "lister") {
      navigate("/login",{ replace: true });
    }
  }, [navigate,user]);
  const myTools = TOOLS.filter(tool => tool.ownerId === user?.id);
  
  const [tools, setTools] = useState(myTools);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);

  
  // --- Logic ---
  const filteredTools = tools.filter(
  (t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) &&
    (categoryFilter === "All" || t.category === categoryFilter)
);


  const handleDelete = () => {
    setTools(tools.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const toggleStatus = (id) => {
    setTools(
      tools.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Hidden" ? "Available" : "Hidden" }
          : t,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-20 px-4 md:px-10 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 1. HEADER & STATS BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h1 className="text-4xl font-black text-slate-800">My Inventory</h1>
            <p className="text-slate-500 font-medium italic">
              Manage and monitor your farming fleet
            </p>
          </motion.div>
          <Button
            onClick={() => navigate("/add-tool")}
            variant="contained"
            startIcon={<Plus />}
            className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-8 py-3 font-bold normal-case shadow-lg shadow-emerald-200"
          >
            Add New Tool
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              label: "Total Tools",
              val: tools.length,
              icon: <Tractor />,
              color: "text-emerald-600",
            },
            {
              label: "Active Rentals",
              val: "02",
              icon: <CheckCircle2 />,
              color: "text-sky-600",
            },
            {
              label: "Monthly Earnings",
              val: "₹42k",
              icon: <TrendingUp />,
              color: "text-orange-600",
            },
            {
              label: "Under Repair",
              val: "01",
              icon: <Settings />,
              color: "text-red-500",
            },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-6 text-center" noHover>
              <div className={`${stat.color} mb-2 flex justify-center`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* 2. SEARCH & FILTERS ROW */}
        <GlassCard className="p-4 mb-8" noHover>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TextField
              placeholder="Search tool name..."
              variant="standard"
              className="px-4 border-r border-slate-200"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <Search size={18} className="mr-2 text-slate-400" />
                ),
              }}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl
              fullWidth
              variant="standard"
              className="px-4 border-r border-slate-200"
            >
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                disableUnderline
              >
                {[
                  "All",
                  "Tractor",
                  "Drone",
                  "Harvester",
                  "Tiller",
                  "Sprayer",
                ].map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex items-center px-4 text-slate-400 italic text-sm">
              <Filter size={16} className="mr-2" /> Sorting by: Recently Added
            </div>
            <div className="flex justify-end pr-4">
              <span className="text-xs font-bold text-slate-400 uppercase self-center">
                {filteredTools.length} results
              </span>
            </div>
          </div>
        </GlassCard>

        {/* 3. TOOL GRID */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredTools.map((tool) => (
                <GlassCard key={tool.id} className="group relative">
                  {/* Tool Image */}
                  <div className="h-52 relative overflow-hidden">
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Chip
                        label={tool.status}
                        size="small"
                        className={`font-black text-[10px] backdrop-blur-md ${
                          tool.status === "Available"
                            ? "bg-emerald-500/80 text-white"
                            : tool.status === "Booked"
                              ? "bg-sky-500/80 text-white"
                              : "bg-red-500/80 text-white"
                        }`}
                      />
                    </div>

                    {/* 4. HOVER ACTIONS OVERLAY */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <Tooltip title="View Details">
                        <IconButton
                          onClick={() => navigate(`/tooldetails/${tool.id}`, { state: tool })}
                          className="bg-white/20 text-white hover:bg-emerald-500"
                        >
                          <Eye />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Tool">
                        <IconButton
                         onClick={() => navigate(`/edit-tool/${tool.id}`, { state: tool })}

                          className="bg-white/20 text-white hover:bg-sky-500"
                        >
                          <Edit3 />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Tool">
                        <IconButton
                          onClick={() => setDeleteId(tool.id)}
                          className="bg-white/20 text-white hover:bg-red-500"
                        >
                          <Trash2 />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-slate-800">
                          {tool.name}
                        </h4>
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">
                          {tool.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black text-slate-900">
                          ₹{tool.price}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          per {tool.unit}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50">
                        <Zap size={14} className="text-amber-500" /> {tool.hp}{" "}
                        HP
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50">
                        <Fuel size={14} className="text-sky-500" /> {tool.fuelType}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50">
                        <Settings size={14} className="text-indigo-500" />{" "}
                        {tool.drive}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50">
                        <Star
                          size={14}
                          className="text-amber-400"
                          fill="currentColor"
                        />{" "}
                        {tool.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-400">
                          Listed Status
                        </span>
                        <Switch
                          checked={tool.status !== "Hidden"}
                          onChange={() => toggleStatus(tool.id)}
                          color="success"
                          size="small"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 italic">
                        Added {tool.year}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* 5. EMPTY STATE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <GlassCard className="max-w-md mx-auto p-12" noHover>
              <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                <Package size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                No tools found
              </h3>
              <p className="text-slate-500 mb-8">
                Try adjusting your filters or list a new piece of equipment.
              </p>
              <Button
                onClick={() => navigate("/add-tool")}
                variant="outlined"
                className="border-emerald-500 text-emerald-600 font-bold rounded-xl"
              >
                + Add Your First Tool
              </Button>
            </GlassCard>
          </motion.div>
        )}

        {/* 6. DELETE CONFIRMATION DIALOG */}
        <Dialog
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          PaperProps={{
            className: "rounded-[2rem] p-4 backdrop-blur-xl bg-white/80",
          }}
        >
          <DialogTitle className="font-black text-slate-800 text-2xl">
            Delete Listing?
          </DialogTitle>
          <DialogContent>
            <p className="text-slate-500">
              Are you sure you want to remove this tool? This action cannot be
              undone and will cancel any future bookings.
            </p>
          </DialogContent>
          <DialogActions className="p-4 gap-2">
            <Button
              onClick={() => setDeleteId(null)}
              className="text-slate-500 font-bold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600 font-bold px-6 rounded-xl shadow-lg shadow-red-100"
            >
              Delete Permanently
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
