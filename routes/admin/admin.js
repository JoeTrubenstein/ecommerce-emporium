var express = require("express");
var router = express.Router();

var categoryValidation = require("../admin/utils/categoryValidation");
var categoryController = require("../../controllers/categoryController");
var productController = require("../../controllers/productController");

router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/categories", categoryController.getCategories);

router.get("/add-category", function(req, res) {
  res.render("admin/add-category", {
    message: req.flash("success"),
    errors: req.flash("errors")
  });
});

router.post(
  "/add-category",
  categoryValidation,
  categoryController.addCategory
);

router.post(
  "/add-category",
  categoryValidation,
  categoryController.addCategory
);

// displays only the products for a selected category
router.post("/show-by-category", function(req, res, next) {
  categoryController
    .getProductsByCategory(req.body.categories)
    .then(results => {
      res.json({
        payload: results
      });
    })
    .catch(error => {
      res.status(error.status).json(error);
    });
});

router.get("/faker/:name/:id", productController.addFakeProduct);

module.exports = router;
