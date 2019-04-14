const User = require("../models/User");
var bcrypt = require("bcrypt");

function loginByPassport(params) {
  return new Promise((resolve, reject) => {
    User.findOne({em})
  })
}

module.exports = loginByPassport;
