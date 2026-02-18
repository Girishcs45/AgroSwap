import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useLocation } from 'react-router-dom';

import { 
  Save,  Trash2, Tractor, Settings, IndianRupee, 
  MapPin, Image as ImageIcon, CheckCircle2,
  Zap, Fuel, Calendar, AlertCircle
} from 'lucide-react';
import { 
  TextField, MenuItem, Select, FormControl, 
  InputLabel, RadioGroup, FormControlLabel, Radio, 
  Button, IconButton, InputAdornment, Chip, 
  Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';

// --- Shared Glass Component ---
const GlassBox = ({ children, className, noHover = true }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`backdrop-blur-xl bg-white/40 border border-white/60 rounded-[2.5rem] shadow-xl ${className}`}
  >
    {children}
  </motion.div>
);

export default function EditTool() {
  
  const navigate = useNavigate();
 
  const { state: tool } = useLocation();
const { id } = useParams();

  
  // --- States ---
  const [formData, setFormData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);


useEffect(() => {
  if (tool) {
    setFormData({
      ...tool,
      power: tool.hp,
      fuel: tool.fuelType,
      image: tool.img,
    });
  } else {
    // later fetch from backend using id
    // fetchToolById(id)
  }
}, [tool, id]);


if (!formData) return <div>Loading...</div>;

    

  
  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Logic for updating DB goes here
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        navigate('/my-tools');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-white pt-24 pb-20 px-4 md:px-10 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-800">Edit <span className="text-emerald-600">Listing</span></h1>
            <p className="text-slate-500 font-medium">Tool ID: {id || 'JD-5050D'}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate(-1)} variant="outlined" className="rounded-xl border-slate-200 text-slate-500 font-bold normal-case">Cancel</Button>
            <Button onClick={handleUpdate} variant="contained" startIcon={<Save size={18} />} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6 font-bold normal-case shadow-lg shadow-emerald-100">Save Changes</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: EDIT FORM (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. BASIC INFO */}
            <GlassBox className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Tractor size={22} className="text-emerald-500" /> Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField fullWidth label="Tool Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select name="category" value={formData.category} label="Category" onChange={handleChange}>
                    {['Tractor', 'Harvester', 'Drone', 'Sprayer', 'Rotavator'].map(cat => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <div className="col-span-full">
                  <TextField fullWidth multiline rows={3} label="Description & Condition" name="description" value={formData.description} onChange={handleChange} />
                </div>
              </div>
            </GlassBox>

            {/* 2. TECHNICAL SPECS */}
            <GlassBox className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Settings size={22} className="text-sky-500" /> Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField fullWidth label="Power (HP)" name="power" type="number" value={formData.power} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">HP</InputAdornment> }} />
                <FormControl fullWidth>
                  <InputLabel>Fuel Type</InputLabel>
                  <Select name="fuel" value={formData.fuel} label="Fuel Type" onChange={handleChange}>
                    {['Diesel', 'Petrol', 'Electric', 'Hybrid'].map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
                  </Select>
                </FormControl>
                <div className="flex items-center gap-8 bg-white/20 p-4 rounded-2xl border border-white/40">
                  <span className="text-sm font-bold text-slate-600">Drive Type:</span>
                  <RadioGroup row name="drive" value={formData.drive} onChange={handleChange}>
                    <FormControlLabel value="2WD" control={<Radio color="success" />} label="2WD" />
                    <FormControlLabel value="4WD" control={<Radio color="success" />} label="4WD" />
                  </RadioGroup>
                </div>
                <TextField fullWidth label="Year of Purchase" name="year" type="number" value={formData.year} onChange={handleChange} />
              </div>
            </GlassBox>

            {/* 3. PRICING & AVAILABILITY */}
            <GlassBox className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <IndianRupee size={22} className="text-emerald-600" /> Pricing & Availability
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-2">
                  <TextField fullWidth label="Price" name="price" value={formData.price} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
                  <FormControl className="min-w-[120px]">
                    <Select name="unit" value={formData.unit} onChange={handleChange}>
                      {['hour', 'day', 'acre'].map(u => <MenuItem key={u} value={u}>per {u}</MenuItem>)}
                    </Select>
                  </FormControl>
                </div>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
                    {['Available', 'Booked', 'Maintenance', 'Hidden'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                  </Select>
                </FormControl>
                <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><MapPin size={18} className="text-red-400" /></InputAdornment> }} />
                <FormControl fullWidth>
                   <InputLabel>Delivery Option</InputLabel>
                   <Select name="delivery" value={formData.delivery} label="Delivery Option" onChange={handleChange}>
                      <MenuItem value="Pickup Only">Pickup Only</MenuItem>
                      <MenuItem value="Delivery Available">Delivery Available</MenuItem>
                   </Select>
                </FormControl>
              </div>
            </GlassBox>

            {/* 4. IMAGES */}
            <GlassBox className="p-8">
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImageIcon size={22} className="text-indigo-500" /> Tool Media
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative group rounded-2xl overflow-hidden aspect-square">
                  <img src={formData.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <IconButton className="text-white"><Trash2 size={20} /></IconButton>
                  </div>
                </div>
                <button className="border-2 border-dashed border-slate-300 rounded-2xl aspect-square flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                  <PlusCircle size={32} />
                  <span className="text-[10px] font-bold mt-2">Add Photo</span>
                </button>
              </div>
            </GlassBox>

            {/* DANGER ZONE */}
            <div className="pt-10 flex justify-center">
               <Button onClick={() => setOpenDelete(true)} startIcon={<Trash2 size={18} />} className="text-red-500 font-bold hover:bg-red-50 rounded-xl px-6 py-3 normal-case">Delete This Listing Permanently</Button>
            </div>
          </div>

          {/* RIGHT: LIVE PREVIEW (4 COLS) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <h3 className="text-xl font-bold text-slate-800 px-2">Marketplace Preview</h3>
              <GlassBox className="overflow-hidden border-emerald-300/30">
                <div className="h-52 relative">
                  <img src={formData.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute top-4 right-4">
                    <Chip label={formData.status} size="small" className="bg-emerald-500 text-white font-black text-[10px] backdrop-blur-md" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{formData.name || "Brand Model"}</h4>
                      <p className="text-xs font-bold text-emerald-600 uppercase">{formData.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">₹{formData.price || "0"}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">per {formData.unit}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50"><Zap size={14} className="text-amber-500" /> {formData.power} HP</div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50"><Fuel size={14} className="text-blue-500" /> {formData.fuel}</div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50"><Settings size={14} className="text-indigo-500" /> {formData.drive}</div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-white/30 p-2 rounded-xl border border-white/50"><Calendar size={14} /> Year {formData.year}</div>
                  </div>
                  <div className="h-10 w-full bg-emerald-600/10 rounded-xl flex items-center justify-center text-emerald-700 font-black text-xs uppercase tracking-widest">Live View</div>
                </div>
              </GlassBox>

              <GlassBox className="p-6 bg-amber-50/20 border-amber-100">
                <div className="flex gap-3">
                  <AlertCircle className="text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-900 leading-relaxed">
                    <b>Note:</b> Changes take up to 5 minutes to reflect across all renter search results.
                  </p>
                </div>
              </GlassBox>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)} PaperProps={{ className: "rounded-[2rem] p-4 backdrop-blur-xl bg-white/80" }}>
        <DialogTitle className="font-black text-slate-800 text-2xl">Remove Listing?</DialogTitle>
        <DialogContent>
          <p className="text-slate-500">Deleting this tool will cancel any future bookings and remove all historical performance data from your dashboard. This action is irreversible.</p>
        </DialogContent>
        <DialogActions className="p-4 gap-2">
          <Button onClick={() => setOpenDelete(false)} className="text-slate-500 font-bold">Cancel</Button>
          <Button onClick={() => navigate('/my-tools')} className="bg-red-500 text-white hover:bg-red-600 font-bold px-6 rounded-xl shadow-lg shadow-red-100">Confirm Delete</Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
            <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/50">
              <CheckCircle2 className="text-emerald-400" />
              <span className="font-bold">Tool Details Updated Successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for icons
const PlusCircle = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);