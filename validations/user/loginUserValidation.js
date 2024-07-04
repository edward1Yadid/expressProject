const Joi = require("joi");

const loginUserValidation = (user) => {
  const loginUserValidationSchema = Joi.object({
    email: Joi.string()
      .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .rule({ message: "Please enter a valid email" })
      .required(),
    password: Joi.string()
      .ruleset.pattern(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule({
        message:
          "password: 7<=<20 chars, >=1 uppercase, >=1 lowercase, >=1 number, >=1 from !@#$%^&*-",
      })
      .required(),
  });
  return loginUserValidationSchema.validate(user);
};

module.exports = loginUserValidation
