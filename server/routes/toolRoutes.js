import express from "express";
import wrapAsync from "../wrapAsync.js";
import {
  CreateTool,
  deleteToolController,
  getAllTools,
  getUserTools,
  toggleToolVisibility,
  updateToolController,
} from "../controllers/toolController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/createtool",
  verifyToken,
  upload.single("image"),
  wrapAsync(CreateTool),
);
router.get("/getalltools", wrapAsync(getAllTools));
router.get("/getusertools", verifyToken, wrapAsync(getUserTools));
// UPDATE TOOL
router.put("/updatetool/:id", verifyToken, wrapAsync(updateToolController));

// DELETE TOOL
router.delete("/deletetool/:id", verifyToken, wrapAsync(deleteToolController));

router.patch("/toggle-visibility/:id", verifyToken,( toggleToolVisibility));

export default router;
