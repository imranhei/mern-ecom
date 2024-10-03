const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid search keyword" });
    }

    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: { $regex: regEx } },
        { description: { $regex: regEx } },
        { category: { $regex: regEx } },
        { brand: { $regex: regEx } },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { searchProducts };
