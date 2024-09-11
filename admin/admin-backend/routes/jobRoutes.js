const express=require('express');

const jobRoute=express.Router();

const jobController=require('../controllers/jobController');

jobRoute.post('/addjob',jobController.addJob);
jobRoute.get('/getjobs',jobController.getJobs);
jobRoute.delete('/deletejob/:id',jobController.deleteJob);

module.exports=jobRoute;