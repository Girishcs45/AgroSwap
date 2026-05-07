import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
  folder: file.fieldname === "profileImage"
    ? "agroswap-profile-images"
    : "agroswap-tools",

  allowed_formats: ["jpg", "png", "jpeg"],
}),
});

const upload = multer({ storage });

export default upload;