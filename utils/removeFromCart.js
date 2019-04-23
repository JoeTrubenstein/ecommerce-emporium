var Cart = require("../models/Cart");

module.exports = (req, res, next) => {
  Cart.findOne({ owner: req.user._id })

    .then(cart => {
      cart.items.pull(String(req.body.id));

      cart.total = (cart.total - parseFloat(req.body.price)).toFixed(2);

      cart
        .save()
        .then(updatedCart => {
          req.flash("remove", "successfully removed");
          res.redirect("/api/cart");
        })
        .catch(error => {
          let errors = {};
          errors.message = error;
          errors.status = 400;
          res.status(errors.status).json(errors);
        });
    })
    .catch(error => {
      let errors = {};
      errors.message = error;
      errors.status = 400;
      res.status(errors.status).json(errors);
    });
};
