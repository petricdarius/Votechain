const express = require("express");
const authController = require("../controllers/authController");
const voteController = require("../controllers/voteController");
const electionController = require("../controllers/electionController");

const router = express.Router();

router.get("/election/:electionId/results", electionController.getResults);

router.use(authController.protect);

router.get(
  "/election/:electionId/audit",
  authController.restrictTo("admin"),
  voteController.auditElection,
);

router.get(
  "/allVotes",
  authController.restrictTo("admin"),
  voteController.getVotes,
);

router.get(
  "/myVotes",
  authController.restrictTo("voter"),
  voteController.getMyVotes,
);

router.get("/:id", voteController.getVote);

router.post(
  "/election/:electionId",
  authController.restrictTo("voter"),
  voteController.createVote,
);

module.exports = router;
