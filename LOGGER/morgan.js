const chalk = require("chalk");
const morgan = require("morgan");
const fs = require("node:fs");
const MorganDevelopment = morgan((tokens, request, response) => {

  const log=[
    [
      tokens.date(request, response, "clf"),
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens["response-time"](request, response),
      "ms",
    ].join(" ")
  ]

  if (tokens.status(request, response) >= 400) {
      //errors
      const time = tokens.date(request, response, "clf").replace(/\//g, "-").split(":")[0];

      fs.writeFile(`./logs/${time}.log`, `${log}\n`, { flag: "a" }, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        console.log("File written successfully");
      });
    return chalk.redBright(log)


  } else {
    ///success
    return chalk.blueBright(log);
  }
});
exports.MorganDevelopment=MorganDevelopment