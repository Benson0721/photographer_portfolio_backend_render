import express from "express";
import {
  getTopicImages,
  addTopicImage,
  updateTopicImage,
  deleteTopicImage,
} from "../controllers/portfolioApi/topic-api.js";
import {
  getFrontImages,
  updateFrontImage,
} from "../controllers/portfolioApi/front-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.route("/front").get(getFrontImages).put(checkAuth, updateFrontImage);

router
  .route("/:folder1")
  .get(getTopicImages)
  .post(checkAuth, upload.single("image"), addTopicImage)
  .put(checkAuth, upload.single("image"), updateTopicImage)
  .delete(checkAuth, deleteTopicImage);

export { router };
