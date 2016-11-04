const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetafieldSchema = new Schema({
  key: {
    type: String,
    default: false
  },
  namespace: {
    type: String,
    default: false
  },
  scope: {
    type: String,
    default: false
  },
  value: {
    type: String,
    default: false
  },
  valueType: {
    type: String,
    default: false
  },
  description: {
    type: String,
    default: false
  }
});

const WorkflowSchema = new Schema({
  status: {
    type: String,
    default: "new"
  },
  workflow: {
    type: [String],
    required: false
  }
});

export const Workflow = mongoose.model("Workflow", WorkflowSchema);
const Metafields = mongoose.model("Metafields", MetafieldSchema);

const ProductVariantSchema = new Schema({
  ancestors: {
    type: [String],
    default: []
  },
  // since implementing of flattened model this property is used for keeping
  // array index. This is needed for moving variants through list (drag'n'drop)
  index: {
    type: Number,
    required: false
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  barcode: {
    type: String,
    required: false
  },
  compareAtPrice: {
    type: Number,
    required: false
  },
  fulfillmentService: {
    type: String,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  inventoryManagement: {
    type: Boolean,
    required: false,
    default: true
  },
  // this represents an ability to sell item without keeping it on stock. In
  // other words if it is disabled, then you can sell item even if it is not in
  // stock.
  inventoryPolicy: {
    type: Boolean,
    required: false,
    default: true
  },
  lowInventoryWarningThreshold: {
    type: Number,
    required: false
  },
  inventoryQuantity: {
    type: Number,
    required: false
  },
  minOrderQuantity: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: false,
    default: 0
  },
  shopId: {
    type: String // add from header
  },
  sku: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: "variant"
  },
  taxable: {
    type: Boolean,
    default: true,
    required: false
  },
  taxCode: {
    type: String,
    defaultValue: "00000",
    required: false
  },
  // Label for customers
  title: {
    type: String,
    required: false
  },
  // Option internal name
  optionTitle: {
    type: String,
    required: false,
    default: "Untitled Option"
  },
  metafields: [Object],
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  workflow: {
    type: String,
    ref: Workflow,
    required: false
  }
});

exports.ProductVariant = mongoose.model("ProductVariant", ProductVariantSchema);

/**
 * ProductPosition Schema
 */
const ProductPositionSchema = new Schema({
  _id: {
    type: String
  },
  tag: {
    type: String,
    required: false
  },
  position: {
    type: Number,
    required: false
  },
  pinned: {
    type: Boolean,
    required: false
  },
  weight: {
    type: Number,
    required: false,
    default: 0
  },
  updatedAt: {
    type: Date
  }
});

/**
 * Product Schema
 */
const ProductSchema = new Schema({
  ancestors: {
    type: [String],
    default: []
  },
  shopId: {
    type: String
  },
  title: {
    type: String,
    default: "",
    required: false

  },
  pageTitle: {
    type: String,
    required: false

  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: "simple"
  },
  vendor: {
    type: String,
    required: false
  },
  metafields: {
    type: [String],
    required: false
  },
  positions: {
    type: Object, // ProductPosition
    myJsonProperty: Object,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  // Denormalized field: Indicates when at least one of variants
  // `inventoryQuantity` are lower then their `lowInventoryWarningThreshold`.
  // This is some kind of marketing course.
  isLowQuantity: {
    type: Boolean,
    required: false
  },
  // Denormalized field: Indicates when all variants `inventoryQuantity` is zero
  isSoldOut: {
    type: Boolean,
    required: false
  },
  // Denormalized field. It is `true` if product not in stock, but customers
  // anyway could order it.
  isBackorder: {
    type: Boolean,
    required: false
  },
  requiresShipping: {
    type: Boolean,
    default: true,
    required: false
  },
  parcel: {
    type: String,
    required: false
  },
  hashtags: {
    type: [String],
    required: false
  },
  twitterMsg: {
    type: String,
    required: false
  },
  facebookMsg: {
    type: String,
    required: false
  },
  googleplusMsg: {
    type: String,
    required: false,
    max: 255
  },
  pinterestMsg: {
    type: String,
    required: false,
    max: 255
  },
  metaDescription: {
    type: String,
    required: false
  },
  handle: {
    type: String,
    required: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isVisible: {
    type: Boolean,
    default: false
  },
  templateSuffix: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date,
    required: false
  },
  publishedAt: {
    type: Date,
    required: false
  },
  publishedScope: {
    type: String,
    required: false
  },
  workflow: {
    type: Object,
    required: false,
    myJsonProperty: Object
  }
});

ProductSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  if (!this.publishedAt) {
    this.publishedAt = now;
  }
  next();
});

exports.Products = mongoose.model("Products", ProductSchema, "Products");
