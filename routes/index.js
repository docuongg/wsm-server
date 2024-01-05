const router = require("express").Router();

const authController = require("../controllers/authController");

const authRoute = require("./auth");
const workingTimeRoute = require("./workingTime")
const requestRoute = require("./request") 

router.use("/auth", authRoute);
router.use("/user/workingTimes", authController.protect, workingTimeRoute);
router.use("/user/requests", authController.protect, requestRoute)

module.exports = router;
