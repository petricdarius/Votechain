const candidateController = require("../controllers/candidateController");

const express = require("express");
const router = express.Router();

router.get("/", candidateController.getAllCandidates);

module.exports = router;
