const Joi = require("joi");



const registerUserVlidation = (user) => {
  const registerUserVlidationSchema = Joi.object({
    name: Joi.object()
      .keys({
        first: Joi.string().min(2).max(256).required(),
        middle: Joi.string().min(2).max(256).allow(""),
        last: Joi.string().min(2).max(256).required(),
      })
      .required(),
      phone: Joi.string()
      .ruleset.pattern(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
      .rule({
        message: "Please enter a valid phone number",
      })
      .required(),
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
      address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number(),
      })
      .required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
          )
          .rule({ message: "user image mast be a valid url" })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),

    isBusiness: Joi.boolean().required(),
  });
  return registerUserVlidationSchema.validate(user);
};

module.exports = registerUserVlidation
