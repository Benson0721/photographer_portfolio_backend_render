import { connectToDB } from "./mongoDB.js";
import mongoose from "mongoose";
import path from "path";
import { PortfolioFrontImage } from "./models/PortfolioFrontImageSchema.js";
import { GalleryImage } from "./models/GalleryImageSchema.js";
import { AlbumImage } from "./models/AlbumImageSchema.js";
import { DisplayImage } from "./models/DisplayImageSchema.js";
import { AboutMe } from "./models/AboutMeSchema.js";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

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

const newImages = [
  {
    category: "All",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745321482/Pai/views/portfolio/Architecture/spopig4s6izleqdfahck.jpg",
  },
  {
    category: "Architecture",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745757660/Pai/views/portfolio/Architecture/rp4ahp00e7z7jz7pfd6q.jpg",
  },
  {
    category: "Landscape",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745406064/Pai/views/portfolio/Landscape/sag3srh2ongcvrqoicyg.jpg",
  },
  {
    category: "Motorcycle",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745758165/Pai/views/portfolio/Motorcycle/megeehvrzrayz5pcq3hh.jpg",
  },
  {
    category: "Others",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745757790/Pai/views/portfolio/Others/bprffwjupqyrkyoanwsr.jpg",
  },
  {
    category: "Portrait",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745758012/Pai/views/portfolio/Portrait/fptmn4gok0bq7tqztvx1.jpg",
  },
  {
    category: "Street",
    imageURL:
      "https://res.cloudinary.com/dk1yh5mdu/image/upload/f_auto,q_auto,w_1440/v1745751330/Pai/views/portfolio/Street/vkf1e9qrtytie2rf5ec4.jpg",
  },
];

async function seedImages() {
  try {
    const newAboutme = new AboutMe({
      userID: new mongoose.Types.ObjectId("67fb313f5a513165490bbc29"),
      content:
        "我是白承智，一位專注於人像、風景與建築攝影的創作者。我喜歡以機車旅行的方式探索城市與自然，穿梭在熟悉與未知之間，透過鏡頭記錄旅途中每一個觸動心弦的瞬間。無論是山林間的光影變化，還是建築結構與環境交織出的視覺節奏，我都試圖以攝影凝結時間，保留那些稍縱即逝的感動。我的攝影風格強調光影與情緒的流動，特別著重於捕捉被攝者最真實、放鬆的狀態，並透過構圖與色調營造空間氛圍。人像攝影中，我重視與被攝者的連結，期望影像能反映個體的溫度與故事；風景與建築中，我則試著挖掘結構與自然之間的對話，呈現靜謐與張力共存的畫面。若你對我的影像有共鳴，或希望合作拍攝，歡迎與我聯繫。期待透過影像與你分享我眼中的世界。",
    });
    await newAboutme.save();
    console.log("AboutMe seeded successfully!");
  } catch (error) {
    console.error("Error seeding AboutMe:", error);
  }
}

await seedImages();
