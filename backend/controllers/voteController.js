const { ethers } = require("ethers");
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
  if (!vote.voterId.equals(userId))
    return next(
      new AppError("You do not have permission to see this vote.", 400),
    );
  res.status(200).json({
    status: "success",
    data: vote,
  });
});

exports.getMyVotes = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const votes = await Vote.find({ voterId: userId });

  res.status(200).json({
    status: "success",
    results: votes.length,
    data: votes,
  });
});

exports.createVote = catchAsync(async (req, res, next) => {
  const election = await Election.findById(req.params.electionId);

  if (!election) {
    return next(new AppError("Election doesn't exist or is not active.", 404));
  }

  const candidate = await Candidate.findById(req.body.candidateId);

  if (!candidate || !candidate.electionId.equals(election.id)) {
    return next(
      new AppError(
        "Candidate doesn't exist or it does not belong to this election",
        404,
      ),
    );
  }

  const hasVoted = await Vote.findOne({
    voterId: req.user.id,
    electionId: election.id,
  });

  if (hasVoted) {
    return next(new AppError("You have already voted for this election", 400));
  }

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = [
    "function castVote(string memory _electionId, string memory _candidateId, string memory _userId) public",
  ];
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    wallet,
  );

  const tx = await contract.castVote(
    election.id.toString(),
    candidate.id.toString(),
    req.user.id.toString(),
  );

  await tx.wait();

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

exports.getElectionResults = catchAsync(async (req, res, next) => {
  const { electionId } = req.params;

  const election = await Election.findById(electionId);
  if (!election) {
    return next(new AppError("Election not found", 404));
  }

  const results = await Vote.aggregate([
    {
      $match: { electionId: election._id },
    },
    {
      $group: {
        _id: "$chosenCandidate",
        voteCount: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: results,
  });
});
exports.auditElection = catchAsync(async (req, res, next) => {
  const { electionId } = req.params;

  const election = await Election.findById(electionId);
  if (!election) {
    return next(new AppError("Election not found", 404));
  }

  const mongoVotesCount = await Vote.countDocuments({ electionId: election._id });

  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const abi = [
    "function getVotesCount(string memory _electionId) public view returns (uint256)",
  ];
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    abi,
    provider
  );

  const blockchainVotesRaw = await contract.getVotesCount(electionId.toString());
  const blockchainVotesCount = Number(blockchainVotesRaw);

  const isConsistent = mongoVotesCount === blockchainVotesCount;

  res.status(200).json({
    status: "success",
    data: {
      electionId,
      mongoVotesCount,
      blockchainVotesCount,
      isConsistent,
      statusMessage: isConsistent 
        ? "Integritate 100%. Datele din MongoDB corespund cu registrul Blockchain." 
        : "Alerta de frauda! Numărul de voturi din baza de date a fost manipulat."
    }
  });
});