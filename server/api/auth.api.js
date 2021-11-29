var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginWithEmail);
const test = () => {
    console.log("Haha");
}
router.get("/loginhaha", test);
module.exports = router;
