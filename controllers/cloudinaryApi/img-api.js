import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const CLOUDINARYFOLDER = process.env.CLOUDINARYFOLDER;

export const updateImage = async (
  folder1,
  folder2 = "",
  filePath,
  publicId
) => {
  try {
    const folderPath = folder2
      ? `${CLOUDINARYFOLDER}/views/${folder1}/${folder2}`
      : `${CLOUDINARYFOLDER}/views/${folder1}`;
    const options = {
      folder: folderPath,
      resource_type: "image",
      overwrite: true,
      public_id: publicId,
      invalidate: true, // 👈 告訴 Cloudinary 清掉舊圖快取
    };
    const result = await cloudinary.uploader.upload(filePath, options);
    result.secure_url = result.secure_url.replace(
      "/upload/",
      "/upload/f_auto,q_80/"
    );
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const addImages = async (folder1, folder2 = "", filePath) => {
  try {
    const options = {
      folder: `${CLOUDINARYFOLDER}/views/${folder1}/${folder2}`,
      resource_type: "image",
    };
    if (!Array.isArray(filePath)) {
      const result = await cloudinary.uploader.upload(filePath, options);
      result.secure_url = result.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_80/"
      );
      return result;
    } else {
      const uploadPromises = filePath.map(async (path) => {
        const result = await cloudinary.uploader.upload(path, options);
        result.secure_url = result.secure_url.replace(
          "/upload/",
          "/upload/f_auto,q_80/"
        );
        return result;
      });
      const results = await Promise.all(uploadPromises); //等待所有上傳「結束後統一回報」
      return results;
    }
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteImages = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};
