import express from "express"
import wrapAsync from "../wrapAsync.js";
import { Login, Signup } from "../controllers/authControllers.js";
import upload from "../middleware/upload.js";
const router = express.Router();



router.post(
  "/signup",
  upload.single("profileImage"),
  wrapAsync(Signup)
);
router.post("/login",wrapAsync(Login));

export default router;