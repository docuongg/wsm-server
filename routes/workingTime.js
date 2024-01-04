const router = require("express").Router();

const workingTimeController = require("../controllers/workingTimeController");

router.get('', workingTimeController.index);
router.post('', workingTimeController.create);

module.exports = router;
