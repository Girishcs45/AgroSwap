import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", hover = true, ...props }) => (
  <motion.div
    {...props}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : {}}
    className={`backdrop-blur-xl bg-white/30 border border-white/50 rounded-[2.5rem] shadow-xl ${className} ${props.onClick ? "cursor-pointer" : ""}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
