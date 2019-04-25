let mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");

let elasticSearchENV = process.env.BONSAI_URL || 'localhost:9200'

var ProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    es_type: 'text'
  },
  name: { type: String, es_type: 'text', default: "" },
  price: { type: Number, es_type: 'long', default: 0 },
  image: { type: String, es_type: 'text', default: "" },
  desc: { type: String, es_type: 'text', default: "" }
});

ProductSchema.plugin(mongoosastic, {
  hosts: [
      elasticSearchENV
    ]
});

module.exports = mongoose.model("product", ProductSchema);
