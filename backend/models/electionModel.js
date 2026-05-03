const electieSchema = new mongoose.Schema({
  titlu: {
    type: String,
    required: [true, "An election must have a title."],
  },
  descriere: {
    type: String,
    required: [true, "An election must have a description."],
  },
  candidati: {
    type: [],
    required: [true, "An election must have candidates."],
  },
  dataStart: {
    type: Date,
    required: [true, "An election must have a start date."],
  },
  dataFinal: {
    type: Date,
    required: [true, "An election must have an end date."],
  },
  activa: {
    type: Boolean,
    default: false,
  },
});
