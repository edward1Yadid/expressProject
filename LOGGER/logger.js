const express = require("express");
const app = express();
const {MorganDevelopment} = require("./morgan");
const config=require("config")


const LOGGER =config.get("LOGGER")

if (LOGGER === "morgan") app.use(MorganDevelopment);

module.exports = app;
