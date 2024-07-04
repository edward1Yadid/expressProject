const config = require("config");
const { updateCardValidation } = require("./updateCardValidation");
const { createCardValidation } = require("./createCardValidation");
const validatiorLibrary = config.get("VALIDATION");

const validationServicesUpdate = (user) => {
  if (validatiorLibrary === "Joi") {
    return updateCardValidation(user);
  } else {
    return null;
  }
};

const validationServicesCreate = (user) => {
    if (validatiorLibrary === "Joi") {
      return createCardValidation(user);
    } else {
      return null;
    }
  };
  

exports.validationServicesUpdate = validationServicesUpdate;
exports.validationServicesCreate = validationServicesCreate;

