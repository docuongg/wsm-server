const router = require("express").Router();

const ProfileController = require("../controllers/profileController");

router.get('/:id', ProfileController.show);
router.put('/:id', ProfileController.update);

module.exports = router;
