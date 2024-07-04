const chalk = require("chalk");

const handleBadRequest = async (validator, error) => {
  const { message } = error;
  const errorMessage = `${validator} Error: ${message}`;
  const status = error.status || 400;

  return Promise.reject({ message: errorMessage, status });
};

const handleErrorOfVlidation = async (error) => {
  const validatError = new Error(error.details[0].message);
  return handleBadRequest("Joi",validatError)
};

const handleError = (res, status, message = "") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

module.exports = {
  handleBadRequest,
  handleErrorOfVlidation,
  handleError
};
