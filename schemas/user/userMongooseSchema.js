const  mongoose  = require("mongoose");
const {Name,Image,Address}=require("../genralSchemas/generalSchemas")
const schemaUser = new mongoose.Schema({
    name: Name,
    phone: {
      type: String,
      required: true,
      match: /0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/,
    },
    email: {
      type: String,
      required: true,
      match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: Image,
    address: Address,
    isAdmin: { type: Boolean, default: false },
    isBusiness: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lastFailedLoginAt: {
      type: Date,
      default: null
    },
  });

  const User=  mongoose.model("user",schemaUser)

  module.exports={
    User
  }