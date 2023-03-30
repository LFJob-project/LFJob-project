const express = require('express');
const router = express.Router();
const transporter = require("../config/transporter.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const {isEmployer, isCompany, isLoggedIn} = require("../middleware/isLoggedIn");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
