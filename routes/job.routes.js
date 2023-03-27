const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const Company = require('../models/Company.model');
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


//get to joblist
router.get("/jobs", (req, res, next) => {
    Job.find()
        .populate("company")
        .then(jobsArr => {
            const data = {
                jobs: jobsArr
            }
            res.render("jobs/jobs-list", data)
        })
        .catch( err => { console.log("error getting jobs from DB", err)
        next(err);
        ;})
})

// create display form
router.get("/jobs/create", isLoggedIn, (req, res, next) =>{
   res.render("jobs/job-create")
})

//create company 
router.post("/jobs/create", isLoggedIn, (req, res, next) => {
    const companyDetails = {
      name: req.body.name,
      url: req.body.url,
      companyDescription: req.body.companyDescription,
      established: req.body.established,
      employees: req.body.employees,
    };
  
    Company.create(companyDetails)
      .then((newCompany) => {
        const jobDetails = {
          title: req.body.title,
          location: req.body.location,
          jobDescription: req.body.jobDescription,
          details: req.body.details,
          salary: req.body.salary,
          company: newCompany._id
        };
  
        return Job.create(jobDetails);
      })
      .then(() => {
        res.redirect("/jobs");
      })
      .catch((err) => {
        console.log("error creating new job", err);
        next(err);
      });
  });


// jobs details
router.get("/jobs/:jobId", (req, res, next) => {
    const jobId = req.params.jobId;
    
    Job.findById(jobId)
        .populate("company")
        .then( jobDetails => {
            res.render("jobs/job-details", jobDetails)
        })
        .catch( err => { console.log("error getting job details", err);})
})

// edit display form
router.get("/jobs/:jobId/update", isLoggedIn, (req, res, next) => {
    const jobId = req.params.jobId; 
    
    
    Job.findById(jobId)

        .then( jobDetails => {
            const data = {
                job: jobDetails,
                
            }
            res.render("jobs/job-update", data)
        })
        .catch( err => next(err))
})

// process edit form
router.post("/jobs/:jobId/update", isLoggedIn, (req, res, next) => {
    const jobId = req.params.jobId;

    const jobDetails = {
          title: req.body.title,
          location: req.body.location,
          jobDescription: req.body.jobDescription,
          details: req.body.details,
          salary: req.body.salary,
    }
    Job.findByIdAndUpdate(jobId, jobDetails, {new: true})
        .then( updatedJob => {
            res.redirect("/jobs")
        })
        .catch( err => next(err))
});

// delete job
router.post("/jobs/:jobId/delete", isLoggedIn, (req ,res, next) => {
    const jobId = req.params.jobId;
    
    Job.findByIdAndDelete(jobId)
        .then(() => {
            res.redirect("/jobs")
        })
        .catch( err => next(err))
});
module.exports = router;