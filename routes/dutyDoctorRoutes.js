const express = require("express");
const dutyDoctorRoute = express.Router();
const upload = require("../uploadConfig");
const dutyDoctorController = require("../controllers/dutyDoctorController");

dutyDoctorRoute.post(
  "/adddutydoctor",
  upload.single("image"),
  dutyDoctorController.addDutyDoctor
);

dutyDoctorRoute.get("/getdutydoctors", dutyDoctorController.getDutyDoctors);

dutyDoctorRoute.delete(
  "/deletedutydoctor/:id",
  dutyDoctorController.deleteDutyDoctor
);

dutyDoctorRoute.put(
  "/updatedutydoctor/:id",
  upload.single("image"),
  dutyDoctorController.updateDutyDoctor
);

module.exports = dutyDoctorRoute;
