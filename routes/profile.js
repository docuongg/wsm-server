const router = require("express").Router();

const ProfileController = require("../controllers/profileController");

router.get('/:id', ProfileController.show);

module.exports = router;
