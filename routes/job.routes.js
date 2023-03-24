const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const router = express.Router();

// create display form
router.get("/jobs/create", (req, res, next) =>{
   res.render("jobs/create")
})
//process form
router.post("/jobs/create", (req, res, next) => {
    const jobDetails = {
        title: req.body.title,
        companyName: req.body.companyName,
        location: req.body.location,
        description: req.body.description,
        details: req.body.details,
        salary: req.body.salary,
        rating: req.body.rating,
        lastActiveAt: req.body.lastActiveAt,
        user: req.body.user,
    }
    Job.create(jobDetails)
        .then(()=> {
            res.redirect("/jobs")
        })
        .catch(err => {console.log("error creating new job", err)})
})

//get to joblist
router.get("/jobs", (req, res, next) => {
    Job.find()
        .then(jobsArr => {
            const data = {
                jobs: jobsArr
            }
            res.render("jobs/jobs-list", data)
        })
        .catch( err => { console.log("error getting jobs from DB", err);})
})

// jobs details
router.get("/jobs/:jobId", (req, res, next) => {
    const jobId = req.params.jobId;

    Job.findById(jobId)
        .then( jobDetails => {
            res.render("jobs/jobs-details", jobDetails)
        })
        .catch( err => { console.log("error getting job details", err);})
})

// edit display form
router.get("/jobs/:jobId/update", (req, res, next) => {
    const jobId = req.params.jobId; 
    
    let jobDetails;
    Job.findById(jobId)
        .then( jobFromDB => {
            jobDetails = jobFromDB;
            return User.find()
        })
        .then( usersArr => {
            const data = {
                job: jobDetails,
                users: usersArr
            }
            res.render("jobs/job-update", data)
        })
        .catch( err => next(err))
})

// process edit form
router.post("/jobs/:jobId/update", (req, res, next) => {
    const jobId = req.params.jobId;

    const jobDetails = {
        title: req.body.title,
        companyName: req.body.companyName,
        location: req.body.location,
        description: req.body.description,
        details: req.body.details,
        salary: req.body.salary,
        rating: req.body.rating,
        lastActiveAt: req.body.lastActiveAt,
        user: req.body.user,
    }
    Job.findByIdAndUpdate(jobId, jobDetails, {new: true})
        .then( updatedJob => {
            res.redirect(`/jobs/${updatedJob.id}`)
        })
        .catch( err => next(err))
});

// delete job
router.post("/jobs/:jobId/delete", (req ,res, next) => {
    const jobId = req.params.jobId;
    
    Job.findByIdAndDelete(jobId)
        .then(() => {
            res.redirect("/jobs")
        })
        .catch( err => next(err))
});
module.exports = router;