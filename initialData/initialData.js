const chalk = require("chalk");
const data = require(".//data.json");
const bcrypt = require("bcryptjs");
const { Card } = require("../schemas/card/cardMongooseSchema");
const { User } = require("../schemas/user/userMongooseSchema");
const { registerUser } = require("../models/user/UserDataManager");
const { createCard } = require("../models/card/CardDataManager");
const generateInitialDataCards = async () => {
  const card = await Card.findOne();
  if (card) return null;
  const { cards } = data;
  for (let card of cards) {
    try {
       await createCard(card);
    } catch (error) {
      return console.log(chalk.red(error.message));
    }
  };
  return console.log(chalk.green("Successfully initiallized cards"))
};
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
const generateInitialDataUsers = async () => {
  const user = await User.findOne();

  if (user) {
    return null;
  } else{
    const { users } = data;
    for (let user of users) {
      try {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
  
        await registerUser(user);
      } catch (error) {
        return console.log(chalk.red(error.message));
      }
  }

    return Promise.resolve("Successfully initiallized users")
  };
};

exports.generateInitialDataCards=generateInitialDataCards
exports.generateInitialDataUsers=generateInitialDataUsers