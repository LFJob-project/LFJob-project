const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const Company = require("../models/Company.model");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


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


//display User's jobs
router.get("/users/:userId", (req, res, next) => {
  const userId = req.params.userId;
  let userDetails;

  User.findById()
    .then( userFromDB => {
      userDetails = userFromDB;
      return Job.find();
    })
    .then ( jobsArr => {
      const data = {
        user: userDetails,
        job: jobsArr 
      }
      res.render("user/user-listings", data);
    })
    .catch(err => { 
      console.log("error getting Users from DB", err);
      next(err);
    });
})





module.exports = router;