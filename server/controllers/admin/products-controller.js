const { imageUploadUtil } = require("../../helper/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//add a new product
const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    stock,
  } = req.body;

  try {
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      stock,
    });

    await newlyCreatedProduct.save();

    res.status(201).json({ success: true, data: newlyCreatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});
    res.status(200).json({ success: true, data: listOfProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//edit a product
const editProduct = async (req, res) => {
  const { image, title, description, category, brand, price, salePrice, stock } =
    req.body;
  const { id } = req.params;

  try {
    let findProduct = await Product.findById(id);
    if(!findProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    findProduct.title = title || findProduct.title;
    findProduct.image = image || findProduct.image;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.stock = stock || findProduct.stock;

    await findProduct.save();

    res.status(200).json({ success: true, data: findProduct, message: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
