const express = require("express");

const electionController = require("../controllers/electionController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/:id")
  .get(electionController.getElection)
  .patch(authController.restrictTo("admin"), electionController.updateElection)
  .delete(
    authController.restrictTo("admin"),
    electionController.deleteElection,
  );

router
  .route("/")
  .get(electionController.getAllElections)
  .post(authController.restrictTo("admin"), electionController.createElection);

router.get("/:id/results", electionController.getResults);

module.exports = router;
