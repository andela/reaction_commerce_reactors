const helper = require("./helpers");

const emailService = {
  validateEmailRequest: (req, res) => {
    if (!helper.validateRequestBody(req.body)) {
      return helper.sendMessage(res, 400, "Fields cannot be empty");
    }
    if (!(helper.isValidEmail(req.body.to))
     && (helper.isValidEmail(req.body.from))) {
      return helper.sendMessage(res, 400,
        "Enter valid emails for to and from");
    }
    return true;
  }
};

module.exports = emailService;
