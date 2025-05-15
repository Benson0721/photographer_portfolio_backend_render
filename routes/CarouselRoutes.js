import express from "express";
import {
  getCarouselImages,
  addCarouselImage,
  adjustCarouselOrder,
  deleteCarouselImage,
} from "../controllers/homeApi/carousel-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router
  .route("/:folder1/:folder2")
  .get(getCarouselImages)
  .patch(checkAuth, adjustCarouselOrder)
  .post(checkAuth, upload.array("images"), addCarouselImage)
  .delete(checkAuth, deleteCarouselImage);

export { router };
