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
