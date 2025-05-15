import express from "express";
import {
  getDisplayImages,
  addDisplayImages,
  deleteDisplayImage,
} from "../controllers/portfolioApi/display-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/:folder1/:folder2")
  .get(getDisplayImages)
  .post(checkAuth, upload.array("images"), addDisplayImages)
  .delete(checkAuth, deleteDisplayImage);

export { router };
