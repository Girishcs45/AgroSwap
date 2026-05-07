import express from "express";
import wrapAsync from "../wrapAsync.js";
import {
  CreateTool,
  deleteToolController,
  getAllTools,
  getSingleToolController,
  getToolBookingsController,
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

router.put("/updatetool/:id", verifyToken, wrapAsync(updateToolController));

router.delete("/deletetool/:id", verifyToken, wrapAsync(deleteToolController));

router.patch("/toggle-visibility/:id", verifyToken,( toggleToolVisibility));

router.get(
  "/gettool/:id",
  wrapAsync(getSingleToolController)
);

router.get(
  "/toolbookings/:toolId",
  verifyToken,
  wrapAsync(getToolBookingsController)
);

export default router;
