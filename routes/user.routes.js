const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const Company = require("../models/Company.model");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const {isEmployer, isCompany, isLoggedIn} = require("../middleware/isLoggedIn");
const Employee = require('../models/Employee.model');


//display Users
router.get("/users", (req, res, next) => {
  User.find()
    .then( usersArr => {
      const data = {
        users: usersArr
      }
      res.render("users/users-list", data)
    })
    .catch(err => { 
      console.log("error getting Users from DB", err);
      next(err);
    });
});


router.get("/contact", (req, res, next) => {
  res.render("contact")
});

router.get("/user/profile", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Employee.findById(usersId)
    .then( usersProfile => {
      res.render("user/profile", {usersProfile})
    })
    .catch( err => {
      console.log("error getting UsersProfile from DB", err);
      next(err);      
    })
})

router.get("/user/profileUpdate", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Employee.findById(usersId)
    .then(usersProfile => {
      res.render("user/update", {usersProfile})
    })
    .catch( err => {
      console.log("error getting UsersProfile from DB", err);
      next(err);      
    })
})

router.post("/user/update", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  const profileDetails = {
    name: req.body.name,
    location: req.body.location,
    telephoneNumber: req.body.telephoneNumber,
    age: req.body.age,
    email: req.body.email,
}
  Employee.findByIdAndUpdate(usersId, profileDetails, {new:true})
    .then( () => {
      res.redirect("/user/profile")
    })
    .catch( err => {
      console.log("error updating UsersProfile from DB", err);
      next(err);      
    })
})

router.post("/user/profile/delete", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Employee.findByIdAndDelete(usersId)
    .then( () => {
      res.redirect("/auth/logout")
    })
    .catch( err => {
      console.log("error updating UsersProfile from DB", err);
      next(err);      
    })
})


router.get("/user/company/profile", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Company.findById(usersId)
    .then( usersProfile => {
      console.log(usersProfile);
      res.render("user/company/profile", {usersProfile})
    })
    .catch( err => {
      console.log("error getting UsersProfile from DB", err);
      next(err);      
    })
})

router.get("/user/company/profileUpdate", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Company.findById(usersId)
    .then(usersProfile => {
      res.render("user/company/update", {usersProfile})
    })
    .catch( err => {
      console.log("error getting UsersProfile from DB", err);
      next(err);      
    })
})

router.post("/user/company/update", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  const profileDetails = {
    name: req.body.name,
    location: req.body.location,
    companyDescription: req.body.companyDescription,
    established: req.body.established,
    employees: req.body.employees,
    url: req.body.url,
    email: req.body.email,
}
  Company.findByIdAndUpdate(usersId, profileDetails, {new:true})
    .then( () => {
      res.redirect("/user/company/profile")
    })
    .catch( err => {
      console.log("error updating UsersProfile from DB", err);
      next(err);      
    })
})

router.post("/user/company/profile/delete", (req, res, next) => {
  const usersId = req.session.currentUser._id;
  Company.findByIdAndDelete(usersId)
    .then( () => {
      Job.find( {companyId: usersId})
        .then( allJobsOfCompany => {
          allJobsOfCompany.forEach( element => {
            const jobsId = element._id;
            Job.findByIdAndDelete(jobsId)
              .then( () => {
                res.redirect("/auth/logout")
            })
        })
      })
      
    })
    .catch( err => {
      console.log("error deleting UsersProfile from DB", err);
      next(err);      
    })
})


module.exports = router;