var express = require('express');
var router = express.Router();
const passport = require("passport");
const userController = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/authentication');
router.get(
    "/loginwithgoogle",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
    "/googledone",
    passport.authenticate("google", { failureRedirect: "/notFound" }),
    userController.createWithGoogle
);
  
router.get(
    "/loginwithfacebook",
    passport.authenticate("facebook", { scope: ["email"] })
);
  
router.get(
"/facebookdone",
passport.authenticate("facebook", {
    // failureMessage: "Cannot login to facebook",
    failureRedirect: "/notFound",
    // successRedirect: "/success",
}),
userController.createWithFacebook
);

router.post("/", userController.create);

router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
