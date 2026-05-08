const candidateController = require("../controllers/candidateController");
const authController = require("../controllers/authController");

const express = require("express");
const router = express.Router();

router.get("/", candidateController.getAllCandidates);

router.post(
  "/election/:electionId",
  authController.protect,
  authController.restrictTo("admin"),
  candidateController.createCandidate,
);
router.get("/:id", candidateController.getCandidate);

module.exports = router;
