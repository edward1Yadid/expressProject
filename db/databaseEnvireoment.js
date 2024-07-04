const { connectToDatabaseAtlas } = require("./database/connectToAtlasDB");
const { connectToDatabaseCompass } = require("./database/connectToCompassDB");
const confing=require("config")
const ENVIRONMENT=confing.get("NODE_ENV")

const  connectToDataBase = async () => {
  if (ENVIRONMENT === "development") {
    const data= await connectToDatabaseCompass();
    return data 
  
  } if (ENVIRONMENT === "production") {
    const data= await connectToDatabaseAtlas();
    return data 
  } else {
     new Error(`Unsupported environment: ${ENVIRONMENT}`);

  }
};

exports.connectToDataBase=connectToDataBase