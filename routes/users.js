const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userRedirectUrl = require("../utils/redirectUrl.js")
const userController = require("../controlers/user.js")

// signup

router.get("/signup", (req, res) => {
    res.render("users/signup")
})


router.post("/signup", wrapAsync(userController.signupRoute))


// login

router.get("/login", (req, res) => {
    res.render("users/login");
})

router.post("/login", userRedirectUrl, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), userController.loginRoute)

//Logout


router.get("/logout", userController.logoutRoute)

module.exports = router;