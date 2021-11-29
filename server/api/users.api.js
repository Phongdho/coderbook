var express = require('express');
var router = express.Router();
const passport = require("passport");
const userController = require('../controllers/users.controller')

router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

router.get(
    "/loginwithgoogle",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/",
    passport.authenticate("google", { failureRedirect: "/notFound" }),
    userController.createWithGoogle
);
  
// router.get(
//     "/loginwithfacebook",
//     passport.authenticate("facebook", { scope: ["email"] })
// );
  
// router.get(
// "/",
// passport.authenticate("facebook", {
//     // failureMessage: "Cannot login to facebook",
//     failureRedirect: "/notFound",
//     // successRedirect: "/success",
// }),
// userController.createWithFacebook
// );
module.exports = router;
