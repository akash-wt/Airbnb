
const Listing = require("../models/Listing");
const Review = require("../models/Reviews");

const isReviewAuthor = async (req, res, next) => {
    const { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash("error", "Sorry, You don't have permission to Delete this Review!");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
};

module.exports = isReviewAuthor;