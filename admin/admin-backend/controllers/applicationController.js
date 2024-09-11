const Application = require("../models/applicationModel");

const addApplication = async (req, res) => {
  try {
    const { name, mobile, email, designation } = req.body;

    console.log(req.body,"<------------req.body");
    

    // Check if a resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required." });
    }

    // Extract the image path from the file object
    const resumeFilePath = req.file.path;

    // Create a new dutydoctor document
    const newApplication = new Application({
      name,
      mobile,
      email,
      designation,
      resumeFile: resumeFilePath,
    });

    // Save the consultant to the database
    await newApplication.save();

    res.status(201).json({
      message: "application added successfully",
      application: newApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to add application", error: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch applications", error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the consultant by ID and delete
    const deletedApplication = await Application.findByIdAndDelete(id);
    // console.log(deletedApplication,'<------------deletedApplication');

    // If consultant not found, return an error response
    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Respond with a success message
    res.status(200).json({ message: "Application deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete application", error: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, mobile, email, designation } = req.body;

    // Fetch the existing consultant to get the current image path
    const existingApplication = await Application.findById(id);

    if (!existingApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Prepare the updated data
    let updatedData = {
      name,
      mobile,
      email,
      designation,
      resumeFile: existingApplication.resumeFile, // Set the existing resume by default
    };

    // console.log(updatedData);

    // Check if a new image file was uploaded
    if (req.file) {
      const resumePath = req.file.path;
      updatedData.resumeFile = resumePath; // Update with the new resume path
    }

    // Update the consultant details
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    // console.log(updatedConsultant);

    res.status(200).json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update application", error: error.message });
  }
};

module.exports = {
  addApplication,
  getApplications,
  deleteApplication,
  updateApplication,
};
