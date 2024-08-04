const mongoose = require("mongoose");
const Listing = require("../models/Listing.js");
const Review=require("../models/Reviews.js")
let data = require("./data.js");
const url = "mongodb://127.0.0.1:27017/Airbnb";

main()
  .then(() => {
    console.log("connection succesful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(url);
}


async function dataStore(){
await  Listing.deleteMany({});
await Review.deleteMany({});

data=data.map((obj)=>({...obj,owner:"66a0db9652e1f0caf82ddf48" , category:"Mountains"}));
await Listing.insertMany(data);
console.log("data initialize");
}

dataStore();