const express = require("express");
const consultantRoute = express.Router();
const upload = require("../uploadConfig");
const consultantController=require('../controllers/consultantController');

consultantRoute.post('/addconsultant',upload.single('image'),consultantController.addConsultant);

module.exports=consultantRoute;