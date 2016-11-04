const Email = require("./email");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ShopSchema = new Schema({
  "status": {
    type: String,
    default: "active"
  },
  "name": {
    type: String
  },
  "description": {
    type: String
  },
  "keywords": {
    type: String
  },
  "addressBook": {
    type: [Object],
    required: false
  },
  "domains": {
    type: [String],
    default: ["localhost"]
  },
  "emails": {
    type: String,
    ref: Email,
    required: false
  },
  "defaultPaymentMethod": {
    type: String,
    default: "none"
  },
  "currency": {
    type: String,
    default: "USD"
  },
  "currencies": {
    type: Object, // Schemas.Currency
    myJsonProperty: Object,
    required: false
  },
  "locales": {
    type: Object,
    myJsonProperty: Object,
    required: false
  },
  "language": {
    type: String,
    default: "en"
  },
  "languages": {
    type: [Object],
    required: false
  },
  "public": {
    type: String,
    required: false
  },
  "timezone": {
    type: String,
    default: "US/Pacific"
  },
  "baseUOM": {
    type: String,
    required: false,
    default: "OZ"
  },
  "unitsOfMeasure": {
    type: [Object],
    required: false
  },
  "unitsOfMeasure.$.uom": {
    type: String,
    default: "OZ"
  },
  "unitsOfMeasure.$.label": {
    type: String,
    default: "Ounces"
  },
  "unitsOfMeasure.$.default": {
    type: Boolean,
    default: false
  },
  "metafields": {
    type: [Object],
    required: false
  },
  "defaultVisitorRole": {
    type: [String],
    default: ["anonymous", "guest", "product", "tag", "index", "cart/checkout", "cart/completed"]
  },
  "defaultRoles": {
    type: [String],
    default: ["guest", "account/profile", "product", "tag", "index", "cart/checkout", "cart/completed"]
  },
  "layout": {
    type: [Object],
    required: false
  },
  "theme": {
    type: Object,
    required: false
  },
  "brandAssets": {
    type: [Object],
    required: false
  },
  "createdAt": {
    type: Date
  },
  "updatedAt": {
    type: Date
  }
});

ShopSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

exports.Shops = mongoose.model("Shops", ShopSchema, "Shops");
