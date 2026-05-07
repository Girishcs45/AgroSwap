import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Tractor,
  MapPin,
  Calendar,
  Zap,
  Fuel,
  Settings,
  Image as ImageIcon,
  Info,
  CheckCircle2,
  UploadCloud,
  IndianRupee,
  Sparkles,
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
  InputAdornment,
  Chip,
} from "@mui/material";

import { CreateToolService } from "../../services/tool.services";


// ---------------- GLASS CARD ----------------

const GlassCard = ({ children, className }) => (
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

export default function AddTool() {

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    power: "",
    fuel: "",
    drive: "",
    location: "",
    description: "",
    image: null,
    unit: "day",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // ---------------- CHANGE ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- IMAGE ----------------

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (file) {

      setImageFile(file);

      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (
        !formData.name ||
        !formData.category ||
        !formData.price ||
        !formData.location
      ) {
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("power", formData.power);
      formDataToSend.append("fuel", formData.fuel);
      formDataToSend.append("drive", formData.drive);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("description", formData.description);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await CreateToolService(formDataToSend);

      if (res?.success) {

        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          navigate("/my-dashboard");
        }, 2500);
      }

    } catch (error) {
      console.error("CreateTool Error:", error);
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

      {/* TOP GLOW */}
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
        <div className="mb-14">

          <div className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            bg-emerald-100
            text-emerald-700
            text-xs
            font-black
            uppercase
            tracking-[2px]
            mb-6
          ">
            <Sparkles size={14} />
            AgroSwap Marketplace
          </div>

          <h1 className="
            text-5xl md:text-6xl
            font-black
            tracking-tight
            text-slate-900
            leading-[1]
          ">
            List Your
            <span className="text-emerald-600">
              {" "}Equipment
            </span>
          </h1>

          <p className="
            text-slate-500
            text-lg
            mt-5
            max-w-2xl
            leading-relaxed
          ">
            Reach thousands of farmers and renters by publishing your farming
            equipment on AgroSwap marketplace.
          </p>

        </div>

        {/* GRID */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >

          {/* LEFT */}
          <div className="lg:col-span-8 space-y-8">

            {/* BASIC */}
            <GlassCard className="p-8 md:p-10">

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

                <div className="col-span-full">

                  <TextField
                    fullWidth
                    label="Tool Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Deere 5050D"
                  />

                </div>

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
                      "Tiller",
                      "Seeder",
                      "Baler",
                      "Trailer",
                    ].map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}

                  </Select>

                </FormControl>

                <div className="flex gap-3">

                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
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

              </div>

            </GlassCard>

            {/* TECHNICAL */}
            <AnimatePresence>

              {(formData.category === "Tractor" ||
                formData.category === "Harvester") && (

                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >

                  <GlassCard className="p-8 md:p-10">

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

                          {[
                            "Diesel",
                            "Petrol",
                            "Electric",
                            "Hybrid",
                          ].map((f) => (
                            <MenuItem key={f} value={f}>
                              {f}
                            </MenuItem>
                          ))}

                        </Select>

                      </FormControl>

                      <div className="
                        md:col-span-2
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

                  </GlassCard>

                </motion.div>
              )}

            </AnimatePresence>

            {/* LOCATION */}
            <GlassCard className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <MapPin size={24} className="text-red-500" />
                Location & Description
              </h3>

              <div className="space-y-7">

                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Village, District, State"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MapPin size={18} className="text-red-400" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mention tool condition, service history, attachments, availability..."
                />

              </div>

            </GlassCard>

            {/* IMAGE */}
            <GlassCard className="p-8 md:p-10">

              <h3 className="
                text-2xl
                font-black
                text-slate-900
                mb-8
                flex items-center gap-3
              ">
                <ImageIcon size={24} className="text-indigo-500" />
                Upload Photos
              </h3>

              <label className="block w-full cursor-pointer">

                <div className="
                  border-2 border-dashed border-emerald-200
                  bg-emerald-50/40
                  rounded-[32px]
                  p-12
                  flex flex-col items-center justify-center
                  hover:bg-emerald-50/70
                  transition-all duration-300
                ">

                  {formData.image ? (
                    <>

                      <div className="
                        relative overflow-hidden
                        rounded-[28px]
                        shadow-xl
                      ">

                        <img
                          src={formData.image}
                          alt="preview"
                          className="
                            w-56 h-56
                            object-cover
                          "
                        />

                      </div>

                      <p className="
                        text-emerald-600
                        font-black
                        text-lg
                        mt-6
                      ">
                        Image Selected Successfully
                      </p>

                      <p className="
                        text-sm
                        text-slate-500
                        mt-2
                      ">
                        Click to change image
                      </p>

                    </>
                  ) : (
                    <>

                      <div className="
                        w-24 h-24
                        rounded-[28px]
                        bg-white
                        flex items-center justify-center
                        shadow-lg
                        mb-6
                      ">

                        <UploadCloud
                          size={42}
                          className="text-emerald-500"
                        />

                      </div>

                      <h4 className="
                        text-2xl
                        font-black
                        text-slate-900
                      ">
                        Upload Tool Photos
                      </h4>

                      <p className="
                        text-slate-500
                        mt-3
                      ">
                        PNG, JPG up to 10MB
                      </p>

                    </>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />

                </div>

              </label>

            </GlassCard>

            {/* BUTTON */}
            <div className="flex justify-end">

              <button
                type="submit"
                className="
                  px-10 py-5
                  rounded-[24px]
                  bg-gradient-to-r from-emerald-600 to-green-500
                  hover:from-emerald-700 hover:to-green-600
                  text-white
                  text-lg
                  font-black
                  shadow-[0_20px_40px_rgba(16,185,129,0.28)]
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Publish Listing
              </button>

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
              <GlassCard className="
                overflow-hidden
                border border-emerald-100
              ">

                {/* IMAGE */}
                <div className="h-64 relative overflow-hidden">

                  {formData.image ? (

                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="
                      w-full h-full
                      flex flex-col items-center justify-center
                      text-slate-400
                      bg-slate-100
                    ">

                      <ImageIcon size={54} />

                      <p className="text-xs font-black mt-3">
                        No Image Selected
                      </p>

                    </div>
                  )}

                  <div className="
                    absolute inset-0
                    bg-gradient-to-t from-black/40 to-transparent
                  " />

                  <div className="absolute top-5 right-5">

                    <Chip
                      label="Available Today"
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
                        {formData.name || "Tool Brand & Model"}
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
                        text-slate-400
                        font-black
                        uppercase
                        tracking-[2px]
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
                      {formData.power || "--"} HP
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
                      {formData.fuel || "--"}
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
                      {formData.drive || "--"}
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
                      <Calendar size={14} className="text-slate-500" />
                      Available
                    </div>

                  </div>

                  {/* CTA */}
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
                    Live Marketplace View
                  </div>

                  <p className="
                    text-center
                    text-[10px]
                    text-slate-400
                    mt-4
                    font-black
                    uppercase
                    tracking-[2px]
                  ">
                    Buyers will see this preview
                  </p>

                </div>

              </GlassCard>

              {/* TIP */}
              <GlassCard className="
                p-6
                bg-sky-50/70
                border border-sky-100
              ">

                <div className="flex gap-4">

                  <Info className="text-sky-600 shrink-0" />

                  <p className="
                    text-sm
                    text-sky-900
                    leading-relaxed
                  ">
                    <b>AgroSwap Tip:</b> Listings with clear images and detailed
                    specifications receive significantly more rental requests.
                  </p>

                </div>

              </GlassCard>

            </div>

          </div>

        </form>

      </div>

      {/* SUCCESS */}
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
                Listing Published Successfully!
              </span>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}