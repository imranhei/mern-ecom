const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dixsy04ry",
  api_key: "912646559679687",
  api_secret: "W3f00vx306deMWZBVaG43ndcqLQ",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({
  storage,
});

module.exports = { upload, imageUploadUtil };