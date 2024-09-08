const Consultant = require('../models/consultantModel');

const addConsultant = async (req, res) => {
    try {
        const { name, qualification } = req.body;
        
        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required.' });
        }

        // Extract the image path from the file object
        const imagePath = req.file.path;

        // Create a new consultant document
        const newConsultant = new Consultant({
            name,
            qualification,
            image: imagePath
        });

        // Save the consultant to the database
        await newConsultant.save();

        res.status(201).json({ message: 'Consultant added successfully', consultant: newConsultant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add consultant', error: error.message });
    }
};

module.exports = {
    addConsultant
};
