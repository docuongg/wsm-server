const router = require("express").Router();

const authController = require("../controllers/authController");

const authRoute = require("./auth");
const workingTimeRoute = require("./workingTime")

router.use("/auth", authRoute);
router.use("/user/workingTimes", authController.protect, workingTimeRoute);

module.exports = router;
