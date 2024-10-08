const express = require("express");
const consultantRoute = express.Router();
const upload = require("../uploadConfig");
const consultantController = require("../controllers/consultantController");

consultantRoute.post(
  "/addconsultant",
  upload.single("image"),
  consultantController.addConsultant
);
consultantRoute.get("/getconsultants", consultantController.getConsultants);
consultantRoute.delete(
  "/deleteconsultant/:id",
  consultantController.deleteConsultant
);
consultantRoute.put(
  "/updateconsultant/:id",
  upload.single("image"),
  consultantController.updateConsultant
);

module.exports = consultantRoute;
