const Election = require("../models/electionModel");
const Vote = require("../models/voteModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getElection = handlerFactory.getOne(Election, { path: "candidates" });

exports.getAllElections = handlerFactory.getAll(Election, {
  path: "candidates",
});

exports.getResults = catchAsync(async (req, res, next) => {
  const election = await Election.findById(req.params.id);

  if (!election || election.active === true)
    return next(
      new AppError("The election doesn't exist or is still ongoing.", 404),
    );
  const votesCount = (await Vote.find({ electionId: req.params.id })).length;

  const candidates = await Vote.aggregate([
    {
      $match: {
        electionId: election._id,
      },
    },
    {
      $group: {
        _id: "$chosenCandidate",
        votes: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "candidates",
        localField: "_id",
        foreignField: "_id",
        as: "candidateDetails",
      },
    },
    {
      $unwind: "$candidateDetails",
    },
    {
      $project: {
        _id: 0,
        votes: 1,
        candidate: {
          id: "$candidateDetails._id",
          firstName: "$candidateDetails.firstName",
          lastName: "$candidateDetails.lastName",
          party: "$candidateDetails.party",
        },
      },
    },
  ]);
  const updated = candidates.map((el) => ({
    ...el,
    percentage: `${(el.votes / votesCount) * 100} %`,
  }));

  res.status(200).json(updated);
});

exports.checkVote = catchAsync(async (req, res) => {
  const vote = await Vote.findOne({
    voterId: req.user.id,
    electionId: req.params.electionId,
  });
  if (vote)
    return res.status(200).json({
      status: "suceess",
      canVote: false,
    });
  return res.status(200).json({
    status: "suceess",
    canVote: true,
  });
});

exports.updateElection = handlerFactory.updateOne(Election);
exports.deleteElection = handlerFactory.deleteOne(Election);
exports.createElection = handlerFactory.createOne(Election);
