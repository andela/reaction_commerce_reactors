module.exports = function () {
  const Emails  = require("./../models/email");
  const helper = require("./../services/helpers.js");
  const emailService = require("./../services/email_service");

  const methods = {
    all: (req, res) => {
      Emails.find({}, (err, users) => {
        if (err) {
          helper.handleError(res, err);
        }
        res.json(users);
      });
    },
    add: (req, res) => {
      if (emailService.validateEmailRequest(req, res)) {
        Emails.create({
          to: req.body.to,
          from: req.body.from,
          subject: req.body.subject,
          text: req.body.text,
          html: req.body.html,
          jobId: req.body.jobId,
          status: req.body.status
        }, (err, email) => {
          if (err) {
            res.status(500).json(err);
          }
          res.json(email);
        });
      }
    },

    edit: (req, res) => {
      if (helper.validateRequestBody(req.body)) {
        Emails.findOne({_id: req.params.id}, (err, email) => {
          if (email) {
            Emails.update({_id: req.params.id}, {$set: req.body}, function (error) {
              if (error) {
                helper.handleError(res, error);
              }

              helper.sendMessage(res, 200, "updated successfully");
            });
          } else {
            helper.sendMessage(res, 200, "Email not found");
          }
        });
      } else {
        helper.sendMessage(res, 200, "Feilds cannot be empty");
      }
    },

    delete: (req, res) => {
      Emails.findByIdAndRemove(req.params.id)
      .exec((err) => {
        if (err) {
          helper.handleError(res, err);
        } else {
          helper.sendMessage(res, 200, "Email deleted successfully");
        }
      });
    },
    getEmail: (req, res) => {
      Emails.findOne({_id: req.params.id}, function (err, email) {
        if (err) {
          helper.handleError(res, err);
        }
        if (!email) {
          helper.sendMessage(res, 200, "Email does not exist");
        } else {
          res.json(email);
        }
      });
    }

  };

  return methods;
};
