module.exports = function () {
  const Products  = require("./../models/product").Products;
  const helper = require("./../services/helpers.js");

  const methods = {
    all: (req, res) => {
      Products.find({}, (err, products) => {
        if (err) {
          helper.handleError(res, err);
        }
        res.json(products);
      });
    },
    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Products.create({
          ancestors: req.body.ancestors,
          userId: req.headers["x-user-id"],
          shopId: req.headers["x-shop-id"],
          title: req.body.title,
          pageTitle: req.body.pageTitle,
          description: req.body.description,
          type: req.body.type,
          vendor: req.body. vendor,
          metafields: req.body.metafields,
          position: req.body.position,
          price: req.body.price,
          isLowQuantity: req.body.isLowQuantity,
          isSoldOut: req.body.isSoldOut,
          isBackorder: req.body.isBackorder,
          requiresShipping: req.body.requiresShipping,
          parcel: req.body.parcel,
          hashtags: req.body.hashtags,
          twitterMsg: req.body.twitterMsg,
          facebookMsg: req.body.facebookMsg,
          pinterestMsg: req.body.pinterestMsg,
          handle: req.body.handle,
          isDeleted: req.body.isDeleted,
          isVisible: req.body.isVisible,
          templateSuffix: req.body.templateSuffix,
          publishedScope: req.body.publishedScope,
          workflow: req.body.workflow
        }, (error, product) => {
          if (error) {
            return helper.handleError(res, error);
          }
          return res.json(product);
        });
      } else {
        helper.sendMessage(res, 400, "Feilds cannot be empty");
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Products.update({_id: req.params.id}, {$set: req.body}, function (err) {
          if (err) {
            helper.handleError(res, err);
          }

          helper.sendMessage(res, 200, "updated successfully");
        });
      } else {
        helper.sendMessage(res, 400, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      Products.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          helper.handleError(res, err);
        } else {
          helper.sendMessage(res, 200, "Product deleted successfully");
        }
      });
    },
    getProduct: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Products.findOne({_id: req.params.id}, function (err, product) {
          if (err) {
            helper.handleError(res, err);
          }
          if (!product) {
            helper.sendMessage(res, 200, "Product does not exist");
          } else {
            res.json(product);
          }
        });
      } else {
        helper.sendMessage(res, 400, "Fields cannot be empty");
      }
    }

  };

  return methods;
};