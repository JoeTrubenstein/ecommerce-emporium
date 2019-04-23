const Product = require("../models/Product");

var faker = require("faker");

module.exports = {
  addFakeProduct: (req, res, next) => {
    for (let i = 0; i < 5; i++) {
      let newProduct = new Product({
        category: req.params.id,
        name: faker.commerce.productName(),
        price: faker.finance.amount(),
        image: faker.image.image(),
        desc: faker.lorem.paragraphs()
      });

      newProduct.save();
    }
    req.flash("success", "Fake Data Generated");
    res.redirect("/api/admin/categories");
  },

  getProducts: (req, res, next) => {
    Product.find({}, function(err, products) {
      if (err) {
        res.json({
          payload: err
        });
      } else {
        return res.render("index", {
          products
        });
      }
    });
  },

  getDescription: (req, res, next) => {
    Product.findById(req.params.id, function(err, description) {
      if (err) {
        res.json({
          payload: err
        });
      } else {
        return res.render("description", {
          description
        });
      }
    });
  },

  getProductsPromise: params => {
    return new Promise((resolve, reject) => {
      Product.find(params)
        .then(products => {
          resolve(products);
        })
        .catch(error => {
          let errors = {};
          errors.message = error;
          errors.status = 500;
          reject(errors);
        });
    });
  },

  searchProductsPromise: params => {
    return new Promise((resolve, reject) => {
      Product.search(
        {
          query_string: {
            query: params
          }
        },
        function(err, results) {
          if (err) {
            let errors = {};
            errors.message = err;
            errors.status = 500;
            reject(errors);
          } else {
            let data = results.hits.hits.map(function(hit) {
              return hit;
            });
            resolve(data);
          }
        }
      );
    });
  },

  // show only products selected by the dropdown category
  getProductsbyCategory: (req, res, next) => {
    Product.find({ category: req.params.id }, function(err, products) {
      if (err) {
        res.json({
          payload: err
        });
      } else {
        return res.render("catIndex", {
          products
        });
      }
    });
  },

  addToCart: (params, id) => {
    return new Promise((resolve, reject) => {
      Cart.findOne({ _id: id })

        .then(cart => {
          if (params.product) {    
            cart.items += {
              item : params.id,
              quantity: + 1,
              price: params.price
            } 
          }

          cart
            .save()
            .then(cart => {
              resolve(cart);
            })
            .catch(error => {
              let errors = [];
              errors.message = error;
              errors.status = 400;
              reject(errors);
            });
        })
        .catch(error => {
          let errors = [];
          errors.message = error;
          errors.status = 400;
          reject(errors);
        });
    });
  }
};
