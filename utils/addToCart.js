var Cart = require("../models/Cart");

module.exports = (req, res, next) => {
  Cart.findOne({ owner: req.user.id })
    .then(cart => {
      cart.items.push({
        item: req.body.product_id,
        price: parseFloat(req.body.priceValue),
        quantity: parseInt(req.body.quantity)
      });

      cart.total = (cart.total + parseFloat(req.body.priceValue)).toFixed(2);

      cart
        .save()
        .then(cart => {

            return res.redirect('/')
        })
        .catch()
        .then(error => {
            let errors = {};
            errors.message = error;
            errors.status = 400;
            res.status(errors.status).json(errors)
        });
    })
    .catch(error => {
        let errors = {};
        errors.message = error;
        errors.status = 400;
        res.status(errors.status).json(errors)
    });
};
