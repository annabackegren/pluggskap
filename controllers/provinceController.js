const provinceModel = require("../models/provinceModel");

exports.getProvinces = async (req, res) => {
  try {
    const allProvinces = await provinceModel.find();
    return res.status(200).json(allProvinces);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
