import { AboutImage } from "../../models/AboutImageSchema.js";
import { updateImage } from "../cloudinaryApi/img-api.js";
import { AboutMe } from "../../models/AboutMeSchema.js";

export const getAboutImages = async (req, res) => {
  try {
    const AboutImages = await AboutImage.find({});
    res.json({ AboutImages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAboutMe = async (req, res) => {
  try {
    const content = await AboutMe.find({});
    res.json({ content: content[0].content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutMe = async (req, res) => {
  try {
    const { id } = req.query;
    const { content } = req.body;
    const updatedAboutMe = await AboutMe.findOneAndUpdate(
      { userID: id },
      { content: content },
      { new: true }
    );
    res.json({ message: "更新成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutImage = async (req, res) => {
  try {
    const { publicID, id } = req.query;
    const filepath = req.file.path;
    const filterPublicID = publicID.replace("Pai/views/about/", "");
    const imageData = await updateImage(
      "about",
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
    res.status(200).json({ message: "更新圖片成功!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
