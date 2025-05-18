import express from "express";
import {
  getSectionImages,
  updateSectionImage,
  adjustOffsetY,
  updateSectionName,
} from "../controllers/homeApi/section-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.route("/name").patch(checkAuth, updateSectionName);

router
  .route("/")
  .get(getSectionImages)
  .put(checkAuth, upload.single("image"), updateSectionImage)
  .patch(checkAuth, adjustOffsetY);

export { router };
