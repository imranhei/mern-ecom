const Features = require("../../models/Features");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    const featuresImages = new Features({
      image,
    });

    await featuresImages.save();
    res.status(201).json({
      success: true,
      message: "Feature image added successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const images = await Features.find();
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFeatureImage,
  getFeatureImage,
};