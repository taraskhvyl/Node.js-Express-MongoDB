const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
    trim: true,
    maxlength: [40, "A name should be less than 40 symbols"],
    minlength: [5, "A name should be more than 10 symbols"]
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
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords are not the same"
    }
  }
})

userModel.pre('save', async function(next)  {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
})

userModel.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userModel);

module.exports = User;