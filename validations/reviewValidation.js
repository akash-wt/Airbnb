const expressError = require("../utils/expressError.js");
const reviewSchema = require("../joiReviewValidation.js");

const reviewValidation = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
  
    if (error) {
      const msg = error.details.map(el => el.message).join(',');
      throw new expressError(400, msg);
  
    } else {
      next();
    }
  };
  module.exports=reviewValidation;