const bcryptjs = require("bcryptjs");

const config = require("config");
const bcrypt = config.get("HashPassword");

const generatePassword =async (password) => {
  if (bcrypt === "bcryptjs") {
    const hashPassword = bcryptjs.hashSync(password, 10);
    return hashPassword;
  } else {
    return null;
  }
};

exports.generatePassword = generatePassword;
