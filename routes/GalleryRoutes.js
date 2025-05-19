import express from "express";
import {
  getGalleryImages,
  addGalleryImages,
  deleteGalleryImage,
} from "../controllers/portfolioApi/gallery-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getGalleryImages)
  .post(checkAuth, upload.array("image"), addGalleryImages)
  .delete(checkAuth, deleteGalleryImage);

export { router };
