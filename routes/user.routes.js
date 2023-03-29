const express = require('express');
const Job = require('../models/Job.model');
const User = require("../models/User.model");
const Company = require("../models/Company.model");
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const {isEmployer, isCompany, isLoggedIn} = require("../middleware/isLoggedIn");


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



module.exports = router;