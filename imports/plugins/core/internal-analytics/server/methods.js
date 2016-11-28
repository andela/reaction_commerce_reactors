/**
 * Created by bolorundurowb on 11/28/16.
 */
import {History} from "/lib/collections";

export const methods = {
  /**
   * retrieves all values from history
   * @summary retrieve histories
   * @return {Array} result of the query
   */
  "internalanalytics/methods/retrieve": function () {
    return History.find({}).fetch();
  }
};
