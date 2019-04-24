var express = require("express");
var router = express.Router();
var addToCart = require("../utils/addToCart");
var viewCart = require("../utils/viewCart");
var removeFromCart = require("../utils/removeFromCart");
//var stripe = require("stripe")(process.env.SECRET)
var stripe = require("stripe")("sk_test_hHi0eKfOlEoov2ZAqy3xWzmF00MIOcxSvy");
var Cart = require("../models/Cart");
var User = require("../models/User");

var waterfall = require('async-waterfall');

// add item to cart from the product page
router.post("/product/:id", addToCart);

// view items in cart
router.get("/", viewCart);

// delete an item from cart
router.delete("/remove", removeFromCart);

// submit a payment
router.post("/payment", function(req, res, next) {

  let stripeToken = req.body.stripeToken;
  let currentCharges = req.body.stripeMoney * 100;

  stripe.customers
    .create({
      source: stripeToken
    })
    .then(customer => {
      let results = stripe.charges.create({
        amount: currentCharges,
        currency: "usd",
        customer: customer.id
      });

      return results;
    })
    .then(results => {
      waterfall([
        function(callback) {
          Cart.findOne({ owner: req.user._id }, function(err, cart) {
            callback(err, cart);
          });
        },

        function(cart, callback) {
          User.findOne({ _id: req.user._id }, function(err, user) {
            if (user) {
              for (let i = 0; i < cart.items.length; i++) {
                user.history.push({
                  item: cart.items[i].item,
                  paid: cart.items[i].price
                });
              }
            }

            user.save(function(err, user) {
              if (err) return next(err);
              callback(err, user);
            });
          });
        },

        function(user) {
          Cart.update(
            { owner: user._id },
            { $set: { items: [], total: 0 } },
            function(err, updated) {
              if (updated) {
                res.redirect("/")
              }
            }
          );
        }
      ]);
    })
    .catch(error => {
      console.log(error)
      let errors = {};
      errors.message = error;
      errors.status = 400;
      res.status(errors.status).json(errors);
    });
});

module.exports = router;
