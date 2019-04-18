const Product = require("../models/Product");

var faker = require("faker");

var randomName = faker.name.findName();
var randomImg = faker.image.nightlife();
var randomPrice = faker.finance.amount();
var randomDesc = faker.lorem.paragraphs();

module.exports = {
  addFakeProduct: (req, res, next) => {
    let newProduct = new Product({
      category: req.params.id,
      name: randomName,
      price: randomPrice,
      image: randomImg,
      desc: randomDesc
    });

    newProduct.save(function(err) {
      if (err) {
        console.log(err);
        console.log("20");
        req.flash("errors", "something went wrong");
        return res.redirect("/api/admin/categories");
      } else {
        console.log("22");
        req.flash("success", "Fake Data Generated");
        return res.redirect("/api/admin/categories");
      }
    });
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
  }
};
