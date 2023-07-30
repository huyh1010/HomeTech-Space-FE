import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";

export const CloudinaryUploadFiles = async (images) => {
  if (!images) return "";
  console.log(images);
  try {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("files", images[i]);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    }

    const res = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    const imageURL = res.data.secure_url;

    return imageURL;
  } catch (error) {
    throw error;
  }
};
