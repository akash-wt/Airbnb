
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");
const { required } = require("joi");

const schema = mongoose.Schema;

const reviewsSchema = new schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId, ref: "User"
    }

})

const Review = mongoose.model("Review", reviewsSchema);
module.exports = Review;