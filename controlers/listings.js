const Listing = require("../models/Listing");
const expressError = require("../utils/expressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// index Route

module.exports.index = async (req, res, next) => {
  const allListing = await Listing.find();

  if (!allListing) {
    throw new expressError(404, "Listings not found");
  }
  res.render("listing/index", { allListing });
};

// Add Post Route

module.exports.addPostRoute = async (req, res, next) => {
  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  const cordinates = response.body.features[0].geometry;

  const url = req.file.path;
  const filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  newListing.geometry = cordinates;

  // console.log(req.body);
  const savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success", "New Listing created successfully!");
  res.redirect("/listings");
};

// show Routes
module.exports.showRoute = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Requested Listing doesn't exist!");
    res.redirect("/listings");
  }
  res.render("listing/show", { listing });
};

// edit Route

module.exports.editRoute = async (req, res, next) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Requested Listing doesn't exist!");
    res.redirect("/listings");
  }
  let OriginalImageUrl = listing.image.url;
  OriginalImageUrl = OriginalImageUrl.replace("/upload", "/upload/h_200,w_300");
  res.render("listing/edit", { listing, OriginalImageUrl });
};

// edit Put Route

module.exports.editPutRoute = async (req, res, next) => {
  const { id } = req.params;

  const response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  const cordinates = response.body.features[0].geometry;

  const listing = await Listing.findByIdAndUpdate(
    id,
    req.body.listing,
    (req.body.listing.geometry = cordinates),
    { new: true }
  );

  if (req.file) {
    const url = req.file.path;
    const filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  if (!listing) {
    throw new expressError(404, "Listing not found");
  }
  req.flash("success", " Listing Edited successfully!");

  res.redirect(`/listings/${id}/show`);
};

// Delete Route

module.exports.deleteRoute = async (req, res, next) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  if (!deleteListing) {
    throw new expressError(404, "Listing not found");
  }
  req.flash("success", " Listing Deleted successfully!");
  res.redirect("/listings");
};

// search

module.exports.listingSearch = async (req, res) => {
  let { query } = req.query;
  if (!query) {
    req.flash("error", "Search query cannot be empty!");
    return res.redirect("/listings");
  }

  const ragularEx = new RegExp(query, "i");
  // console.log(regex);

  const listings = await Listing.find({
    $or: [
      { location: { $regex: ragularEx } },
      { country: { $regex: ragularEx } },
      { title: { $regex: ragularEx } },
    ],
  });

  // console.log(listings);
  if (listings.length > 0) {
    res.render("search/search", { listings, query });
  }
  req.flash("error", "No result found!");
  res.redirect("/listings");
};
