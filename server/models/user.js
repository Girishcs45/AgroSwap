import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {

     profileImage: {
  type: String,
  default: "",
},
    fullName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      village: String,
      district: String,
      state: String,
    },
    agreeToTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
