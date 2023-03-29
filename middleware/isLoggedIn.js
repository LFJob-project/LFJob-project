
function isCompany (req, res, next) {
  if(req.session.currentUser.type === "company"){
    next()
  }else{
    return res.redirect("/auth/login")
  }
}

function isEmployer (req, res, next) {
  if(req.session.currentUser.type === "employee"){

    next()
  }else{
    return res.redirect("/auth/login")
  }
}

function isLoggedIn (req, res, next) {
  // checks if the user is logged in when trying to access a specific page
  if (!req.session.currentUser) {
    return res.redirect("auth/login");
  } 
  next();
};


module.exports = { 
  isCompany,
  isEmployer,
  isLoggedIn
};
