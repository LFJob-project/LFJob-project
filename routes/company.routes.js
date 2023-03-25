const express = require('express');
const Company = require('../models/Company.model')
const router = express.Router();


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

module.exports = router;