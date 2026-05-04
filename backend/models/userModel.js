const crypto = require("crypto");
const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.methods.checkPass = async (currPass, newPass) => {
  return await bcrypt.compare(newPass, currPass);
};

userSchema.pre(/^find/, function () {
  this.find({ active: { $ne: false } });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
