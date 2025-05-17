import express from "express";
import {
  getGalleryImages,
  addGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "../controllers/portfolioApi/gallery-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();


router
  .route("/:folder1")
  .get(getGalleryImages)
  .post(checkAuth, upload.single("image"), addGalleryImage)
  .put(checkAuth, upload.single("image"), updateGalleryImage)
  .delete(checkAuth, deleteGalleryImage);

export { router };
