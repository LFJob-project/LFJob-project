const express = require('express');
const router = express.Router();

const isLoggedOut = require("../middleware/isLoggedOut");
const {isEmployer, isCompany, isLoggedIn} = require("../middleware/isLoggedIn");


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


module.exports = router;
