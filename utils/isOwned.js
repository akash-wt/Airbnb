const Listing=require("../models/Listing");
const isOwned = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to Edit or Delete!");
        return res.redirect(`/listings/${id}/show`);
    }
    next();
};

module.exports=isOwned;