import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CustomButton from "../../components/CustomButton";

import {
  updateToolService,
  deleteToolService,
} from "../../services/tool.services";

import {
  Save,
  Trash2,
  Tractor,
  Settings,
  IndianRupee,
  MapPin,
  Image as ImageIcon,
  CheckCircle2,
  Zap,
  Fuel,
  AlertCircle,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";


// ---------------- GLASS BOX ----------------

const GlassBox = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`
      bg-white/80
      backdrop-blur-2xl
      border border-white
      rounded-[36px]
      shadow-[0_10px_50px_rgba(15,23,42,0.08)]
      overflow-hidden
      ${className}
    `}
  >
    {children}
  </motion.div>
);


// ---------------- PAGE ----------------

export default function EditTool() {

  const navigate = useNavigate();

  const { state: tool } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (tool) {
      setFormData({
        ...tool,
        power: tool.power,
        fuel: tool.fuel,
        image: tool.image,
      });
    }
  }, [tool]);

  if (!formData) {
    return (
      <div className="
        min-h-screen
        flex items-center justify-center
        bg-[#f6f9f8]
      ">
        Loading...
      </div>
    );
  }

  // ---------------- CHANGE HANDLER ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- UPDATE ----------------

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const updatedData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        power: formData.power,
        fuel: formData.fuel,
        drive: formData.drive,
        price: formData.price,
        status: formData.status,
        location: formData.location,
        image: formData.image,
      };

      await updateToolService(id, updatedData);

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/my-dashboard");
      }, 2000);

    } catch (error) {
      console.log(error);
      alert("Failed to update tool");
    }
  };

  return (

    <div className="
      min-h-screen
      bg-[#f6f9f8]
      pt-24
      pb-24
      px-4 md:px-8
      overflow-hidden
      relative
    ">

      {/* TOP GRADIENT */}
      <div className="
        absolute top-0 inset-x-0
        h-[420px]
        bg-gradient-to-b from-emerald-100/40 to-transparent
        pointer-events-none
      " />

      {/* BG BLOBS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="
            absolute top-[-120px] left-[-120px]
            w-[420px] h-[420px]
            bg-emerald-300/20
            rounded-full blur-[120px]
          "
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          className="
            absolute bottom-[-120px] right-[-120px]
            w-[360px] h-[360px]
            bg-sky-300/20
            rounded-full blur-[120px]
          "
        />

      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-12">

          <div>

            <h1 className="
              text-5xl md:text-6xl
              font-black
              tracking-tight
              text-slate-900
              leading-[1]
            ">
              Edit
              <span className="text-emerald-600">
                {" "}Listing
              </span>
            </h1>

            <p className="
              text-slate-500
              font-semibold
              mt-3
            ">
              Tool ID: {id || "JD-5050D"}
            </p>

          </div>

        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-8">

            {/* BASIC INFO */}
            <GlassBox className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <Tractor size={24} className="text-emerald-500" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                <TextField
                  fullWidth
                  label="Tool Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

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
                    ].map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>

                <div className="col-span-full">

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description & Condition"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </GlassBox>

            {/* TECHNICAL */}
            <GlassBox className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <Settings size={24} className="text-sky-500" />
                Technical Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

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
                    {["Diesel", "Petrol", "Electric", "Hybrid"].map((f) => (
                      <MenuItem key={f} value={f}>
                        {f}
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>

                <div className="
                  flex items-center gap-8
                  bg-slate-50
                  p-5
                  rounded-[28px]
                  border border-slate-100
                ">

                  <span className="font-black text-slate-600">
                    Drive Type
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

            </GlassBox>

            {/* PRICING */}
            <GlassBox className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <IndianRupee size={24} className="text-emerald-600" />
                Pricing & Availability
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                <div className="flex gap-3">

                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          ₹
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl className="min-w-[130px]">

                    <Select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                    >
                      {["hour", "day", "acre"].map((u) => (
                        <MenuItem key={u} value={u}>
                          per {u}
                        </MenuItem>
                      ))}
                    </Select>

                  </FormControl>

                </div>

                <FormControl fullWidth>

                  <InputLabel>Status</InputLabel>

                  <Select
                    name="status"
                    value={formData.status}
                    label="Status"
                    onChange={handleChange}
                  >
                    {[
                      "Available",
                      "Booked",
                      "Maintenance",
                      "Hidden",
                    ].map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>

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

            </GlassBox>

            {/* IMAGES */}
            <GlassBox className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <ImageIcon size={24} className="text-indigo-500" />
                Tool Media
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {/* IMAGE */}
                <div className="
                  relative group
                  rounded-[28px]
                  overflow-hidden
                  aspect-square
                  shadow-lg
                ">

                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <div className="
                    absolute inset-0
                    bg-black/40
                    opacity-0
                    group-hover:opacity-100
                    transition-all duration-300
                    flex items-center justify-center
                  ">

                    <IconButton className="!text-white">
                      <Trash2 size={20} />
                    </IconButton>

                  </div>

                </div>

                {/* ADD PHOTO */}
                <button className="
                  border-2 border-dashed border-slate-200
                  rounded-[28px]
                  aspect-square
                  flex flex-col items-center justify-center
                  text-slate-400
                  hover:border-emerald-400
                  hover:text-emerald-600
                  hover:bg-emerald-50/50
                  transition-all duration-300
                ">

                  <PlusCircle size={34} />

                  <span className="text-[11px] font-black mt-3">
                    Add Photo
                  </span>

                </button>

              </div>

            </GlassBox>

            {/* DELETE */}
            <div className="pt-8 flex justify-center">

              <Button
                onClick={() => setOpenDelete(true)}
                startIcon={<Trash2 size={18} />}
                className="
                  !text-red-500
                  !font-black
                  hover:!bg-red-50
                  !rounded-[20px]
                  !px-7
                  !py-3
                  !normal-case
                "
              >
                Delete This Listing Permanently
              </Button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">

            <div className="sticky top-28 space-y-6">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                px-2
              ">
                Marketplace Preview
              </h3>

              {/* PREVIEW */}
              <GlassBox className="
                overflow-hidden
                border border-emerald-100
              ">

                {/* IMAGE */}
                <div className="h-60 relative overflow-hidden">

                  <img
                    src={formData.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-black/40 to-transparent
                  " />

                  <div className="absolute top-5 right-5">

                    <Chip
                      label={formData.status}
                      size="small"
                      className="
                        !bg-emerald-500/95
                        !text-white
                        !font-black
                        !text-[10px]
                        backdrop-blur-xl
                      "
                    />

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-7">

                  <div className="flex justify-between items-start mb-5">

                    <div>

                      <h4 className="
                        text-2xl
                        font-black
                        tracking-tight
                        text-slate-900
                      ">
                        {formData.name || "Tool Name"}
                      </h4>

                      <p className="
                        text-[11px]
                        font-black
                        text-emerald-600
                        uppercase
                        tracking-[3px]
                        mt-1
                      ">
                        {formData.category}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="
                        text-4xl
                        font-black
                        tracking-tight
                        text-slate-900
                      ">
                        ₹{formData.price || "0"}
                      </p>

                      <p className="
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-slate-400
                        font-black
                      ">
                        per {formData.unit}
                      </p>

                    </div>

                  </div>

                  {/* SPECS */}
                  <div className="grid grid-cols-2 gap-3 mb-7">

                    <div className="
                      flex items-center gap-2
                      text-[11px]
                      font-black
                      text-slate-600
                      bg-slate-50
                      p-3
                      rounded-[20px]
                      border border-slate-100
                    ">
                      <Zap size={14} className="text-amber-500" />
                      {formData.power} HP
                    </div>

                    <div className="
                      flex items-center gap-2
                      text-[11px]
                      font-black
                      text-slate-600
                      bg-slate-50
                      p-3
                      rounded-[20px]
                      border border-slate-100
                    ">
                      <Fuel size={14} className="text-blue-500" />
                      {formData.fuel}
                    </div>

                    <div className="
                      flex items-center gap-2
                      text-[11px]
                      font-black
                      text-slate-600
                      bg-slate-50
                      p-3
                      rounded-[20px]
                      border border-slate-100
                    ">
                      <Settings size={14} className="text-indigo-500" />
                      {formData.drive}
                    </div>

                  </div>

                  {/* LIVE */}
                  <div className="
                    h-12
                    w-full
                    rounded-[20px]
                    bg-gradient-to-r from-emerald-500 to-green-600
                    flex items-center justify-center
                    text-white
                    font-black
                    text-xs
                    uppercase
                    tracking-[3px]
                    shadow-[0_15px_35px_rgba(16,185,129,0.28)]
                  ">
                    Live View
                  </div>

                </div>

              </GlassBox>

              {/* NOTE */}
              <GlassBox className="
                p-6
                bg-amber-50/70
                border border-amber-100
              ">

                <div className="flex gap-4">

                  <AlertCircle className="text-amber-600 shrink-0" />

                  <p className="
                    text-sm
                    text-amber-900
                    leading-relaxed
                  ">
                    <b>Note:</b> Changes may take a few minutes to reflect across
                    all renter search results.
                  </p>

                </div>

              </GlassBox>

              {/* BUTTONS */}
              <div className="
                hidden md:flex
                items-center justify-center
                gap-4
              ">

                <CustomButton
                  variantType="danger"
                  size="large"
                  onClick={() => navigate(-1)}
                  sx={{
                    px: 4,
                    borderRadius: "20px",
                    height: "56px",
                    fontWeight: "800",
                  }}
                >
                  Cancel
                </CustomButton>

                <CustomButton
                  variantType="success"
                  size="large"
                  onClick={handleUpdate}
                  startIcon={<Save size={18} />}
                  sx={{
                    px: 5,
                    borderRadius: "20px",
                    height: "56px",
                    fontWeight: "800",
                    boxShadow: "0 15px 35px rgba(16,185,129,0.28)",
                  }}
                >
                  Save Changes
                </CustomButton>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* DELETE MODAL */}
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          className: `
            !rounded-[36px]
            !p-4
            backdrop-blur-2xl
            !bg-white/90
            border border-white
            shadow-[0_20px_70px_rgba(0,0,0,0.08)]
          `,
        }}
      >

        <DialogTitle className="
          !font-black
          !text-slate-900
          !text-3xl
        ">
          Remove Listing?
        </DialogTitle>

        <DialogContent>

          <p className="text-slate-500 leading-relaxed">
            Deleting this tool will remove it permanently from AgroSwap.
            This action cannot be undone.
          </p>

        </DialogContent>

        <DialogActions className="!p-5 !gap-3">

          <Button
            onClick={() => setOpenDelete(false)}
            className="!text-slate-500 !font-black"
          >
            Cancel
          </Button>

          <Button
            onClick={async () => {
              try {
                await deleteToolService(id);
                navigate("/my-dashboard");
              } catch (error) {
                console.log(error);
                alert("Delete failed");
              }
            }}
            className="
              !bg-red-500
              hover:!bg-red-600
              !text-white
              !font-black
              !px-7
              !py-3
              !rounded-[18px]
              !shadow-[0_15px_35px_rgba(239,68,68,0.25)]
            "
          >
            Confirm Delete
          </Button>

        </DialogActions>

      </Dialog>

      {/* SUCCESS TOAST */}
      <AnimatePresence>

        {showSuccess && (

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]"
          >

            <div className="
              bg-slate-900
              text-white
              px-8 py-5
              rounded-[24px]
              shadow-[0_20px_50px_rgba(0,0,0,0.25)]
              flex items-center gap-4
              border border-emerald-500/30
            ">

              <CheckCircle2 className="text-emerald-400" />

              <span className="font-black tracking-wide">
                Tool Details Updated Successfully!
              </span>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}


// ---------------- PLUS ICON ----------------

const PlusCircle = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);