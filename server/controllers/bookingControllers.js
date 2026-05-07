import Booking from "../models/booking.js";
import mongoose, { Mongoose } from "mongoose";

export const createBooking = async (req, res) => {
  try {
    const { toolId, fromDate, toDate, totalAmount } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!toolId || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const start = new Date(fromDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(toDate);
    end.setHours(23, 59, 59, 999);

       // ❌ Prevent invalid date selection
    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "Invalid date range",
      });
    }

    // 🔴 CHECK OVERLAP (MOST IMPORTANT)
    const isConflict = await Booking.findOne({
      tool: toolId,
      $or: [
        {
          fromDate: { $lte: end },
          toDate: { $gte: start },
        },
      ],
    });

    if (isConflict) {
      return res.status(400).json({
        success: false,
        message: "Tool already booked for selected dates",
      });
    }

    // ✅ CREATE BOOKING
    const booking = await Booking.create({
      tool: toolId,
      user: userId,
      fromDate: start,
      toDate: end,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const SlotInfo = async (req, res) => {
  try {
    const { toolId, month } = req.query;

    if (!toolId || !month) {
      return res.status(400).json({
        success: false,
        message: "turfId and date are required"
      });
    }

    const tool = await tool.findById(toolId);
    if (!tool) {
      return res.status(404).json({
        success: false,
        message: "Tool not found"
      });
    }

    const bookings = await Booking.find({
      tool: toolId,
      bookingDate: date
    }).select("bookedSlots");

    const bookedSlots = bookings.flatMap(booking => booking.bookedSlots);

    return res.status(200).json({
      success: true,
      bookedSlots
    });

  } catch (error) {
    console.error("SlotInfo error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching slot info",
      error: error.message
    });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { filter = "all" } = req.query;

    const now = new Date();

    // ✅ UTC SAFE DAY RANGE
    const startOfDay = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0, 0
    ));

    const endOfDay = new Date(Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23, 59, 59, 999
    ));

    let query = { user: userId };

    if (filter === "active") {
      query = {
        user: userId,
        fromDate: { $lte: endOfDay },
        toDate: { $gte: startOfDay }
      };
    }

    if (filter === "upcoming") {
      query = {
        user: userId,
        fromDate: { $gt: endOfDay }
      };
    }

    if (filter === "completed") {
      query = {
        user: userId,
        toDate: { $lt: startOfDay }
      };
    }
    const bookings = await Booking.find(query)
      .populate("tool")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error("GetMyBookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
  
};

