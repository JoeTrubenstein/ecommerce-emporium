var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var paginationController = require("../controllers/paginationController");

/* GET home page. */
router.get("/", paginationController.getCategoriesAndProduct);

router.get("/description/:id", productController.getDescription);

// get only selected category of products
router.get("/products/:id", productController.getProductsbyCategory);

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

// pagination
router.get("/pagination/:page", paginationController.getCategoriesAndProduct);

router.get("/checkout", function(req, res, next){
  res.render("checkout")
})

module.exports = router;
