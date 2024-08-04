const Joi = require("joi");

const joiSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description:Joi.string().required(),
    image:Joi.string().allow(""),
    price:Joi.number().min(1),
    location:Joi.string().required(),
    country:Joi.string().required(),
    category: Joi.string()
    .valid('Arctic', 'Amazing pools', 'Castle', 'Houseboat', 'Mountains', 'Villa', 'Sailing', 'Rooms', 'Top cities')
    .required(),
  }).required(),
});


module.exports=joiSchema;

