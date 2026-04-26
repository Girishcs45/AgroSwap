import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TOOLS } from '../Data/Tools';

import { 
  Search, Psychology
} from '@mui/icons-material';
import { Button, TextField, InputAdornment } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  /* -------- SAFE USER -------- */
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("agroUser"));
  } catch {
    user = null;
  }

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden pt-24">

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[100px]" />
      </div>
      
      <main className="relative z-10 container mx-auto px-6">
        {/* HERO */}
        <section className="py-24 text-center">
          {user && (
            <p className="mb-4 text-slate-600 font-medium">
              Welcome back, {user.name} 👋
            </p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Rent Smart. Farm Better 🌾 <br />
            <span className="text-emerald-600">AgroSwap</span> connects farmers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Lease tools, save costs, and maximize productivity.
          </motion.p>

          {/* SEARCH */}
          <div className="w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl flex gap-2 p-2 mb-8">
            <TextField
              fullWidth
              placeholder="Search tools..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-emerald-500 ml-2" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6"
            >
              Search
            </CustomButton>
          </div>
        </section>

        {/* TOOLS */}
        <section className="py-5">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
            Available Tools 🚜
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TOOLS.filter((t) => t.status !== "Booked")
              .slice(0, 4)
              .map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() =>
                    navigate(`/tooldetails/${tool.id}`, { state: tool })
                  }
                >
                  <img
                    src={tool.img}
                    alt={tool.name}
                    className="w-full h-40 object-cover rounded-xl mb-3"
                  />

                  <div className="flex justify-between mb-2">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                      Available
                    </span>
                    <span className="text-xs text-amber-500 font-bold">
                      ⭐ 4.5
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-800">{tool.name}</h3>

                  <p className="text-sm text-slate-500 mb-2">
                    {tool.location?.address || "Nearby"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-bold">
                      ₹{tool.price}/{tool.unit}
                    </span>

                    <CustomButton
                      variantType="success"
                      size="small"
                      sx={{
                        borderRadius: "999px",
                        px: 4,
                      }}
                    >
                      view
                    </CustomButton>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              onClick={() => navigate("/renter")}
              className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl"
            >
              Explore Tools
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/add-tool")}
              className="px-6 py-3 rounded-xl"
            >
              List Your Tool
            </Button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 text-center">
          {[
            { label: "Tools Listed", value: "200+" },
            { label: "Farmers", value: "150+" },
            { label: "Bookings", value: "500+" },
            { label: "Cities", value: "10+" },
          ].map((item, i) => (
            <div key={i} className="bg-white/40 rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold text-emerald-600">{item.value}</h3>
              <p className="text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </section>

        {/* TOOLS */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-slate-800">
            Available Tools 🚜
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TOOLS.filter(t => t.status !== "Booked").slice(0, 4).map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white/40 backdrop-blur-lg border border-white/50 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => navigate(`/tooldetails/${tool.id}`, { state: tool })}
              >
                <img
                  src={tool.img}
                  alt={tool.name}
                  className="w-full h-40 object-cover rounded-xl mb-3"
                />

                <div className="flex justify-between mb-2">
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg">
                    Available
                  </span>
                  <span className="text-xs text-amber-500 font-bold">⭐ 4.5</span>
                </div>

                <h3 className="font-bold text-slate-800">{tool.name}</h3>

                <p className="text-sm text-slate-500 mb-2">
                  {tool.location?.address || "Nearby"}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">
                    ₹{tool.price}/{tool.unit}
                  </span>

                  <Button size="small" className="bg-emerald-500 text-white rounded-xl">
                    View
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="contained"
              onClick={() => navigate("/renter")}
              className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-xl"
            >
              View All Tools
            </Button>
          </div>
        </section>
            
        {/* WHY AGROSWAP */}
        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose AgroSwap?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Save Money 💰", desc: "Rent tools instead of buying expensive machinery." },
              { title: "Easy Booking ⚡", desc: "Quick and hassle-free rentals." },
              { title: "Farmer Network 🌾", desc: "Connect directly with farmers." },
            ].map((item, i) => (
              <div key={i} className="bg-white/40 rounded-2xl p-6 shadow text-center">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* VISION */}
        <section className="bg-emerald-900 text-white rounded-3xl p-16 mb-32">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-2">
            <Psychology /> Our Vision
          </h2>
          <p className="max-w-2xl text-emerald-100">
            To digitize agriculture and empower every farmer with fair access and opportunities.
          </p>
        </section>

        {/* VISION */}

        <section className="py-16 px-4 mb-24">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white relative overflow-hidden"
            >
              {/* 🔥 Background Glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                {/* LEFT CONTENT */}
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3">
                    <Psychology className="text-white/90" fontSize="large" />
                    Our Vision
                  </h2>

                  <p className="text-white/80 mb-6 leading-relaxed">
                    To digitize agriculture and empower every farmer with fair
                    access, transparency, and equal opportunities across
                    markets. We aim to bridge the gap between rural producers
                    and modern digital systems.
                  </p>
                </div>

                {/* RIGHT VISUAL */}
                <div className="hidden md:flex items-center justify-center">
                  <div className="relative">
                    {/* Optional highlight points */}
                    <div className="space-y-2 text-white/80 text-sm">
                      <p>🌱 Empower farmers with digital tools</p>
                      <p>🚜 Increase income through smart access</p>
                      <p>🌍 Build a transparent agricultural ecosystem</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom strip */}
              <div className="relative z-10 mt-8 pt-3 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-white/80 text-sm">
                  🌾 Driving the future of digital farming
                </p>
                <p className="text-white font-semibold text-sm flex items-center gap-1">
                  Innovation meets agriculture
                  <span>🚀</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;