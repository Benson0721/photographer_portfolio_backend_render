import {
  getFrontImages,
  updateFrontImage,
} from "../controllers/portfolioApi/front-api.js";
import { checkAuth } from "../utils/checkAuth.js";
import express from "express";
const router = express.Router();

router.route("/").get(getFrontImages).put(checkAuth, updateFrontImage);

export { router };
