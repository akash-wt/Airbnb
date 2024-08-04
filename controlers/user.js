const User = require("../models/User.js");

// signup route 
module.exports.signupRoute = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) { return next(err) }

            req.flash("success", "Welcome to Airbnb !")
            res.redirect("/listings");
        })} catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");


    }
}

// login route 

module.exports.loginRoute=async (req, res) => {
    req.flash("success", "Welcome to Airbnb !");
    let redirectUrl=res.locals.redirectUrl || "listings" 
    res.redirect(redirectUrl);

}


// logout route 
module.exports.logoutRoute= (req, res, next) => {
    if (!req.user) {
        req.flash("error", "User must be Login to Logout!");
        res.redirect("/listings");
    }
    else {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "logged Out!");
            res.redirect("/listings");
        })
    }


}