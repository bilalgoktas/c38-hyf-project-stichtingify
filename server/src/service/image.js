import { uploader } from "../config/cloudinaryConfig.js";
import { dataUri } from "../middlewares/multerUpload.js";

export const uploadImage = (req) => {
  const file = dataUri(req).content;
  return uploader
    .upload(file)
    .then((result) => {
      return result.url;
    })
    .catch((error) => {
      return error;
    });
};
