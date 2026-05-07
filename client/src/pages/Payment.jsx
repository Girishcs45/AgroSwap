import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {
  ShieldCheck,
  Info,
  Clock,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Check,
  MapPin,
  Calendar,
} from 'lucide-react';

import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Divider,
} from '@mui/material';

import { CreateBookingService } from '../services/booking.services';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [toolData, setToolData] = useState(state?.tool || null);
  const [payStatus, setPayStatus] = useState('idle');
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;
  const bookingType = state?.bookingType || "day";

  useEffect(() => {
    if (!state) {
      console.log("⚠️ No state found, should fetch tool using id:", id);
    }
  }, [state, id]);

  if (!toolData || !fromDate || !toDate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f9f8]">
        <div className="bg-white p-10 rounded-[32px] shadow-xl text-center">
          <h1 className="text-2xl font-black text-slate-800">
            No booking data found
          </h1>
        </div>
      </div>
    );
  }

  // DAYS
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(toDate).setHours(0,0,0,0) - new Date(fromDate).setHours(0,0,0,0))
      / (1000 * 60 * 60 * 24)
    ) + 1
  );

  const rentAmount = days * toolData.price;
  const durationLabel = `${days} days`;

  const platformFee = Math.round(rentAmount * 0.15);

  const totalAmount = rentAmount + platformFee;

  const handlePayment = async () => {
    try {
      setPayStatus("processing");

      const formData = {
        toolId: toolData._id,
        fromDate,
        toDate,
        totalAmount,
      };

      const res = await CreateBookingService(formData);

      if (res.success) {
        setPayStatus("success");
      } else {
        setPayStatus("idle");
        alert(res.message || "Booking failed");
      }

    } catch (error) {
      console.error("Payment error:", error);
      setPayStatus("idle");
      alert("Something went wrong");
    }
  };

  if (payStatus === 'success') return <SuccessState />;

  return (
    <div className="min-h-screen bg-[#f6f9f8] pt-24 pb-20 px-4 md:px-8 overflow-hidden relative">

      {/* BG BLOBS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 40, 0],
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
            x: [0, -40, 0],
            y: [0, -50, 0],
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

      {/* TOP GRADIENT */}
      <div className="absolute top-0 inset-x-0 h-[420px] bg-gradient-to-b from-emerald-100/40 to-transparent pointer-events-none" />

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto relative z-10">

        {/* STEPPER */}
        <div className="max-w-4xl mx-auto mb-14">

          <div className="
            bg-white/70
            backdrop-blur-2xl
            border border-white
            rounded-[32px]
            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
            p-6
          ">

            <Stepper
              activeStep={2}
              alternativeLabel
              sx={{
                '& .MuiStepIcon-root.Mui-active': {
                  color: '#10b981',
                },
                '& .MuiStepIcon-root.Mui-completed': {
                  color: '#10b981',
                },
              }}
            >
              {['Select Tool', 'Choose Slot', 'Payment', 'Confirmed'].map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">

            {/* HEADER */}
            <div>
              <h1 className="
                text-5xl md:text-6xl
                font-black
                tracking-tight
                text-slate-900
                leading-[1]
              ">
                Secure Payment
              </h1>

              <p className="
                text-slate-500
                text-base
                mt-4
                max-w-lg
                leading-relaxed
              ">
                Complete your booking securely through AgroSwap escrow protection.
                Your payment remains protected until successful return confirmation.
              </p>
            </div>

            {/* PAYMENT METHODS */}
            <div className="
              bg-white/75
              backdrop-blur-2xl
              border border-white
              rounded-[36px]
              shadow-[0_10px_50px_rgba(15,23,42,0.08)]
              p-8
            ">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Payment Method
                  </h3>

                  <p className="text-slate-500 text-sm mt-1">
                    Choose your preferred payment option
                  </p>
                </div>

                <div className="
                  px-4 py-2 rounded-2xl
                  bg-emerald-100
                  text-emerald-700
                  text-xs font-black
                  uppercase tracking-[2px]
                ">
                  Secure
                </div>

              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                <PaymentOption
                  id="upi"
                  icon={<Smartphone />}
                  label="UPI"
                  selected={selectedMethod === 'upi'}
                  onClick={setSelectedMethod}
                />

                <PaymentOption
                  id="card"
                  icon={<CreditCard />}
                  label="Card"
                  selected={selectedMethod === 'card'}
                  onClick={setSelectedMethod}
                />

                <PaymentOption
                  id="net"
                  icon={<Landmark />}
                  label="Banking"
                  selected={selectedMethod === 'net'}
                  onClick={setSelectedMethod}
                />

                <PaymentOption
                  id="wallet"
                  icon={<Wallet />}
                  label="Wallet"
                  selected={selectedMethod === 'wallet'}
                  onClick={setSelectedMethod}
                />

              </div>

            </div>

            {/* ESCROW CARD */}
            <div className="
              relative overflow-hidden
              rounded-[36px]
              border border-emerald-100
              bg-gradient-to-br from-emerald-500 to-green-600
              p-8
              shadow-[0_20px_70px_rgba(16,185,129,0.25)]
            ">

              <div className="
                absolute top-0 right-0
                w-52 h-52
                bg-white/10
                rounded-full blur-3xl
              " />

              <div className="relative z-10 flex gap-5">

                <div className="
                  w-14 h-14 rounded-2xl
                  bg-white/15
                  flex items-center justify-center
                  shrink-0
                ">
                  <ShieldCheck className="text-white" />
                </div>

                <div>

                  <h3 className="text-2xl font-black text-white mb-2">
                    AgroSwap Escrow
                  </h3>

                  <p className="text-emerald-50 leading-relaxed">
                    Your payment is securely held until the booking is completed successfully.
                    Owners receive funds only after successful return confirmation.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 space-y-6">

            {/* TOOL CARD */}
            <div className="
              bg-white/80
              backdrop-blur-2xl
              border border-white
              rounded-[36px]
              shadow-[0_10px_50px_rgba(15,23,42,0.08)]
              p-7
              overflow-hidden
            ">

              <div className="flex gap-5 mb-8">

                <div className="relative">

                  <img
                    src={toolData.image}
                    alt="Tool"
                    className="
                      w-28 h-28
                      rounded-[28px]
                      object-cover
                      shadow-lg
                    "
                  />

                  <div className="
                    absolute inset-0
                    rounded-[28px]
                    bg-gradient-to-t from-black/30 to-transparent
                  " />

                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-black text-slate-900 leading-tight">
                    {toolData.name}
                  </h2>

                  <div className="
                    flex items-center gap-2
                    text-sm text-slate-500
                    mt-3
                  ">
                    <MapPin size={15} className="text-emerald-500" />
                    {toolData.location}
                  </div>

                  <div className="
                    mt-4 inline-flex
                    px-4 py-2
                    rounded-2xl
                    bg-emerald-100
                    text-emerald-700
                    text-xs font-black
                    uppercase tracking-[2px]
                  ">
                    Premium Listing
                  </div>

                </div>

              </div>

              {/* DATE INFO */}
              <div className="space-y-4">

                <div className="
                  flex items-center justify-between
                  p-5
                  rounded-[24px]
                  bg-slate-50
                  border border-slate-100
                ">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-12 h-12 rounded-2xl
                      bg-emerald-100
                      flex items-center justify-center
                    ">
                      <Calendar size={18} className="text-emerald-600" />
                    </div>

                    <div>
                      <p className="
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-slate-400
                        font-black
                      ">
                        Booking Dates
                      </p>

                      <h4 className="font-black text-slate-800 mt-1">
                        {new Date(fromDate).toDateString()}
                      </h4>
                    </div>

                  </div>

                  <span className="text-slate-400 font-black">
                    →
                  </span>

                  <div className="text-right">
                    <h4 className="font-black text-slate-800">
                      {new Date(toDate).toDateString()}
                    </h4>
                  </div>

                </div>

                <div className="
                  flex items-center justify-between
                  p-5
                  rounded-[24px]
                  bg-slate-50
                  border border-slate-100
                ">

                  <div className="flex items-center gap-3">

                    <div className="
                      w-12 h-12 rounded-2xl
                      bg-sky-100
                      flex items-center justify-center
                    ">
                      <Clock size={18} className="text-sky-600" />
                    </div>

                    <div>
                      <p className="
                        text-[10px]
                        uppercase
                        tracking-[2px]
                        text-slate-400
                        font-black
                      ">
                        Duration
                      </p>

                      <h4 className="font-black text-slate-800 mt-1">
                        {durationLabel}
                      </h4>
                    </div>

                  </div>

                  <div className="
                    px-4 py-2
                    rounded-2xl
                    bg-white
                    border border-slate-100
                    font-black text-slate-700
                  ">
                    ₹{toolData.price}/day
                  </div>

                </div>

              </div>

            </div>

            {/* PRICE CARD */}
            <div className="
              bg-white/80
              backdrop-blur-2xl
              border border-white
              rounded-[36px]
              shadow-[0_10px_50px_rgba(15,23,42,0.08)]
              p-7
            ">

              <h3 className="text-2xl font-black text-slate-900 mb-6">
                Price Breakdown
              </h3>

              <div className="space-y-5">

                <PriceRow
                  label={`Rental (${durationLabel})`}
                  value={`₹${rentAmount}`}
                />

                <PriceRow
                  label="Platform Fee"
                  value={`₹${platformFee}`}
                />

                <Divider />

                <div className="flex justify-between items-center pt-2">

                  <span className="text-xl font-black text-slate-900">
                    Total
                  </span>

                  <span className="
                    text-4xl
                    font-black
                    tracking-tight
                    text-emerald-600
                  ">
                    ₹{totalAmount}
                  </span>

                </div>

              </div>

            </div>

            {/* PAY BUTTON */}
            <button
              onClick={handlePayment}
              disabled={payStatus === 'processing'}
              className="
                w-full
                py-5
                rounded-[28px]
                bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500
                hover:from-emerald-700 hover:to-green-600
                text-white
                text-lg
                font-black
                tracking-wide
                shadow-[0_20px_40px_rgba(16,185,129,0.35)]
                transition-all duration-300
                hover:scale-[1.02]
                active:scale-[0.98]
              "
            >
              {payStatus === 'processing'
                ? 'Processing Payment...'
                : `Pay ₹${totalAmount}`
              }
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};


// ---------------- SUCCESS ----------------

const SuccessState = () => {
  const navigate = useNavigate();

  return (
    <div className="
      min-h-screen
      flex items-center justify-center
      bg-[#f6f9f8]
      px-4
    ">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          bg-white
          rounded-[40px]
          shadow-[0_20px_70px_rgba(0,0,0,0.08)]
          p-12
          max-w-md
          w-full
          text-center
        "
      >

        <div className="
          w-24 h-24
          rounded-full
          bg-emerald-100
          flex items-center justify-center
          mx-auto
          mb-6
        ">
          <Check size={42} className="text-emerald-600" />
        </div>

        <h1 className="
          text-4xl
          font-black
          text-slate-900
          tracking-tight
        ">
          Payment Successful
        </h1>

        <p className="
          text-slate-500
          mt-4
          leading-relaxed
        ">
          Your booking has been confirmed successfully.
          You can now track it from your booking history.
        </p>

        <Button
          variant="contained"
          onClick={() => navigate("/history")}
          className="
            !mt-8
            !bg-gradient-to-r !from-emerald-600 !to-green-500
            !px-8
            !py-4
            !rounded-[20px]
            !font-black
            !shadow-lg
          "
        >
          My Bookings
        </Button>

      </motion.div>

    </div>
  );
};


// ---------------- PAYMENT OPTION ----------------

const PaymentOption = ({
  id,
  icon,
  label,
  selected,
  onClick
}) => (
  <button
    onClick={() => onClick(id)}
    className={`
      relative overflow-hidden
      p-5
      rounded-[28px]
      border
      transition-all duration-300
      hover:-translate-y-1

      ${selected
        ? `
          bg-gradient-to-br from-emerald-500 to-green-600
          border-emerald-500
          text-white
          shadow-[0_15px_35px_rgba(16,185,129,0.3)]
        `
        : `
          bg-white
          border-slate-100
          text-slate-700
          hover:shadow-lg
        `
      }
    `}
  >

    <div className="
      flex flex-col items-center justify-center
      gap-3
    ">
      <div className={selected ? "text-white" : "text-emerald-600"}>
        {icon}
      </div>

      <span className="font-black text-sm">
        {label}
      </span>
    </div>

  </button>
);


// ---------------- PRICE ROW ----------------

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between items-center">

    <span className="text-slate-500 font-semibold">
      {label}
    </span>

    <span className="font-black text-slate-900">
      {value}
    </span>

  </div>
);

export default PaymentPage;