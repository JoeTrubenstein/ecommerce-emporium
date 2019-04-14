const User = require("../models/User");
var bcrypt = require("bcrypt");

function loginByEmail(req, res) {
  User.findOne({ email: req.body.email }, function(err, checkedUser) {
    if (err) {
      res.json({
        success: "fail",
        message: err
      });
    } else if (!checkedUser) {
      res.json({
        success: "false",
        message: "username not found "
      });
    } else {
      bcrypt.compare(req.body.password, checkedUser.password, function(
        err,
        result
      ) {
        if (err) {
          res.json({
            confirmation: " failed with error",
            payload: "try again " + checkedUser.username,
            errors: err
          });
        }
        if (result === false) {
          res.json({
            confirmation: " password match failure",
            payload: "try again " + checkedUser.username,
            errors: err
          });
        } else {
          res.json({
            confirmation: " password match success",
            payload: "welcome " + checkedUser.email
          });
        }
      });
    }
  });
}

module.exports = loginByEmail;
