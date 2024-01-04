const router = require("express").Router();
const passport = require("../configs/passport");

const authController = require("../controllers/authController");

router.post('/login/google', authController.loginGoogle);
router.get('/logout', authController.logout)

module.exports = router;
