const Candidate = require("../models/candidateModel");
const handlerFactory = require("./handlerFactory");

exports.getAllCandidates = handlerFactory.getAll(Candidate);
