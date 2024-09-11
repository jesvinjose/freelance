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

const deleteTreatment = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedTreatment = await Treatment.findByIdAndDelete(id);
    // console.log(deletedTreatment,'<------------deletedTreatment');

    // If treatment not found, return an error response
    if (!deletedTreatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Treatment deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete treatment", error: error.message });
  }
};

const updateTreatment = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    // Fetch the existing treatment to get the current image path
    const existingTreatment = await Treatment.findById(id);

    if (!existingTreatment) {
      return res.status(404).json({ message: "Treatment not found." });
    }

    // Prepare the updated data
    let updatedData = {
      name,
      description,
      image: existingTreatment.image, // Set the existing image by default
    };

    // Check if a new image file was uploaded
    if (req.file) {
      const imagePath = req.file.path;
      updatedData.image = imagePath; // Update with the new image path
    }

    // Update the consultant details
    const updatedTreatment = await Treatment.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Treatment updated successfully",
      treatment: updatedTreatment,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update treatment", error: error.message });
  }
};

module.exports = {
  addTreatment,
  getTreatments,
  deleteTreatment,
  updateTreatment,
};
