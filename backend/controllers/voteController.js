const Vote = require("../models/voteModel");
const Election = require("../models/electionModel");
const Candidate = require("../models/candidateModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");
const AppError = require("../utils/appError");

exports.getVotes = handlerFactory.getAll(Vote, [
  { path: "voterId" },
  { path: "electionId" },
  { path: "chosenCandidate" },
]);

exports.getVote = catchAsync(async (req, res, next) => {
  const vote = await Vote.findById(req.params.id);
  if (!vote) return next(new AppError("Invalid vote id.", 404));

  const user = req.user;

  if (req.user.role === "admin") {
    return res.status(200).json({
      status: "success",
      data: vote,
    });
  }

  const userId = user.id;
  if (!vote.userId.equals(userId))
    return next(
      new AppError("You do not have permission to see this vote.", 400),
    );
  res.status(200).json({
    status: "success",
    data: vote,
  });
});

exports.getMyVotes = catchAsync(async (req, res, next) => {
  const user = req.user.id;

  const votes = await Vote.find({ _id: userId });

  res.status(200).json({
    status: "success",
    data: votes,
  });
});

exports.createVote = catchAsync(async (req, res, next) => {
  const election = await Election.findById(req.params.electionId);
  console.log(election);
  // if (!election || election.active === false)
  if (!election)
    return next(new AppError("Election doesn't exist or is not active.", 404));
  const candidate = await Candidate.findById(req.body.candidateId);
  if (!candidate || !candidate.electionId.equals(election.id))
    return next(
      new AppError(
        "Candidate doesn't exist or it does not belong to this election",
        404,
      ),
    );

  const hasVoted = await Vote.findOne({
    voterId: req.user.id,
    electionId: election.id,
  });

  if (hasVoted)
    return next(new AppError("You have already voted for this election", 400));

  const vote = await Vote.create({
    voterId: req.user.id,
    electionId: req.params.electionId,
    chosenCandidate: req.body.candidateId,
  });

  res.status(201).json({
    status: "success",
    data: vote,
  });
});
