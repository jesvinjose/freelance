const express = require("express");
const dutyDoctorRoute = express.Router();
const upload = require("../uploadConfig");
const dutyDoctorController=require('../controllers/dutyDoctorController');

dutyDoctorRoute.post('/adddutydoctor',upload.single('image'),dutyDoctorController.addDutyDoctor);

module.exports=dutyDoctorRoute;