const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
  checkExistEmail: (req, res, next) => {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        res.status(400).json({
          confirmation: "failure",
          message: err
        });
      }
      if (user) {
        res.status(409).json({
          confirmation: "failure",
          message: "email taken"
        });
      } else {
        next();
        return;
      }
    });
  },

  checkExistUsername: (req, res, next) => {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) {
        res.status(400).json({
          confirmation: "failure",
          message: err
        });
      }
      if (user) {
        res.status(409).json({
          confirmation: "failure",
          message: "username taken"
        });
      } else {
        next();
        return;
      }
    });
  },

  createUser: (req, res, next) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        res.status(400).json({
          confirmation: "failure",
          message: err
        });
      }

      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          res.status(400).json({
            confirmation: "failure",
            message: err
          });
        } else {
          let newUser = new User({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hash
          });

          newUser.save(function(err, user) {
            if (err) {
              res.status(400).json({
                confirmation: "failure",
                message: err
              });
            } else {
              res.render('welcome', {user})
            }
          });
        }
      });
    });
  }
};
