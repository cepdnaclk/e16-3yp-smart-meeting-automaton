//const { when } = require('@hapi/joi');
const joi = require("@hapi/joi");

const roomschema = joi.object({
  roomName: joi.string().required().min(1).max(100),

  controlUnitId: joi.string().required(),

  password: joi.string().min(6).max(1024).required(),
  
  acId: joi.array().items(String),

  projectorId: joi.array().items(String),
});

function userValidation(req, res, next) {
  const validate = userschema.validate(req.body);

  if (validate.error) {
    console.log("Error in validation");
    res.send(validate.error);
  } else {
    next();
  }
}

function roomValidation(req, res, next) {
  const validate = roomschema.validate({
    roomName: req.body.roomName,
    controlUnitId: req.body.controlUnitId,
    password: req.body.password
  });
  console.log(req.body);
  if (validate.error) {
    console.log("Error in validation", validate.error);
    res.send(validate.error);
  } else {
    next();
  }
}

module.exports.roomValidation = roomValidation;
