const joiSchema = require("../joiListingValidation.js");
const expressError = require("../utils/expressError.js");

const listingvalidation = (req, res, next) => {
    let { error } = joiSchema.validate(req.body);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(400, msg);

    } else {
        next();
    }
};

module.exports=listingvalidation;