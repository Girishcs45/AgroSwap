import React, { useState } from 'react';
import { motion } from "framer-motion";

import { 
   IconButton, Badge,   
   Drawer, List, ListItem, ListItemText, 
} from '@mui/material';
import {
  Search, ShoppingCart, Notifications, Menu as MenuIcon, 
  Grass, Close, 
} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("agroUser"));
const isLoggedIn = !!user;

  const [mobileOpen, setMobileOpen] = useState(false);  
  const toggleDrawer = (open) => () => setMobileOpen(open);
  const navigate = useNavigate();  

 const navLinks = [
  'Home',
  'Tools for Rent',
  ...(user?.role === "lister" ? ['Lister'] : []),
  ...(user?.role === "renter" ? ['Renter'] : []),
  'About Us'
];

  return (
  
    <div className="fixed top-4 w-full flex justify-center z-50 px-4">
      {/* Main Glass Container */}
      <nav className="w-full max-w-7xl h-16 flex items-center justify-between px-6 
                      bg-white/70 backdrop-blur-md border border-white/20 
                      rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
            <Grass className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent tracking-tight">
            AgroSwapp
          </span>
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
  {navLinks.map((text) => (
    <motion.div
      key={text}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => {
        if (text === "Home") navigate("/");
        if (text === "Tools for Rent") navigate("/tools");
       if (text === "Renter") {
  user ? navigate("/renter") : navigate("/login");
}
if (text === "Lister") {
  user ? navigate("/lister") : navigate("/login");
}

        if (text === "About Us") {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
      }}
      className="cursor-pointer px-4 py-2 rounded-xl text-gray-700 font-semibold 
                 hover:text-green-600 hover:bg-green-50 relative group"
    >
      {text}

      {/* glowing underline */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 
                       transition-all duration-300 group-hover:w-full rounded-full" />
    </motion.div>
  ))}
</div>


        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <IconButton size="small" className="text-gray-600 hover:bg-green-50">
            <Search fontSize="small" />
          </IconButton>

          <IconButton size="small" className="text-gray-600 hover:bg-green-50">
            <Badge badgeContent={2} color="success" overlap="circular">
              <ShoppingCart fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton size="small" className="text-gray-600 hover:bg-green-50">
            <Badge variant="dot" color="success">
              <Notifications fontSize="small" />
            </Badge>
          </IconButton>

          <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block" />

          {isLoggedIn ? (
  <div className="flex items-center gap-3">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-xl text-sm font-bold
                 bg-red-50 text-red-600 border border-red-200
                 hover:bg-red-100 hover:shadow-lg hover:shadow-red-200
                 transition-all"
      onClick={() => {
        localStorage.removeItem("agroUser");
        navigate("/");
      }}
    >
      Logout
    </motion.button>
  </div>
) : (

  <div className="hidden md:flex items-center gap-3">
    <button
      className="text-gray-600 font-semibold text-sm hover:text-green-600"
      onClick={() => navigate("/login")}
    >
      Login
    </button>
    <button
      className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold "
      onClick={() => navigate("/signup")}
    >
      Register
    </button>
  </div>
)}


          {/* Mobile Toggle */}
          <IconButton className="md:hidden" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </nav>

      {/* Mobile Glass Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className: "w-72 bg-white/80 backdrop-blur-xl border-l border-white/30"
        }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold text-green-600 text-xl">AgroSwapp</span>
            <IconButton onClick={toggleDrawer(false)}><Close /></IconButton>
          </div>
          <List className="space-y-4">
            {navLinks.map((text) => (
  <motion.div
    key={text}
    whileHover={{ x: 6 }}
    whileTap={{ scale: 0.95 }}
  >
    <ListItem 
      button
      onClick={() => {
        if (text === "Home") navigate("/");
        if (text === "Tools for Rent") navigate("/tools");
        if (text === "Renter") navigate("/renter");
        if (text === "Lister") navigate("/lister");
        if (text === "About Us") {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }
        setMobileOpen(false);
      }}
      className="rounded-xl hover:bg-green-50"
    >
      <ListItemText primary={text} className="font-semibold text-gray-700" />
    </ListItem>
  </motion.div>
))}


          </List>
          <div className="mt-auto flex flex-col gap-3">
            <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm">Login</button>
            <button className="w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-100">Register</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;