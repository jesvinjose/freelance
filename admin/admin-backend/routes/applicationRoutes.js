const express=require('express');
const upload=require('../uploadResumeConfig');
const applicationController=require('../controllers/applicationController');

const applicationRoute=express.Router();

applicationRoute.post('/addapplication',upload.single('resume'),applicationController.addApplication);
applicationRoute.get('/getapplications',applicationController.getApplications);
applicationRoute.delete('/deleteapplication/:id',applicationController.deleteApplication);
applicationRoute.put('/updateapplication/:id',upload.single('resume'),applicationController.updateApplication);

module.exports=applicationRoute;