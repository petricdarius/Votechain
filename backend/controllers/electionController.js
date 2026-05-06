const Election = require("../models/electionModel");
const catchAsync = require("../utils/catchAsync");
const handlerFactory = require("./handlerFactory");

exports.getElection = handlerFactory.getOne(Election);

exports.getAllElections = handlerFactory.getAll(Election);
exports.updateElection = handlerFactory.updateOne(Election);
exports.deleteElection = handlerFactory.deleteOne(Election);
exports.createElection = handlerFactory.createOne(Election);
