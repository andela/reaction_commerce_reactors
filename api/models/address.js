const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Metafield = require("./metafield").Metafield;


const AddressObject = {
  fullName: {
    type: String
  },
  address1: {
    type: String
  },
  address2: {
    type: String
  },
  city: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: String
  },
  region: {
    type: String
  },
  postal: {
    type: String
  },
  country: {
    type: String
  },
  isCommercial: {
    type: Boolean
  },
  isBillingDefault: {
    type: Boolean
  },
  isShippingDefault: {
    type: Boolean
  },
  metafields: [Metafield]
};

exports.AddressObject = AddressObject;

const AddressSchema = new Schema(AddressObject);

exports.Address = mongoose.model("Address", AddressSchema, "Address");
