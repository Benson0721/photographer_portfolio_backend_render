import express from "express";
import {
  getAboutImages,
  updateAboutImage,
  adjustOffsetY,
} from "../controllers/aboutApi/about-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();


router
  .route("/:folder1")
  .get(getAboutImages)
  .put(checkAuth, upload.single("image"), updateAboutImage)
  .patch(checkAuth, adjustOffsetY);
export { router };
