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

  res.render("signup", { errors: req.flash("loginMessage") });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Express" });
});

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
  res.render('profile', { errors: req.flash('errors'), success: req.flash('success')})
});

router.post("/profile-update", function(req, res, next) {
  signupController
    .updateProfile(req.body, req.user._id)
    .then(user => {
      req.flash("success", "updated");
      return res.redirect("/api/users/edit-profile");
    })
    .catch(error => {
      req.flash("errors", error);
      return res.redirect("/api/users/edit-profile");
    });
});

module.exports = router;
