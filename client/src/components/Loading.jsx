// components/Loading.jsx

import logo from "../assets/agroswap-logo.svg";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
      
      {/* Smoky Glow */}
      <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-[100px]" />

      {/* Logo */}
      <img
        src={logo}
        alt="AgroSwap"
        className="w-32 relative animate-pulse"
      />

      {/* Loading Text */}
      <div className="mt-5 text-white text-lg font-semibold">
        Loading
        <span className="dots"></span>
      </div>
    </div>
  );
};

export default Loading;