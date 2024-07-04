// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const { connectToDataBase } = require("./db/databaseEnvireoment");
const router = require("./router/router");
const { generalErrorAPP } = require("./utils/generalErrorAPP");
const connfig=require("config");
const { handleBadRequest } = require("./utils/handleErrorsRequest");
const chalk = require("chalk");
// Initialize Express app

const app = express();
const logger=require("./LOGGER/logger");

app.use(express.static("./public"));
const  {generateInitialDataCards, generateInitialDataUsers} = require("./initialData/initialData");
const cors = require("./cors");
// Configure middleware
app.use(express.json());
app.use(express.text());
app.use(logger);
app.use(cors);

// Mount router
app.use(router);



const PORT =connfig.get("PORT")
app.listen(PORT, async () => {
  console.log(`listening on : http://localhost:${PORT}`);
await connectToDataBase();
await generateInitialDataCards()
await generateInitialDataUsers()
});





app.use((error, req, res, next) => {
  if(error){
return handleBadRequest("mongo",error)
  
  }
})
