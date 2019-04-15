var express = require("express");
var router = express.Router();
var signupController = require("../controllers/signupController");

//var loginByEmail = require('../utils/loginByEmail')
var passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/signup", function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  // neeed to get user from session variable

  res.render("signup", { errors: req.flash("loginMessage") });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Express" });
});

/// this is not the correct way - ask pak for the .logout function
router.get("/logout", function(req, res, next) {
  req.logout();
  res.redirect("/");
});

router.post(
  "/createuser",
  signupController.checkExistEmail,
  //signupController.checkExistUsername,
  signupController.createUser
);

router.post(
  "/loginbyEmail",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/api/users/signup",
    failureFlash: true
  })
);

router.get("/edit-profile", function(req, res, next) {
  res.render("profile");
});

module.exports = router;
