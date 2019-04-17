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

router.get("/faker/:name/:id", productController.addFakeProduct);

module.exports = router;
