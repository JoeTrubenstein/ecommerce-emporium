const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = {
  getCategoriesAndProduct: (req, res, next) => {
    var perPage = 9;
    var page = req.params.page || 1;
    Category.find({}, function(err, categories) {
      if (err) {
        res.json({
          payload: err
        });
      } else {
        Product.find({})
          .skip(perPage * page - perPage)
          .limit(perPage)
          .populate('category')
          .exec(function(err, products) {
            Product.count().exec(function(err, count) {
              if (err) return next(err);
              res.render("index", {
                categories : categories,
                products: products,
                current: page,
                pages: Math.ceil(count / perPage)
              });
            });
          });
      }
    });
  }
};
