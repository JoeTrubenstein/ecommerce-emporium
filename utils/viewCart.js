var Cart = require("../models/Cart");

module.exports = (req, res, next) => {
  Cart.findOne({ owner: req.user.id })
    .populate('items.item')
    .exec()
    .then( myCart => {
        res.render('cart', {myCart: myCart})
    })

    .catch(error => {
        let errors = {};
        errors.message = error;
        errors.status = 400;
        res.status(errors.status).json(errors)
    });
};
