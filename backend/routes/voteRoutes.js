const express = require("express");
const authController = require("../controllers/authController");
const voteController = require("../controllers/voteController");

const router = express.Router();

router.use(authController.protect);

router.get(
  "/allVotes",
  authController.restrictTo("admin"),
  voteController.getVotes,
);

router.get(
  "/myVotes",
  authController.restrictTo("user"),
  voteController.getMyVotes,
);

router.get("/:id", voteController.getVote);
router.post(
  "/election/:electionId",
  authController.restrictTo("user"),
  voteController.createVote,
);

module.exports = router;
