const DutyDoctor = require("../models/dutyDoctorModel");

const addDutyDoctor = async (req, res) => {
  try {
    const { name, qualification } = req.body;

    // Check if an image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Extract the image path from the file object
    const imagePath = req.file.path;

    // Create a new dutydoctor document
    const newDutyDoctor = new DutyDoctor({
      name,
      qualification,
      image: imagePath,
    });

    // Save the consultant to the database
    await newDutyDoctor.save();

    res
      .status(201)
      .json({
        message: "DutyDoctor added successfully",
        dutydoctor: newDutyDoctor,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add dutydoctor", error: error.message });
  }
};

const getDutyDoctors = async (req, res) => {
  try {
    // Fetch all duty doctors from the database
    const dutyDoctors = await DutyDoctor.find();

    // Respond with the list of duty doctors
    res.status(200).json(dutyDoctors);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch duty doctors", error: error.message });
  }
};

module.exports = {
  addDutyDoctor,
  getDutyDoctors,
};
