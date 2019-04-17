var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");

/* GET home page. */
router.get("/", function(req, res, next) {
  productController
    .getProductsPromise({})
    .then(products => {
      return res.render("index", {
        products
      });
    })
    .catch(error => {
      res.status(error.status).json(error);
    });
});

router.get("/description/:id", productController.getDescription )

module.exports = router;
