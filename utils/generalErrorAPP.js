const chalk = require("chalk")

const generalErrorAPP=(response,status,message="")=>{
    console.log(chalk.redBright(message))
    return response.status(status).send(message)
}

module.exports={
    generalErrorAPP
}