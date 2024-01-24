const router = require("express").Router();

const authController = require("../controllers/authController");

const authRoute = require("./auth");
const workingTimeRoute = require("./workingTime")
const profileRoute = require("./profile")

router.use("/auth", authRoute);
router.use("/user/workingTimes", authController.protect, workingTimeRoute);
router.use("/profiles",  profileRoute);

module.exports = router;
