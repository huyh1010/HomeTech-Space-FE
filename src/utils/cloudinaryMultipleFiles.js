import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";

export const CloudinaryUploadFiles = (images) => {
  if (!images) return "";

  try {
    images.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const res = await axios({
        url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageURL = res.data.secure_url;

      return imageURL;
    });
  } catch (error) {
    throw error;
  }
};
