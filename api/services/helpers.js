const Helpers = {
  validateInput: (input) => {
    if (input) {
      return true;
    }
    return false;
  },

  isValidEmail: (email) => {
    return /^.*@.*\..{2,3}$/.test(email);
  },

  validateRequestBody: (body) => {
    for (let key in body) {
      if (body.hasOwnProperty(key)) {
        if (!Helpers.validateInput(body[key])) {
          return false;
        }
      }
    }
    return true;
  },

  handleError: (res, error) => {
    res.status(500).json(error);
  },

  sendMessage: (res, status, message) => {
    res.status(status).json({
      success: false,
      message: message
    });
  }
};

module.exports = Helpers;
