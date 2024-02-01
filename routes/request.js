const router = require("express").Router();

const requestController = require("../controllers/requestController");

router.get("", requestController.index);
router.post("", requestController.create);

module.exports = router;
