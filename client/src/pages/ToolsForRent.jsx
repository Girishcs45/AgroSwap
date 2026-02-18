import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Star, Filter, ArrowRight, Tractor, Droplets, Gauge,
   Wheat, Cog, Wrench , Sprout,Target ,Grip} from 'lucide-react';
import { Chip, Avatar, Button, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GlassCard from "../components/GlassCard";
import { TOOLS } from '../Data/Tools';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';
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
const ToolCard = ({ tool, navigate }) => (  
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative group"
  >
    <GlassCard className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-2xl group-hover:border-green-300/50">
      {/* Tool Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={tool.img} alt={tool.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute top-3 right-3">
          <Chip 
            label={tool.status} 
            size="small" 
            className={`${tool.status === 'Available Today' ? 'bg-green-500/80' : 'bg-orange-500/80'} text-white backdrop-blur-md`} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
          <div className="flex items-center text-amber-500 font-bold">
            <Star size={16} fill="currentColor" />
            <span className="ml-1 text-sm">{tool.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-slate-600 text-sm mb-4 space-x-3">
          <div className="flex items-center"><MapPin size={14} className="mr-1" /> {tool.location.address}</div>
          <div className="flex items-center font-semibold text-green-700">₹{tool.price}/{tool.unit}</div>
        </div>

        <div className="flex items-center space-x-2 p-2 bg-white/20 rounded-xl mb-5">
          <Avatar sx={{ width: 24, height: 24 }} />
          <span className="text-xs text-slate-700 font-medium">Owned by {tool.ownerName}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
  className="py-2 px-4 rounded-xl border border-green-600/30 text-green-700 font-semibold hover:bg-green-600/10 transition-colors"
  onClick={() => navigate(`/tooldetails/${tool.id}`, { state: tool })}
>
  Details
</button>

          <button className="py-2 px-4 rounded-xl bg-green-600 text-white font-semibold shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
            Rent Now
          </button>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// --- Main Page Component ---

export default function ToolsForRent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
const filteredTools =
  selectedCategory === "All"
    ? TOOLS
    : TOOLS.filter(tool => tool.category === selectedCategory);


  const navigate = useNavigate();  
  return (
    <>
   
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-sky-50 to-emerald-100 pt-20 pb-12 px-4 md:px-8 overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-green-200/40 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* 1. Hero Section */}
        <section className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-800 mb-4"
          >
            Rent Farming Tools <span className="text-green-600">Near You</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 mb-8"
          >
            Affordable, reliable tools directly from farmers in your community.
          </motion.p>

          <GlassCard className="max-w-4xl mx-auto p-3 md:p-4 rounded-3xl shadow-xl">
  <div className="flex flex-col md:flex-row items-center gap-3">

    {/* Tool Search */}
    <div className="flex items-center bg-white/70 rounded-2xl px-4 py-3 flex-1 shadow-inner">
      <Search className="text-slate-400 mr-2" size={18} />
      <input
        type="text"
        placeholder="Search tool (Tractor, Drone, Harvester...)"
        className="bg-transparent outline-none w-full text-sm font-medium text-slate-700 placeholder-slate-400"
      />
    </div>

    {/* Location */}
    <div className="flex items-center bg-white/70 rounded-2xl px-4 py-3 flex-1 shadow-inner">
      <MapPin className="text-slate-400 mr-2" size={18} />
      <input
        type="text"
        placeholder="Enter village / city"
        className="bg-transparent outline-none w-full text-sm font-medium text-slate-700 placeholder-slate-400"
      />
    </div>

    {/* Date */}
    <div className="flex items-center bg-white/70 rounded-2xl px-4 py-3 shadow-inner">
      <Calendar className="text-slate-400 mr-2" size={18} />
      <input
        type="date"
        className="bg-transparent outline-none text-sm font-medium text-slate-600"
      />
    </div>

    {/* Search Button */}
<button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-md">
      <SearchIcon />
    </button>

  </div>
</GlassCard>

        </section>

        {/* 2. Categories */}
        <section className="mb-12">
          <div className="flex overflow-x-auto pb-4 space-x-4 no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat, idx) => (
  <motion.button
    key={idx}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setSelectedCategory(cat.key)}
    className={`flex items-center space-x-2 px-6 py-3 backdrop-blur-md border rounded-full shadow-sm whitespace-nowrap transition-all font-medium
      ${selectedCategory === cat.key 
        ? "bg-green-600 text-white border-green-600" 
        : "bg-white/40 text-slate-700 border-white/60 hover:bg-green-500 hover:text-white"}
    `}
  >
    {cat.icon} <span>{cat.name}</span>
  </motion.button>
))}

          </div>
        </section>

        {/* 3. Tool Grid */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Available Tools</h2>
            <button className="flex items-center text-green-700 font-semibold hover:underline">
              Filters <Filter size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
  <ToolCard key={tool.id} tool={tool} navigate={navigate} />
))}
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="mb-24">
          <h2 className="text-center text-3xl font-bold text-slate-800 mb-12">Simple 4-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Search Tool", desc: "Browse local listings", icon: <Search /> },
              { step: "02", title: "Select Date", desc: "Choose your schedule", icon: <Calendar /> },
              { step: "03", title: "Book & Pay", desc: "Secure online payment", icon: <Gauge /> },
              { step: "04", title: "Get Delivered", desc: "Tool arrives at farm", icon: <Tractor /> }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/50 backdrop-blur-md flex items-center justify-center text-green-600 shadow-inner border border-white/40">
                  {item.icon}
                </div>
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12 text-center bg-gradient-to-r from-green-600/20 to-sky-600/20 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">List Your Tools & Earn More</h2>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">Join hundreds of farmers turning their idle equipment into a steady stream of passive income.</p>
              <Button 
                variant="contained" 
                size="large"
                className="bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-2xl normal-case text-lg font-bold"
                endIcon={<ArrowRight />}
              >
                Go to Lister Dashboard
              </Button>
            </div>
            {/* Abstract Shape for CTA */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />
          </GlassCard>
        </motion.div>

      </div>
    </div>
    
    </>
  );
}
