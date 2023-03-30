const express = require('express');
const Company = require('../models/Company.model')
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const {isCompany, isEmployer, isLoggedIn} = require("../middleware/isLoggedIn");
const Job = require('../models/Job.model');


//Display companies
router.get("/companies", (req, res, next) => {
  Company.find()
    .then( companiesArr => {

      const data = {
        companies: companiesArr
      }
      res.render("companies/companies-list", data);
    })
    .catch(err => {
      console.log("error getting Companies from DB", err);
      next();
    });
});


//route to get each companies jobs only
router.get("/companies/my-listings", isLoggedIn, isCompany, (req, res, next) =>{
   const id = req.session.currentUser._id;
   Job.find({companyId: id})
    .then(jobs => {
      const data = {
        jobs: jobs
      }
      res.render("companies/my-listings", data);
    })
    .catch(err => {
      console.log("error getting companies' listings from DB", err);
      next();
    });
});

router.get("/companies/:jobId", (req, res, next) => {
  const id = req.params.jobId;
  Job.find({companyId: id})
    .populate("companyId")
    .then( jobsArr => {
      const data = {
        jobs: jobsArr,
      }
      res.render("companies/listings", data)
    })
    .catch( err => {
      console.log("error getting companies jobs", err);
      next(err)
    })
})

module.exports = router;