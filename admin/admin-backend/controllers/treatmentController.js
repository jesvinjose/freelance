const Treatment = require("../models/treatmentModel");

const addTreatment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    const newTreatment = new Treatment({
      name,
      description,
      image: imagePath,
    });

    // Save the treatment to the database
    await newTreatment.save();

    res.status(201).json({
      message: "Treatment added successfully",
      treatment: newTreatment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add treatment", error: error.message });
  }
};

const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();

    res.status(200).json(treatments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch treatments", error: error.message });
  }
};

module.exports = {
  addTreatment,
  getTreatments,
};
