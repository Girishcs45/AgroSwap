import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import {
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

import {
  ShoppingCart,
  Menu as MenuIcon,
  Grass,
  Close,
} from "@mui/icons-material";

import {
  Package,
  ChevronRight,
  Clock3,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Profile Menu State
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = (open) => () => setMobileOpen(open);

  const navigate = useNavigate();

  const navLinks = ["Home", "Tool's Hub", "Tool's Drop", "About Us"];

  // Profile Menu Functions
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Successfully logged out");

    navigate("/");
    handleClose();
  };

  return (
    <div className="fixed top-4 w-full flex justify-center z-50 px-4">
      {/* Main Glass Container */}
      <nav
        className="w-full max-w-7xl h-16 flex items-center justify-between px-6 
        bg-white/70 backdrop-blur-md border border-white/20 
        rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
      >
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
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
                if (text === "Tool's Hub") navigate("/tools");
                if (text === "Tool's Drop") navigate("/my-dashboard");

                if (text === "About Us") {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }

                setMobileOpen(false);
              }}
              className="cursor-pointer px-4 py-2 rounded-xl text-gray-700 font-semibold 
              hover:text-green-600 hover:bg-green-50 relative group"
            >
              {text}

              {/* Glowing Underline */}
              <span
                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-500 
                transition-all duration-300 group-hover:w-full rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* History Button */}
          <IconButton
            size="small"
            className="text-gray-600 hover:bg-green-50"
            onClick={() => navigate("/history")}
          >
            <Badge color="success" overlap="circular">
              <ShoppingCart fontSize="small" />
            </Badge>
          </IconButton>

          <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block" />

          {/* Logged In */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {/* Profile Avatar */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="cursor-pointer"
              >
                <Avatar
  src={user?.profileImage}
  sx={{
    bgcolor: "#16a34a",
    width: 42,
    height: 42,
    fontWeight: "bold",

    border: "3px solid #22c55e",
    boxShadow: `
      0 0 0 3px rgba(34,197,94,0.15),
      0 8px 20px rgba(34,197,94,0.35)
    `,
  }}
>
  {!user?.profileImage &&
    user?.fullName?.charAt(0)?.toUpperCase()}
</Avatar>
              </motion.div>

              {/* Profile Dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: "18px",
                    mt: 1.5,
                    width: 280,
                    backdropFilter: "blur(20px)",
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    overflow: "hidden",
                  },
                }}
              >
                {/* TOP */}
        <div className="px-5 py-5">

          <div className="flex items-center gap-4">

            <Avatar
  src={user?.profileImage}
  sx={{
    bgcolor: "#16a34a",
    width: 75,
    height: 75,
    fontSize: 24,
    fontWeight: "bold",

    border: "4px solid #22c55e",
    boxShadow: `
      0 0 0 4px rgba(34,197,94,0.15),
      0 10px 24px rgba(34,197,94,0.35)
    `,
  }}
>
  {!user?.profileImage &&
    user?.fullName?.charAt(0)?.toUpperCase()}
</Avatar>
            <div>

              <h3 className="
                text-lg
                font-black
                text-slate-900
              ">
                {user?.fullName}
              </h3>

              <p className="
                text-sm
                text-slate-500
                mt-1
              ">
                {user?.mobile}
              </p>

              <p className="
                text-xs
                text-emerald-600
                font-black
                uppercase
                tracking-[2px]
                mt-2
              ">
                AgroSwap Member
              </p>

            </div>

          </div>

        </div>

        <Divider />

        {/* ITEMS */}
        <MenuItem
          onClick={() => {
            navigate("/my-dashboard");
            handleClose();
          }}
          className="
            !rounded-[18px]
            !py-4
            !mt-2
          "
        >

          <div className="
            flex items-center justify-between
            w-full
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-10 h-10
                rounded-[14px]
                bg-emerald-100
                flex items-center justify-center
              ">

                <Package
                  size={18}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="font-black text-slate-800">
                  My Tools
                </p>

                <p className="text-xs text-slate-500">
                  Manage your listings
                </p>

              </div>

            </div>

            <ChevronRight size={18} className="text-slate-400" />

          </div>

        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/history");
            handleClose();
          }}
          className="
            !rounded-[18px]
            !py-4
          "
        >

          <div className="
            flex items-center justify-between
            w-full
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-10 h-10
                rounded-[14px]
                bg-sky-100
                flex items-center justify-center
              ">

                <Clock3
                  size={18}
                  className="text-sky-600"
                />

              </div>

              <div>

                <p className="font-black text-slate-800">
                  Booking History
                </p>

                <p className="text-xs text-slate-500">
                  Recent rentals & orders
                </p>

              </div>

            </div>

            <ChevronRight size={18} className="text-slate-400" />

          </div>

        </MenuItem>

        <Divider className="!my-2" />

        {/* LOGOUT */}
        <MenuItem
          onClick={handleLogout}
          className="
            !rounded-[18px]
            !py-4
            hover:!bg-red-50
          "
        >

          <div className="
            flex items-center gap-3
            text-red-500
            font-black
          ">

            <div className="
              w-10 h-10
              rounded-[14px]
              bg-red-100
              flex items-center justify-center
            ">

              <LogOut size={18} />

            </div>

            Logout

          </div>

        </MenuItem>

      </Menu>
      </div>
          ) : (
            /* Not Logged In */
            <div className="hidden md:flex items-center gap-3">
              <button
                className="text-gray-600 font-semibold text-sm hover:text-green-600"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <CustomButton
                onClick={() => navigate("/signup")}
                variantType="success"
                size="small"
                sx={{
                  borderRadius: "999px",
                  px: 4,
                }}
              >
                Register
              </CustomButton>
            </div>
          )}

          {/* Mobile Toggle */}
          <IconButton className="block md:hidden" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className:
            "w-72 bg-white/80 backdrop-blur-xl border-l border-white/30",
        }}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Top */}
          <div className="flex justify-between items-center mb-10">
            <span className="font-bold text-green-600 text-xl">
              AgroSwapp
            </span>

            <IconButton onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </div>

          {/* Mobile User Info */}
          {isLoggedIn && (
            <div className="flex items-center gap-4 bg-green-50 rounded-2xl p-4 mb-6">
              <Avatar
  src={user?.profileImage}
  sx={{
    bgcolor: "#16a34a",
    width: 50,
    height: 50,
    fontWeight: "bold",
  }}
>
  {!user?.profileImage &&
    user?.fullName?.charAt(0)?.toUpperCase()}
</Avatar>

              <div>
                <h3 className="font-bold text-gray-800">
                  {user?.fullName}
                </h3>

                <p className="text-sm text-gray-500">
                 {user?.location
  ? `${user.location.village || ""}, ${user.location.district || ""}, ${user.location.state || ""}`
  : "Location not added"}
                </p>
              </div>
            </div>
          )}

          {/* Mobile Nav */}
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
                    if (text === "Tool's Hub") navigate("/tools");
                    if (text === "Tool's Drop")
                      navigate("/my-dashboard");

                    if (text === "About Us") {
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }

                    setMobileOpen(false);
                  }}
                  className="rounded-xl hover:bg-green-50"
                >
                  <ListItemText
                    primary={text}
                    className="font-semibold text-gray-700"
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* Bottom Buttons */}
          <div className="mt-auto flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 rounded-xl bg-red-500 text-white font-bold text-sm shadow-lg"
              >
                Logout
              </button>

            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="w-full py-3 rounded-xl bg-green-600 text-white font-bold text-sm shadow-lg shadow-green-100"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;