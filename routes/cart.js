var express = require("express");
var router = express.Router();
var addToCart = require("../utils/addToCart")
var viewCart = require("../utils/viewCart")
var removeFromCart = require("../utils/removeFromCart")


// add item to cart from the product page
router.post('/product/:id', addToCart)

// view items in cart
router.get('/', viewCart)

// delete an item from cart
router.delete('/remove', removeFromCart)

module.exports = router;