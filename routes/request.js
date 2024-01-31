const router = require("express").Router();

const requestController = require("../controllers/requestController");

router.post("", requestController.create);

module.exports = router;
