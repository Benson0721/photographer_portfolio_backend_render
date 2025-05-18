import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { User } from "./models/UserSchema.js";
import {
  UserRoutes,
  CarouselRoutes,
  SectionRoutes,
  AboutRoutes,
  DisplayRoutes,
  GalleryRoutes,
  AlbumRoutes,
  FrontRoutes,
} from "./routes/routes.js";
import passport from "passport";
import express from "express";
import LocalStrategy from "passport-local";
import session from "express-session";
import cloudinary from "cloudinary";
import cron from "node-cron";
import { clearUploadsFolder } from "./utils/clearUploads.js";
import { connectToDB } from "./mongoDB.js";
import cors from "cors";
// 獲取當前檔案的路徑
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  // 動態解析 .env 的絕對路徑
  const envPath = path.resolve(__dirname, ".env");
  console.log("Loading .env from:", envPath);

  // 檢查 .env 檔案是否存在
  if (!fs.existsSync(envPath)) {
    throw new Error(`.env file not found at:${envPath}`);
  }

  // 加載環境變數
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    throw new Error(`Failed to load .env: ${result.error.message}`);
  }
}

const store = await connectToDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;
app.set("trust proxy", 1);

const whiteList = [
  "https://photographer-portfolio-frontend-vercel.vercel.app",
  "https://photographer-portfolio-frontend-vercel-utils.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // 多網址
      if (!origin || whiteList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const sessionConfig = {
  store,
  name: "session",
  secret: "thisismysecert",
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  cookie: {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const prefix = process.env.NODE_ENV !== "production" ? "" : "/api";

const routes = [
  { path: "/", router: UserRoutes },
  { path: "/carousel", router: CarouselRoutes },
  { path: "/section", router: SectionRoutes },
  { path: "/about", router: AboutRoutes },
  { path: "/display", router: DisplayRoutes },
  { path: "/gallery", router: GalleryRoutes },
  { path: "/album", router: AlbumRoutes },
  { path: "/front", router: FrontRoutes },
];

routes.forEach(({ path, router }) => {
  app.use(prefix + path, router);
});

app.get("/wakeup", (req, res) => {
  console.log("Allright...I have wake up...");
  res.send("Allright...I have wake up...");
});

cron.schedule("0 * * * *", async () => {
  console.log("每日清空 uploads 資料夾...");
  await clearUploadsFolder();
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});

app.on("error", (err) => {
  console.error("Server error:", err);
});
