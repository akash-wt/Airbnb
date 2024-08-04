const Review = require("../models/Reviews.js");
const Listing = require("../models/Listing.js");

//reviews Post form

module.exports.reviewRoute = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await listing.save();
    req.flash("success", " Review Created successfully!");
    res.redirect(`/listings/${id}/show`);
}

// Deleting reviews 

module.exports.deleteReview = async (req, res) => {
    const { reviewId, id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    const inListing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", " Review Deleted successfully!");
    res.redirect(`/listings/${id}/show`);
}