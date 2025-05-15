import fs from "fs/promises";
import path from "path";

export const clearUploadsFolder = async () => {
  const folderPath = path.join(process.cwd(), "uploads");
  try {
    const files = await fs.readdir(folderPath);
    await Promise.all(
      files.map((file) => fs.unlink(path.join(folderPath, file)))
    );
    console.log("✅ uploads 資料夾已清空");
  } catch (err) {
    console.error("❌ 清空 uploads 時出錯：", err.message);
  }
};