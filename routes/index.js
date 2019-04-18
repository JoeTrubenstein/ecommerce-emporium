var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var categoryController = require("../controllers/categoryController");

/* GET home page. */
router.get("/", categoryController.getCategoriesAndProduct)

router.get("/description/:id", productController.getDescription);

// get only selected category of products
router.get("/products/:id", productController.getProductsbyCategory)

router.post("/search", function(req, res, next) {
  productController
    .searchProductsPromise(req.body.search)
    .then(results => {
      res.json({
        payload: results
      });
    })
    .catch(error => {
      res.status(error.status).json(error);
    });
});

module.exports = router;
