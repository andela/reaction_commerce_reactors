import _ from "lodash";
import React from 'react';
import './productResults.html';
import { ProductSearch } from "/lib/collections";
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ListElement from './sortList.jsx';

export default class SortnFilter extends TrackerReact(React.Component) {
  getProducts() {
    return ProductSearch.find().fetch();
  }

  renderVendors() {
    const products = this.getProducts();
    let vendors = products.map((product) => {
      return product.vendor;
    });
    vendors = _.uniq(vendors);
    return vendors.map((vendor) => {
      return (<ListElement key={vendors.indexOf(vendor)} item={vendor} />);
    });
  }

  render() {
    return (
      <div style={{ 'float': 'left', 'height': '350px', 'width': 200, 'margin': '0 20px', 'bottom': 0, 'position': 'fixed', 'zIndex': 2000, 'overflowY': 'scroll' }}>
        <h5> Sort By:</h5>
        <select name="sort">
          <option value="lowToHigh"> Lowest - Highest Price</option>
          <option value="lowToHigh"> Highest - Lowest Price</option>
          <option value="lowToHigh"> Lowest - Highest Ratings</option>
          <option value="lowToHigh"> Highest - Lowest Ratings</option>
        </select>
        <hr/>
        <h4>Filter</h4>
        <hr />
        <h5>Brands</h5>
        <div style={{'overflowY' : 'scroll', 'maxHeight' : '100px'}}>
        {this.renderVendors()}
        </div>
        <hr />
        <div id="score" name="scoreName">
          <h5>Ratings</h5>
          <input value="4" name="bestSeller" type="radio" /> &#9733; &#9733; &#9733; &#9733; &#9733;<br />
          <input value="3" name="bestSeller" type="radio" /> &#9733; &#9733; &#9733; &#9733;<br />
          <input value="2" name="bestSeller" type="radio" /> &#9733; &#9733; &#9733;<br />
          <input value="1" name="bestSeller" type="radio" /> &#9733; &#9733;<br />
          <input value="0" name="bestSeller" type="radio" /> &#9733; <br />
        </div>
        <hr />
        <h5>Price</h5>
        <div id="min" style={{ 'display': 'inline-block' }}>
          min: <input type="text" />
        </div>
        <div id="max" style={{ 'display': 'inline-block' }}>
          max: <input type="text" />
        </div>
        <hr />
      </div>
    );
  }
}
