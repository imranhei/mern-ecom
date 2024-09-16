const express = require("express");

const {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} = require("../../controllers/admin/products-controller");

const { upload } = require("../../helper/cloudinary");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add-product", addProduct);
router.get("/fetch-all-products", fetchAllProducts);
router.put("/edit-product/:id", editProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
