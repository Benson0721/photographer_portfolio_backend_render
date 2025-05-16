import { AboutImage } from "../../models/AboutImageSchema.js";
import { updateImage } from "../cloudinaryApi/img-api.js";

export const getAboutImages = async (req, res) => {
  try {
    const AboutImages = await AboutImage.find({});
    res.json({ AboutImages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutImage = async (req, res) => {
  try {
    const { folder1 } = req.params;
    const { publicID, id } = req.query;
    const filepath = req.file.path;
    const filterPublicID = publicID.replace("Pai/views/about/", "");
    const imageData = await updateImage(
      folder1,
      undefined,
      filepath,
      filterPublicID
    );
    if (imageData.error) {
      return res.status(500).json({ message: imageData.error });
    }
    await AboutImage.findByIdAndUpdate(
      id,
      {
        imageURL: imageData.secure_url,
        public_id: imageData.public_id,
      },
      { new: true }
    );
    console.log("更新圖片成功!");
    res.status(200).json({ message: "更新圖片成功!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
