import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassCard from "../../components/GlassCard";



import {
  Plus,
  Tractor,
  MapPin,
  Calendar,
  IndianRupee,
  Zap,
  Fuel,
  Settings,
  Image as ImageIcon,
  Info,
  CheckCircle2,
  X,
  ChevronRight,
  UploadCloud,
} from "lucide-react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  IconButton,
  InputAdornment,
  Chip,
} from "@mui/material";

// --- Shared Glass Component ---


export default function AddTool() {
  const navigate = useNavigate();

  // --- Form State ---
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    unit: "per hour",
    power: "",
    fuel: "Diesel",
    drive: "4WD",
    year: "2024",
    location: "",
    availableFrom: "",
    description: "",
    image: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 Submitting Tool to AgroSwap DB:", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <>
     
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-20 px-4 md:px-10 overflow-hidden relative">
        {/* Background Decor */}
        <div className="fixed inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px]"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-black text-slate-800">
              List New Equipment
            </h1>
            <p className="text-slate-500 font-medium">
              Reach thousands of farmers by listing your tools on AgroSwap
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT: FORM FIELDS (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <GlassCard className="p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="col-span-full mb-4">
                    <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                      <Tractor size={20} className="text-emerald-500" /> Basic
                      Details
                    </h3>
                    <TextField
                      fullWidth
                      label="Tool Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      placeholder="e.g. John Deere 5050D"
                    />
                  </div>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleChange}
                    >
                      {[
                        "Tractor",
                        "Harvester",
                        "Drone",
                        "Sprayer",
                        "Rotavator",
                        "Tiller",
                        "Seeder",
                        "Baler",
                      ].map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <div className="flex gap-2">
                    <TextField
                      fullWidth
                      label="Price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">₹</InputAdornment>
                        ),
                      }}
                    />
                    <FormControl className="min-w-[120px]">
                      <Select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                      >
                        {["per hour", "per day", "per acre"].map((u) => (
                          <MenuItem key={u} value={u}>
                            {u}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  {/* Technical Specs */}
                  {/* --- Technical Specs Section (Conditional) --- */}
                  <AnimatePresence>
                    {(formData.category === "Tractor" ||
                      formData.category === "Harvester") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="col-span-full overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/20 mt-6 mb-2">
                          <div className="col-span-full">
                            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-2">
                              <Settings size={20} className="text-sky-500" />{" "}
                              Technical Specifications
                            </h3>
                          </div>

                          <TextField
                            fullWidth
                            label="Power (HP)"
                            name="power"
                            type="number"
                            value={formData.power}
                            onChange={handleChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  HP
                                </InputAdornment>
                              ),
                            }}
                          />

                          <FormControl fullWidth>
                            <InputLabel>Fuel Type</InputLabel>
                            <Select
                              name="fuel"
                              value={formData.fuel}
                              label="Fuel Type"
                              onChange={handleChange}
                            >
                              {["Diesel", "Petrol", "Electric", "Hybrid"].map(
                                (f) => (
                                  <MenuItem key={f} value={f}>
                                    {f}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                          </FormControl>

                          <div className="md:col-span-2 flex items-center gap-8 bg-white/20 p-4 rounded-2xl border border-white/40">
                            <span className="text-sm font-bold text-slate-600">
                              Drive Type:
                            </span>
                            <RadioGroup
                              row
                              name="drive"
                              value={formData.drive}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                value="2WD"
                                control={<Radio color="success" />}
                                label="2WD"
                              />
                              <FormControlLabel
                                value="4WD"
                                control={<Radio color="success" />}
                                label="4WD"
                              />
                            </RadioGroup>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <TextField
                    fullWidth
                    label="Year of Purchase"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Available From"
                    name="availableFrom"
                    type="date"
                    value={formData.availableFrom}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />

                  <div className="col-span-full">
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MapPin size={18} className="text-red-400" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="col-span-full">
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Mention tool condition, service history, and extra attachments..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="col-span-full">
                    <label className="block w-full cursor-pointer">
                      <div className="border-2 border-dashed border-emerald-300/50 bg-emerald-50/30 rounded-[2rem] p-10 flex flex-col items-center justify-center hover:bg-emerald-50/50 transition-all">
                        <UploadCloud
                          size={40}
                          className="text-emerald-500 mb-2"
                        />
                        <p className="font-bold text-slate-700">
                          Upload Tool Photos
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-gradient-to-r from-emerald-600 to-sky-600 px-12 py-4 rounded-2xl text-lg font-black normal-case shadow-xl shadow-emerald-200"
                  >
                    Submit Listing
                  </Button>
                </div>
              </GlassCard>
            </div>

            {/* RIGHT: LIVE PREVIEW (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">
                  Marketplace Preview
                </h3>
                <GlassCard className="overflow-hidden group border-emerald-300/30">
                  <div className="h-56 bg-slate-200 relative overflow-hidden">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                        <ImageIcon size={48} />
                        <p className="text-xs font-bold mt-2">
                          No Image Selected
                        </p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Chip
                        label="Available Today"
                        size="small"
                        className="bg-emerald-500 text-white font-bold backdrop-blur-md"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-black text-slate-800 leading-tight">
                          {formData.name || "Tool Brand & Model"}
                        </h4>
                        <p className="text-xs font-bold text-emerald-600 uppercase mt-1">
                          {formData.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-slate-900">
                          ₹{formData.price || "0"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">
                          {formData.unit}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl">
                        <Zap size={14} className="text-amber-500" />{" "}
                        {formData.power || "--"} HP
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl">
                        <Fuel size={14} className="text-blue-500" />{" "}
                        {formData.fuel}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl">
                        <Settings size={14} className="text-indigo-500" />{" "}
                        {formData.drive}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/30 p-2 rounded-xl">
                        <Calendar size={14} className="text-slate-500" />{" "}
                        {formData.year}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-slate-100 rounded-xl" />
                      <div className="flex-[2] h-10 bg-emerald-600/20 rounded-xl" />
                    </div>
                    <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase">
                      This is how buyers will see your tool
                    </p>
                  </div>
                </GlassCard>

                <GlassCard className="mt-6 p-6 border-sky-200/50 bg-sky-50/20">
                  <div className="flex gap-3">
                    <Info className="text-sky-600 shrink-0" />
                    <p className="text-xs text-sky-800 leading-relaxed font-medium">
                      <b>AgroSwap Tip:</b> Tools with clear images and specific
                      descriptions get 3x more rental requests. Make sure your
                      price is competitive for the {formData.location || "your"}{" "}
                      area.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </form>
        </div>

        {/* SUCCESS TOAST */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
            >
              <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50">
                <CheckCircle2 className="text-emerald-400" />
                <span className="font-bold">
                  Listing Published Successfully!
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
