import express from "express";
import {
  getAboutImages,
  updateAboutImage,
} from "../controllers/aboutApi/about-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getAboutImages)
  .put(checkAuth, upload.single("image"), updateAboutImage);
export { router };
