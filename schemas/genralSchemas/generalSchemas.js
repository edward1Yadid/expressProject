const mongoose = require("mongoose");

const Image = new mongoose.Schema({
    url: {
      type: String,
      match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      ),
      trim: true,
      lowercase: true,
    },
    alt: {
      type: String,
      required: true,
      minlength: 2,
      maxLength: 256,
      trim: true,
      lowercase: true,
    },
  },
);
const Address = new mongoose.Schema({
  state: {
    type: String,
    maxLength: 256,
    trim: true,
    lowercase: true,
    default: "not defined",
  },
  country: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  street: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  houseNumber: { type: Number, required: true, trim: true, minLength: 1 },
  zip: { type: Number, trim: true, minLength: 4, default: 0 },
});

///user
const Name = new mongoose.Schema({
  first: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
  middle: {
    type: String,
    maxLength: 256,
    trim: true,
  },
  last: {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
  },
});

module.exports = {
  Image,
  Address,
  Name,
};
