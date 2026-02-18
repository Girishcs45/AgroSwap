import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';





import { 
  Search, Agriculture, ShoppingBasket, ArrowForward,
  Psychology
} from '@mui/icons-material';
import { Button, TextField, InputAdornment } from '@mui/material';


// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
// };

const Home = () => {
  const navigate = useNavigate();  
  const user = JSON.parse(localStorage.getItem("agroUser"));

  
  return (
    <>

    
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden pt-24">

      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6">

        {/* HERO */}
        <section className="py-20 text-center">
          <motion.h1 
            initial="hidden" animate="visible" 
            className="text-5xl md:text-7xl font-extrabold mb-6"
          >
            AgroSwap – Empowering <span className="text-green-600">Farmers</span>,<br/>
            Connecting <span className="text-sky-600">Markets</span>
          </motion.h1>

          <motion.p 
            initial="hidden" animate="visible"
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            List your tools . Rent what you need. 
          </motion.p>

          <div className="w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl flex gap-2 p-2 mb-12">
            <TextField 
              fullWidth
              placeholder="Search tools, crops, location..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className="text-emerald-500 ml-2" />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6">
              Search
            </Button>
          </div>

         <div className="flex justify-center gap-6">
  {!user && (
    <>
      <Button
        className="bg-slate-900 text-white px-8 py-4 rounded-2xl"
        onClick={() => navigate("/login")}
      >
        <Agriculture className="mr-2 text-emerald-400" /> Lister Dashboard
      </Button>

      <Button
        className="bg-white border px-8 py-4 rounded-2xl"
        onClick={() => navigate("/login")}
      >
        <ShoppingBasket className="mr-2 text-sky-500" /> Renter Marketplace
      </Button>
    </>
  )}

  {user?.role === "lister" && (
    <Button
      className="bg-slate-900 text-white px-8 py-4 rounded-2xl"
      onClick={() => navigate("/lister")}
    >
      <Agriculture className="mr-2 text-emerald-400" /> Lister Dashboard
    </Button>
  )}

  {user?.role === "renter" && (
    <Button
      className="bg-white border px-8 py-4 rounded-2xl"
      onClick={() => navigate("/renter")}
    >
      <ShoppingBasket className="mr-2 text-sky-500" /> Renter Marketplace
    </Button>
  )}
</div>

          
        </section>

        {/* ROLE CARDS */}
        <section className="grid md:grid-cols-2 gap-10 py-20">
          {[
            {
              title: "Lister Dashboard",
              icon: <Agriculture fontSize="large" />,
              features: [ "List Tools", "Set Pricing", "Track Earnings"]
            },
            {
              title: "Renter Marketplace",
              icon: <ShoppingBasket fontSize="large" />,
              features: ["Search Tools", "Hourly Rental",  "Track Orders"]
            }
          ].map((role, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-3xl bg-white/30 backdrop-blur-md border border-white/60 shadow-xl"
            >
              <div className="w-16 h-16 bg-emerald-500 text-white flex items-center justify-center rounded-2xl mb-6">
                {role.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">{role.title}</h3>
              <ul className="space-y-2 mb-6 text-slate-600">
                {role.features.map(f => <li key={f}>• {f}</li>)}
              </ul>
              <Button 
  endIcon={<ArrowForward />} 
  className="text-emerald-600 font-bold"
  onClick={() => navigate(role.title === "Lister Dashboard" ? "/lister" : "/renter")}
>
  Open
</Button>


            </motion.div>
          ))}
        </section>

        {/* IMPACT SECTION */}
        <section className="bg-emerald-900 text-white rounded-3xl p-16 mb-32">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-2">
            <Psychology /> Our Vision
          </h2>
          <p className="max-w-2xl text-emerald-100">
            To digitize agriculture and empower every farmer with global access and fair trade.
          </p>
        </section>

      </main>
    </div>
    
    </>
  );
};

export default Home;
