const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: [true, "A user must have a password name."],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide the password confirm."],
  },
  role: {
    type: String,
    enum: ["admin", "voter"],
    default: "voter",
  },
});
