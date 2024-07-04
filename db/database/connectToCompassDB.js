const chalk = require("chalk");
const mongoose = require("mongoose");

const connectTocompassDB="mongodb://mongodb:27017/Business-cards-app"

async function connectToDatabaseCompass() {
  try {
    await mongoose.connect(connectTocompassDB);
    console.log(
      chalk.bgBlueBright(`Connected to MongoDB Local at ${mongoose.connection.host}`)
    );
  } catch (error) {
    console.error(
      chalk.bgRedBright(`Error connecting to MongoDB: ${error.message}`)
    );
  }
}

module.exports = {
    connectToDatabaseCompass,
};