const crypto = require("crypto");
const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name."],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name."],
  },
  email: {
    type: String,
    required: true,
    required: [true, "A user must have an email name."],
    validate: [validator.isEmail, "Please provide a valid email address."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password name."],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide the password confirm."],
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same.",
    },
  },
  role: {
    type: String,
    enum: ["admin", "voter"],
    default: "voter",
  },
  CNP: {
    type: String,
    required: [true, "All users must enter their CNP."],
    minLength: [13, "CNP must be 13 characters long."],
    maxLength: [13, "CNP must be 13 characters long."],
    unique: true,
    validate: {
      validator: function (val) {
        return isCorrectCNP(val);
      },
      message: "Invalid CNP.",
    },
    passwordChangedAt: Date,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 13);
  this.passwordConfirm = undefined;
});

function isCorrectCNP(CNP) {
  var number = "279146358279";
  let sum = 0;

  for (let i = 0; i < number.length; i++) {
    sum += number[i] * CNP[i];
  }

  const rest = sum % 11;
  let control;
  if (rest > 10) return false;

  if (rest === 10) control = 1;
  else control = rest;

  return control === parseInt(CNP[CNP.length - 1]);
}

userSchema.methods.checkPass = async (newPass, currPass) => {
  return await bcrypt.compare(newPass, currPass);
};

userSchema.pre(/^find/, function () {
  this.find({ active: { $ne: false } });
});

userSchema.methods.changedPassAfter = function (JWT_TIMESTAMP) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWT_TIMESTAMP < changedTimeStamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
