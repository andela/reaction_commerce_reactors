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
  metafields: [{
    type: String,
    ref: Metafields,
    required: false
  }],
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
