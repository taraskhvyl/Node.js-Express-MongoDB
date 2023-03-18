const mongoose = require("mongoose");
const validator = require("validator");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
    trim: true,
    maxlength: [40, "A name should be less than 40 symbols"],
    minlength: [10, "A name should be more than 10 symbols"]
  },
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Provide a valid email"],
    lowercase: true,
    maxlength: [40, "An email should be less than 40 symbols"],
    minlength: [10, "An email should be more than 10 symbols"]
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password is required"],
  }
})

const User = mongoose.model('User', userModel);

module.exports = User;