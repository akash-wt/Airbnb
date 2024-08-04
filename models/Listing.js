
const mongoose = require("mongoose");
const Review = require("./Reviews");
const User=require("./User");
const { string, required } = require("joi");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
  category: {
    type: String,
    enum: {
      values: ['Arctic', 'Amazing pools', 'Castle', 'Houseboat', 'Mountains', 'Villa', 'Sailing', 'Rooms', 'Top cities'],
      message: '{VALUE} is not a valid category'
    },
    required: true
  },

  image: {
   url:String,
   filename:String
  },

  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId, ref: "Review"
  }],
  owner:{
     type:Schema.Types.ObjectId,ref:"User"
  },
  // geometry: {
  //   type: {
  //     type: String, 
  //     enum: ['Point'], 
  //     required: true
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true
  //   }
  // }

});

listingSchema.post("findOneAndDelete", async (listing) => {
  const res = await Review.deleteMany({ _id: { $in: listing.reviews } });
  console.log(res);
})



const Listing = mongoose.model("Listings", listingSchema);

module.exports = Listing;
