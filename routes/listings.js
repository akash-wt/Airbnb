const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const isLoggedIn = require("../utils/isLoggedIn.js");
const isOwned = require("../utils/isOwned.js");
const listingvalidation = require("../validations/listingvalidation.js");
const listingControllers = require("../controlers/listings.js");
const multer  = require('multer');
const{storage}=require("../cloudeConfig.js");
const upload = multer({storage});


//index route
router.get("/", wrapAsync(listingControllers.index));


// Add route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listing/add");
});

router.post("/",upload.single("listing[image]"), listingvalidation,wrapAsync(listingControllers.addPostRoute)
);

// show route
router.get("/:id/show", wrapAsync(listingControllers.showRoute)
);

//edit listing

router.get("/:id/edit", isLoggedIn, isOwned, wrapAsync(listingControllers.editRoute)
);

router.put("/:id",upload.single("listing[image]"), listingvalidation, wrapAsync(listingControllers.editPutRoute)
);


// Delete lisintg
router.delete("/:id/delete", isLoggedIn, isOwned, wrapAsync(listingControllers.deleteRoute)
);


// search 
router.get("/search",wrapAsync(listingControllers.listingSearch));

module.exports = router;