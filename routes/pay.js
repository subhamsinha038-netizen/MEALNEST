const express = require("express");
const router = express.Router();
const { create, verify } = require("../controllers/payController");

router.post("/create-order", create);
router.post("/verifyacc", verify);

module.exports = router;