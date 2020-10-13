const Joi = require('joi');

const schema = Joi.object({
  number: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  towerNumber: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  resources: Joi.array() // TODO
    .required(),

  capacity: Joi.string()
    .min(11)
    .max(11)
    .required(),
  online: Joi.string()
    .min(10)
    .max(10)
    .required(),
  url: Joi.string()
    .min(9)
    .max(9)
    .required(),
  
})
