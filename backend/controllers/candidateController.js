const Candidate = require("../models/candidateModel");
const Election = require("../models/electionModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getAllCandidates = handlerFactory.getAll(Candidate);

exports.createCandidate = catchAsync(async (req, res, next) => {
  const electionId = req.params.electionId;
  console.log(electionId);
  const election = await Election.findById(electionId);

  if (!election)
    return next(new AppError("No election found with that id.", 404));

  const { lastName, firstName, party, description } = req.body;

  const candidate = await Candidate.create({
    firstName,
    lastName,
    party,
    description,
    electionId,
  });

  election.candidates.push(candidate._id);
  await election.save();

  res.status(201).json({
    status: "success",
    data: candidate,
  });
});

exports.getCandidate = handlerFactory.getOne(Candidate);
