var User = require("../models/User");

module.exports = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .populate('history.item')
    .exec()
    .then( user => {
        res.render('history', {user: user})
    })
    .catch(error => {
        let errors = {};
        errors.message = error;
        errors.status = 400;
        res.status(errors.status).json(errors)
    });
};