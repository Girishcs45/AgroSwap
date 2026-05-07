import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const Signup = async (req, res) => {
  try {
    console.log("🔥 Signup API called");

    const {
      fullName,
      mobile,
      email,
      password,
      confirmPassword,
      village,
      district,
      state,
      agreeToTerms
    } = req.body;

    if (!fullName || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (!agreeToTerms) {
      return res.status(400).json({
        success: false,
        message: "You must agree to terms and policy",
      });
    }

    const existingMobUser = await User.findOne({ mobile });
    const existingEmailUser = await User.findOne({ email });


    if (existingMobUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this mobile",
      });
    }

     if (existingEmailUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
  fullName,
  mobile,
  email,
  password: hashedPassword,

  // ✅ CLOUDINARY IMAGE URL
  profileImage: req.file?.path || "",

  location: {
    village,
    district,
    state,
  },

  agreeToTerms,
});

   
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    
    const user = newUser.toObject();
    delete user.password;

    
    return res.status(201).json({
      success: true,
      message: "User registered successfully 🚀",
      token,
      user,
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { mobile, email, password } = req.body;
    
    if ((!mobile && !email) || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile/Email and password are required",
      });
    }

    const user = await User.findOne(
      mobile ? { mobile } : { email }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
