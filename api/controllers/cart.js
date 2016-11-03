module.exports = function () {
  const Carts  = require("./../models/cart").Cart;
  const helper = require("./../services/helpers.js");
  
  const methods = {
    all: (req, res) => {
      Carts.find({}, (err, carts) => {
        if (err) {
          helper.handleError(res, err);
        }
        res.json(carts);
      });
    },
    add: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Carts.create({
          userId: req.headers["x-user-id"],
          shopId: req.headers["x-shop-id"],
          sessionId: req.body.sessionId,
          email: req.body.email,
          items: req.body.items,
          shipping: req.body.shipping,
          billing: req.body.billing,
          tax: req.body.tax,
          taxes: req.body.taxes,
          workflow: req.body.workflow
        }, (err, cart) => {
          if (err) {
            helper.handleError(res, err);
          }
          res.json(cart);
        });
      } else {
        helper.sendMessage(res, 400, "Feilds cannot be empty");
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Carts.update({userId: req.headers["x-user-id"]}, {$set: req.body}, function (err) {
          if (err) {
            helper.handleError(res, err);
          }

          helper.sendMessage(res, 200, "updated successfully");
        });
      } else {
        helper.sendMessage(res, 200, "Fields cannot be empty");
      }
    },

    delete: (req, res) => {
      Carts.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          helper.handleError(res, err);
        } else {
          helper.sendMessage(res, 200, "Cart deleted successfully");
        }
      });
    },
    getCart: (req, res) => {
      Carts.findOne({_id: req.params.id}, function (err, cart) {
        if (err) {
          helper.handleError(res, err);
        }
        if (!cart) {
          helper.sendMessage(res, 200, "Cart does not exist");
        } else {
          res.json(cart);
        }
      });
    }

  };

  return methods;
};
