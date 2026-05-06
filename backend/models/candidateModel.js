const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "A candidate must have a first name."],
  },
  lastName: {
    type: String,
    required: [true, "A candidate must have a last name."],
  },
  party: {
    type: String,
    required: [true, "A candidate must belong to a party."],
  },
  description: {
    type: String,
  },
  electionId: {
    type: mongoose.Schema.ObjectId,
    ref: "Election",
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
