import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Tractor",
        "Harvester",
        "Drone",
        "Sprayer",
        "Rotavator",
        "Tiller",
        "Seeder",
        "Baler",
        "Trailer",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    power: {
      type: Number,
    },

    fuel: {
      type: String,
      enum: ["Diesel", "Petrol", "Electric", "Hybrid"],
    },

    drive: {
      type: String,
      enum: ["2WD", "4WD"],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      //   required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Tool", toolSchema);
