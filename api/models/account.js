const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  createdAt: {
    type: Date
  },
  services: {
    type: [Object],
    required: false
  },
  emails: {
    type: [Object],
    required: false
  },
  profile: {
    type: Object,
    required: false
  },
  roles: {
    type: String
  }
});

const Users = mongoose.model("Users", UserSchema, "users");
exports.Users = Users;

const AccountSchema = new Schema({
  userId: {
    type: String,
    ref: Users
  },
  sessions: {
    type: [String],
    required: false
  },
  shopId: {
    type: String
  },
  emails: {
    type: [Object],
    required: false
  },
  acceptsMarketing: {
    type: Boolean,
    default: false,
    required: false
  },
  state: {
    type: String,
    default: "new",
    required: false
  },
  note: {
    type: String,
    required: false
  },
  profile: {
    type: Object,
    required: false
  },
  metafields: {
    type: [Object],
    required: false
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

AccountSchema.pre("save", function (next) {
  now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});


exports.Accounts = mongoose.model("Accounts", AccountSchema, "Accounts");
