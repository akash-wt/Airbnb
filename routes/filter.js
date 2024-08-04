const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const listingControllers = require("../controlers/filter.js");


router.get("/:filter",wrapAsync(listingControllers.filter))


module.exports = router;
