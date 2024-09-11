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

treatmentRoute.delete(
  "/deletetreatment/:id",
  treatmentController.deleteTreatment
);

treatmentRoute.put(
  "/updatetreatment/:id",
  upload.single("image"),
  treatmentController.updateTreatment
);

module.exports = treatmentRoute;
