import express from "express";
import {
  getGalleryImages,
  addGalleryImage,
  deleteGalleryImage,
} from "../controllers/portfolioApi/gallery-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getGalleryImages)
  .post(checkAuth, upload.single("image"), addGalleryImage)
  .delete(checkAuth, deleteGalleryImage);

export { router };
