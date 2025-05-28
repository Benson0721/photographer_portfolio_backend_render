import express from "express";
import {
  getAboutImages,
  updateAboutImage,
  getAboutMe,
  updateAboutMe,
} from "../controllers/aboutApi/about-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getAboutImages)
  .put(checkAuth, upload.single("image"), updateAboutImage);

router.route("/content").get(getAboutMe).put(checkAuth, updateAboutMe);

export { router };
