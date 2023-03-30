// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

const transporter = require("./config/transporter.config");
// ℹ️ Connects to the database
require("./db");
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "LFJob-project";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use((req, res, next) => {
    res.locals.userInSession = req.session.currentUser; // userInSession for our views + req.session.currentUser for our middleware
    
    if(req.session.currentUser){
      if(req.session.currentUser.type === "company"){
        res.locals.isCompany = true;
      }
      else{
        res.locals.isCompany = false;
      }
  
      if(req.session.currentUser.type === "employee"){
        res.locals.isEmployee = true;
      }
      else{
        res.locals.isEmployee = false;
      }
    }


    next();
  });


// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");

app.use("/auth", authRoutes);
app.use("/", require("./routes/job.routes.js"));
app.use("/", require("./routes/user.routes"))
app.use("/", require("./routes/company.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
