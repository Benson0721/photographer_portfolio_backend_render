import express from "express";
import {
  getAlbumImages,
  addAlbumImage,
  updateAlbumImage,
  deleteAlbumImage,
} from "../controllers/portfolioApi/album-api.js";
import multer from "multer";
import { checkAuth } from "../utils/checkAuth.js";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/")
  .get(getAlbumImages)
  .post(checkAuth, upload.single("image"), addAlbumImage)
  .put(checkAuth, upload.single("image"), updateAlbumImage)
  .delete(checkAuth, deleteAlbumImage);

export { router };
