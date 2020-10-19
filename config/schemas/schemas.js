const Joi = require('joi');

const schema = Joi.object({
  number: Joi.string()
    .alphanum()
    .required(),

    towerNumber: Joi.string()
    .required(),

    capacity: Joi.number()
    .required(),

    resources: Joi.array()
    .required(),

    online: Joi.boolean()
    .required(),
    
    url: Joi.string()
    .required()
})

module.exports = {
    schema
  }