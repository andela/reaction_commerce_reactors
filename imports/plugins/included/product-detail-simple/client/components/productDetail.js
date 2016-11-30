import React, { Component, PropTypes } from "react";
import {
  Button,
  Currency,
  DropDownMenu,
  MenuItem,
  Translation,
  Toolbar,
  ToolbarGroup
} from "/imports/plugins/core/ui/client/components/";
import {
  AddToCartButton,
  ProductMetadata,
  ProductTags,
  ProductField
} from "./";
import { AlertContainer } from "/imports/plugins/core/ui/client/containers";
import { PublishContainer } from "/imports/plugins/core/revisions";
import { Audio} from "/lib/collections";

class ProductDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      digital: this.props.product.isDigital,
      cartQuantity: "number",
      subCategory: "",
      value: "Audio",
      digitalProductFileId: ""
    };

    this.changePro = this.changePro.bind(this);
    this.setSub = this.setSub.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  get tags() {
    return this.props.tags || [];
  }

  get product() {
    return this.props.product || {};
  }

  get editable() {
    return this.props.editable;
  }

  changePro(e) {
    this.setState({"digital": e.target.checked});
    if (!this.state.digital) {
      this.setState({"cartQuantity": "hidden"});
    } else {
      this.setState({"cartQuantity": "number"});
    }
    this.props.onProductFieldChange(this.props.product._id, "isDigital", !this.state.digital);
  }

  setSub(e) {
    this.setState({"subCategory": e.target.value});
  }

  subCat() {
    if (this.state.subCategory === "Audio") {
      return (
        <select id="subCategory" className="form-control text-center">
          <option>Audio Book</option>
          <option>Music</option>
        </select>
      );
    }
    return null;
  }

  getUrl(e) {
    const file = e.target.files[0];
    file.metaData = {
      productId: this.props.product._id,
      ownerId: Meteor.userId(),
      shopId: Reaction.getShopId()
    };
    const fileNew = new FS.File(file);

    Audio.insert(fileNew, (err, result) => {
      this.setState({digitalProductFileId: result._id});
    });
  }

  showDownload() {
    return (
      <button onClick={this.downloadFile} >Download File</button>
    );
  }

  downloadFile(e) {
    e.preventDefault();
    Meteor.call("digital/products/getFile", this.state.digitalProductFileId, function (err, result) {
      console.log(escape(new FS.File(result).url()));
    });
  }

  showDigitalForm() {
    if (this.state.digital) {
      return (
        <div>
          <div className="rui separator divider labeled">
            <hr/>
            <span className="label">
              <span>Digital Product Options</span>
            </span>
            <hr/>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" className="form-control text-center" onChange={this.setSub}>
                <option>Audio</option>
                <option>Books</option>
                <option>Software</option>
                <option>Video</option>
              </select>
              <br/>
              {this.subCat()}
            </div>
            <div className="form-group">
              <label htmlFor="file-upoad">File upload</label>
              <input type="file" className="form-control" id="file-upload" onChange={this.getUrl}/>
            </div>
            {this.showDownload()}
          </form>
        </div>
      );
    }

    return null;
  }

  switchDigital() {
    if (this.props.hasAdminPermission) {
      return (
        <div className="switch-middle">
          <b className="switch-text">Physical Product</b>
          <label className="switch">
            <input id="digital" type="checkbox" defaultChecked={this.props.product.isDigital} onChange={this.changePro}
              />
            <div className="slider round"/>
          </label>
          <b className="switch-text"> Digital Product</b>
        </div>
      );
    }
    return null;
  }

  chooseButton() {
    return (
      <div>
        <AlertContainer placement="productDetail" />
        <AddToCartButton
          cartQuantity={this.props.cartQuantity}
          inputType={this.state.cartQuantity}
          onCartQuantityChange={this.props.onCartQuantityChange}
          onClick={this.props.onAddToCart}
        />
      </div>
    );
  }

  handleVisibilityChange = (event, isProductVisible) => {
    if (this.props.onProductFieldChange) {
      this.props.onProductFieldChange(this.product._id, "isVisible", isProductVisible);
    }
  }

  handlePublishActions = (event, action) => {
    if (action === "archive" && this.props.onDeleteProduct) {
      this.props.onDeleteProduct(this.product._id);
    }
  }

  renderToolbar() {
    if (this.props.hasAdminPermission) {
      return (
        <Toolbar>
          <ToolbarGroup firstChild={true}>
            <Translation defaultValue="Product Management" i18nKey="productDetail.productManagement"/>
          </ToolbarGroup>
          <ToolbarGroup>
            <DropDownMenu
              buttonElement={<Button label="Switch" />}
              onChange={this.props.onViewContextChange}
              value={this.props.viewAs}
            >
              <MenuItem label="Administrator" value="administrator" />
              <MenuItem label="Customer" value="customer" />
            </DropDownMenu>
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <PublishContainer
              documentIds={[this.product._id]}
              documents={[this.product]}
              onVisibilityChange={this.handleVisibilityChange}
              onAction={this.handlePublishActions}
            />
          </ToolbarGroup>
        </Toolbar>
      );
    }

    return null;
  }

  render() {
    return (
      <div className="" style={{position: "relative"}}>
        {this.renderToolbar()}

        <div className="container-main container-fluid pdp-container" itemScope itemType="http://schema.org/Product">
          <AlertContainer placement="productManagement" />

          {this.switchDigital()}

          <header className="pdp header">
            <ProductField
              editable={this.editable}
              fieldName="title"
              fieldTitle="Title"
              element={<h1 />}
              onProductFieldChange={this.props.onProductFieldChange}
              product={this.product}
              textFieldProps={{
                i18nKeyPlaceholder: "productDetailEdit.title",
                placeholder: "Title"
              }}
            />

            <ProductField
              editable={this.editable}
              fieldName="pageTitle"
              fieldTitle="Sub Title"
              element={<h2 />}
              onProductFieldChange={this.props.onProductFieldChange}
              product={this.product}
              textFieldProps={{
                i18nKeyPlaceholder: "productDetailEdit.pageTitle",
                placeholder: "Subtitle"
              }}
            />
          </header>


          <div className="pdp-content">
            <div className="pdp column left pdp-left-column">
              {this.props.mediaGalleryComponent}
              <ProductTags editable={this.props.editable} product={this.product} tags={this.tags} />
              <ProductMetadata editable={this.props.editable} product={this.product} />
            </div>

            <div className="pdp column right pdp-right-column">


              <div className="pricing">
                <div className="left">
                  <span className="price">
                    <span id="price">
                      <Currency amount={this.props.priceRange} />
                    </span>
                  </span>
                </div>
                <div className="right">
                  {this.props.socialComponent}
                </div>
              </div>


              <div className="vendor">
                <ProductField
                  editable={this.editable}
                  fieldName="vendor"
                  fieldTitle="Vendor"
                  onProductFieldChange={this.props.onProductFieldChange}
                  product={this.product}
                  textFieldProps={{
                    i18nKeyPlaceholder: "productDetailEdit.vendor",
                    placeholder: "Vendor"
                  }}
                />
              </div>

              <div className="pdp product-info">
                <ProductField
                  editable={this.editable}
                  fieldName="description"
                  fieldTitle="Description"
                  multiline={true}
                  onProductFieldChange={this.props.onProductFieldChange}
                  product={this.product}
                  textFieldProps={{
                    i18nKeyPlaceholder: "productDetailEdit.description",
                    placeholder: "Description"
                  }}
                />
              </div>

              <div className="options-add-to-cart">
                {this.props.topVariantComponent}
              </div>
              <hr />
              {this.chooseButton()}
              <hr />
              {this.showDigitalForm()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  cartQuantity: PropTypes.number,
  editable: PropTypes.bool,
  hasAdminPermission: PropTypes.bool,
  mediaGalleryComponent: PropTypes.node,
  onAddToCart: PropTypes.func,
  onCartQuantityChange: PropTypes.func,
  onDeleteProduct: PropTypes.func,
  onProductFieldChange: PropTypes.func,
  onViewContextChange: PropTypes.func,
  priceRange: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  product: PropTypes.object,
  socialComponent: PropTypes.node,
  tags: PropTypes.arrayOf(PropTypes.object),
  topVariantComponent: PropTypes.node,
  viewAs: PropTypes.string
};

export default ProductDetail;
