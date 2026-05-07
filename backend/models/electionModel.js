const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const electionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An election must have a title."],
  },
  description: {
    type: String,
    required: [true, "An election must have a description."],
  },
  candidates: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
  },
  startDate: {
    type: Date,
    required: [true, "An election must have a start date."],
  },
  endDate: {
    type: Date,
    required: [true, "An election must have an end date."],
  },
  active: {
    type: Boolean,
    default: false,
  },
});

// electionSchema.pre("save", function (next) {
//   if (this.active == true && this.candidates.length < 2)
//     return next(
//       new AppError("An active election must have at least 2 candidates.", 400),
//     );
// });

const Election = mongoose.model("Election", electionSchema);

module.exports = Election;
