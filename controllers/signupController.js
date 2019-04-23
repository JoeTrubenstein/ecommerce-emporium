const User = require("../models/User");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const getGravatar = require("../utils/gravatar");

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
            profile: {
              name: req.body.name,
              picture: getGravatar(req.body.email)
            },
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
              req.logIn(user, function(err) {
                if (err) {
                  console.log(err);
                  res.status(400).json({
                    confirmation: "error creating user",
                    message: err
                  });
                } else {
                  let cart = new Cart({
                    owner: user._id
                  });
                  cart.save();
                  res.redirect("/");
                }
              });
            }
          });
        }
      });
    });
  },
  updateProfile: (params, id) => {
    return new Promise((resolve, reject) => {
      User.findOne({ _id: id })

        .then(user => {
          if (params.name) {
            user.profile.name = params.name;
          }

          if (params.address) {
            user.address = params.address;
          }

          if (params.password) {
            user.profile.password = params.password;
          }

          if (params.email) {
            user.email = params.email;
          }

          user
            .save()
            .then(user => {
              resolve(user);
            })
            .catch(error => {
              let errors = [];
              errors.message = error;
              errors.status = 400;
              reject(errors);
            });
        })
        .catch(error => {
          let errors = [];
          errors.message = error;
          errors.status = 400;
          reject(errors);
        });
    });
  }
};
