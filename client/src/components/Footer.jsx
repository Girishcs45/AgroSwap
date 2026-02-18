import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, Twitter, Instagram, LinkedIn, 
  Email, Phone, LocationOn, Grass, Send 
} from '@mui/icons-material';
import { IconButton, TextField, Button } from '@mui/material';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 } 
    }
  };

  const linkVariants = {
    hover: { x: 5, color: '#059669', transition: { duration: 0.2 } }
  };

  const socialLinks = [
    { icon: <Facebook />, color: 'hover:text-blue-600' },
    { icon: <Twitter />, color: 'hover:text-sky-400' },
    { icon: <Instagram />, color: 'hover:text-pink-500' },
    { icon: <LinkedIn />, color: 'hover:text-blue-700' },
  ];

  return (
    <footer id="about" className="relative">
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="relative mt-20"
    >
      {/* Top Gradient Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50" />

      <div className="bg-white/30 backdrop-blur-xl border-t border-white/40 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.04)] px-6 pt-16 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                <Grass className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
                AgroSwap
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Empowering Farmers. Connecting Markets. <br />
              The future of agricultural trade is digital.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2, y: -2 }}>
                  <IconButton className={`bg-white/50 backdrop-blur-md shadow-sm ${social.color} transition-all`}>
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Marketplace', 'Lister Dashboard', 'Renter Marketplace', 'About Us'].map((link) => (
                <motion.li key={link} variants={linkVariants} whileHover="hover">
                  <a href={`#${link}`} className="text-slate-600 font-medium transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3. Resources */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              {['Help Center', 'FAQs', 'Blog', 'Terms & Conditions', 'Privacy Policy'].map((link) => (
                <motion.li key={link} variants={linkVariants} whileHover="hover">
                  <a href={`#${link}`} className="text-slate-600 font-medium transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 4. Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-bold mb-6">Get in Touch</h4>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center gap-3"><Email fontSize="small" className="text-emerald-500" /> support@agroswap.com</div>
              <div className="flex items-center gap-3"><Phone fontSize="small" className="text-emerald-500" /> +91-XXXXXXXXXX</div>
              <div className="flex items-center gap-3"><LocationOn fontSize="small" className="text-emerald-500" /> India</div>
            </div>
            
            <div className="relative mt-6 p-1 bg-white/40 backdrop-blur-lg border border-white/60 rounded-2xl flex items-center shadow-inner">
              <TextField 
                placeholder="Your email" 
                variant="standard" 
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  className: "px-4 py-2 text-sm"
                }}
              />
              <IconButton className="bg-emerald-600 text-white hover:bg-emerald-700 m-1 rounded-xl">
                <Send fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 AgroSwap. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            Made with <span className="animate-pulse">🌱</span> for Farmers
          </div>
        </div>
      </div>
    </motion.footer>
    </footer>
  );
};

export default Footer;