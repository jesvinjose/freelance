const express = require("express");
const treatmentRoute = express.Router();
const upload = require("../uploadConfig");
const treatmentController = require("../controllers/treatmentController");

treatmentRoute.post(
  "/addtreatment",
  upload.single("image"),
  treatmentController.addTreatment
);

treatmentRoute.get("/gettreatments", treatmentController.getTreatments);

module.exports = treatmentRoute;
