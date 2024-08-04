
const isloggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "User must Be Authorized!");
        return res.redirect("/login");

    }
    next();
}
module.exports = isloggedIn;

