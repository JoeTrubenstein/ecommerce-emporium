const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = {
  addCategory: (req, res, next) => {
    let newCategory = new Category({
      name: req.body.name
    });
    newCategory.save(function(err) {
      if (err) {
        req.flash("errors", "error saving category, does it already exist?");
        return res.redirect("/api/admin/add-category");
      } else {
        req.flash("success", "Category Added!" + " " + newCategory.name);
        return res.redirect("/api/admin/add-category");
      }
    });
  },

  getCategories: (req, res, next) => {
    Category.find({}, function(err, categories) {
      if (err) {
        res.json({
          payload: err
        });
      } else {
        return res.render("categories", {
          categories,
          errors: req.flash("errors"),
          message: req.flash("success")
        });
      }
    });
  }
};
