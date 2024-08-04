const Listing = require("../models/Listing");


module.exports.filter = async (req, res) => {
  let { filter } = req.params;

  const ragularEx = new RegExp(filter, 'i');

  const listings = await Listing.find({
    $or: [
      { category: { $regex: ragularEx } }
    ]
  });
  console.log(listings);
  if(listings.length>0){
    res.render("filters/index", { listings ,filter});
  }else{
    req.flash("error","No filter found...");
    res.redirect("/listings");
  }
 

}



