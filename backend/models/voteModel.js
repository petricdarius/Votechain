const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  electionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Electie",
    required: true,
  },
  chosenCandidate: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
