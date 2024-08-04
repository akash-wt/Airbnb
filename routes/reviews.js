const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const isReviewAuthor = require("../utils/isReviewAuthor.js")
const reviewValidation = require("../validations/reviewValidation.js");
const reviewController = require("../controlers/reviews.js");

const isloggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "User must Be Authorized!");
    return res.redirect("/login");
  }
  next();
}


//reviews 
router.post("/", isloggedIn, reviewValidation, wrapAsync(reviewController.reviewRoute));


// Deleting reviews 

router.delete("/:reviewId", isloggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));


module.exports = router;