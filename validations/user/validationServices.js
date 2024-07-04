const config=require("config")
const validatiorLibrary=config.get("VALIDATION")


const  updateUserVlidation  = require("./updateUserVlidation");
const  loginUserValidation  = require("./loginUserValidation");
const  registerUserVlidation = require("./registerUserVlidation");


const validateRestration = (user) => {
  if (validatiorLibrary === "Joi") return registerUserVlidation(user);
};

const validateLogin = (user) => {
  if (validatiorLibrary === "Joi") return loginUserValidation(user);
};

const userUpdaevalidation = (user) => {
  if (validatiorLibrary === "Joi") return updateUserVlidation(user);
};
module.exports = {
  validateRestration,
  validateLogin,
  userUpdaevalidation,
};
