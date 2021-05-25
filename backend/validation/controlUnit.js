const joi = require("@hapi/joi");

const controlUnitSchema = joi.object({
  password: joi.string().min(6).max(1024).required(),

  roomName: joi.string().required().min(1).max(100),

});

function CULoginValidation(req, res, next) {
    const dataValidata = {
        password: req.body.password,
        roomName: req.body.roomName,
    };
  const validate = controlUnitSchema.validate(dataValidata);

  if (validate.error) {
    console.log("Error in validation");
    res.status(400).json({
      Error: validate.error,
    });
  } else {
    next();
  }
}

module.exports = { CULoginValidation };
