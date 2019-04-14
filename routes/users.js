var express = require('express');
var router = express.Router();
var signupController = require("../controllers/signupController");

//var loginByEmail = require('../utils/loginByEmail')
var passport = require('passport')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {

  // neeed to get user from session variable
  res.render('signup', { errors: [], user: null});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/// this is not the correct way - ask pak for the .logout function
router.get('/logout', function(req, res, next) {
  res.render('index', { title: 'Express', user: null });
});

router.post(
  "/createuser",
  signupController.checkExistEmail,
  //signupController.checkExistUsername,
  signupController.createUser

);

router.post("/loginbyEmail", passport.authenticate('local-login', {
  successRedirect:'/',
  failureRedirect: '/api/users/signup',
  failureFlash: true
}))
module.exports = router;
