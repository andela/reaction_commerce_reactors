import { SimpleSchema } from "meteor/aldeed:simple-schema";
/**
 * Page Schema
 */
export const Pages = new SimpleSchema({
  pageName: {
    type: String,
    unique: true
  },
  pageTitle: {
    type: String,
    optional: false
  },
  pageContent: {
    type: String,
    optional: false
  },
  isVisible: {
    type: Boolean,
    defaultValue: true
  }
});
