const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const Company = require('../models/Company.model');
const router = express.Router();
const transporter = require("../config/transporter.config")
const isLoggedOut = require("../middleware/isLoggedOut");
const {isEmployer, isCompany, isLoggedIn} = require("../middleware/isLoggedIn");


//get to joblist
router.get("/jobs", (req, res, next) => {
    Job.find()
        .populate("companyId")
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
router.get("/jobs/create", isLoggedIn, isCompany,(req, res, next) =>{
    console.log(req.session.currentUser)
   res.render("jobs/job-create")
})

//create company 
router.post("/jobs/create", isLoggedIn, isCompany, (req, res, next) => {
    const jobDetails = {
        title: req.body.title,
        location: req.body.location,
        jobDescription: req.body.jobDescription,
        details: req.body.details,
        salary: req.body.salary,
        companyId: req.session.currentUser._id
      };
      
    Job.create(jobDetails)
      .then(() => {
        res.redirect("/companies/my-listings");
      })
      .catch((err) => {
        console.log("error creating new job", err);
        next(err);
      });
  });


//apply for job
router.get("/jobs/apply", (req, res, next) => {
    res.render("jobs/job-apply");   
})


// application form 
router.post("/jobs/job-apply", (req, res, next) => {
    transporter.sendMail({
        from: `"The best Job Scout in town ", lfjob-project@hotmail.com`,
        to: `${req.body.email}`,
        subject: 'Thank you for your registration',
        text: 'This is a automatic generated email',
        html: `<h1><b>Pineapple goes on Pizza</b></h1>
              <h2>Ending the Debate: Pineapple on Pizza</h2>
              <img src="../images/look.jpeg" alt="a nice pineapple picture"> 
              <h3>How It All Began</h3>
              <p>Pineapple as a pizza topping dates back to 
              the origin of "Hawaiian Pizza" (cheese pizza with 
              ham and pineapple) in 1962. Hawaiian pizza was created by 
              Sam Panopoulous at the Satellite Restaurant in Toronto, Canada. Since its creation,
              <img src="../images/stop-starin-pineapple.jpeg" alt="a nice pineapple picture"> 
              pineapple as a pizza topping has been a highly contested idea.
                In January of 2017 the debate over pineapple on pizza heated up to another
              level on Twitter after the following tweet went viral:This tweet alone sparked
              the first Twitter controversy of 2017 — does pineapple belong on pizza? 
              This was only the start of the debate though, as people continued to talk about it throughout 2017.</p>
              <img src="../images/bob-pinapple.jpeg" alt="a nice pineapple picture">`
      })
      .then( (info) => {
        console.log(info);
        res.render("jobs/job-applymsg");
      })
      .catch( err => {
          console.log("error sending email.", err);
          next(err)
      })
    
})

// jobs details
router.get("/jobs/:jobId", (req, res, next) => {
    const jobId = req.params.jobId;
    
    Job.findById(jobId)
        .populate("companyId")
        .then( jobDetails => {
            res.render("jobs/job-details", jobDetails)
        })
        .catch( err => { console.log("error getting job details", err);})
})

// edit display form
router.get("/jobs/:jobId/update", isCompany, isLoggedIn, (req, res, next) => {
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
router.post("/jobs/:jobId/update", isCompany, isLoggedIn, (req, res, next) => {
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
            res.redirect("/companies/my-listings")
        })
        .catch( err => next(err))
});

// delete job
router.post("/jobs/:jobId/delete", isCompany, isLoggedIn, (req ,res, next) => {
    const jobId = req.params.jobId;
    
    Job.findByIdAndDelete(jobId)
        .then(() => {
            res.redirect("/companies/my-listings")
        })
        .catch( err => next(err))
});
module.exports = router;