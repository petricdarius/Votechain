const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/getMe", authController.protect, userController.getMe);
router.patch(
  "/updatePass",
  authController.protect,
  authController.updatePassword,
);

router.delete("/deleteMe", userController.deleteMe);

router.use("/:id", authController.protect, authController.restrictTo("admin"));

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);

module.exports = router;
