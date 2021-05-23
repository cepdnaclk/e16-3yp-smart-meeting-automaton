//const { when } = require('@hapi/joi');
const joi = require("@hapi/joi");

const scheduleschema = joi.object({
  roomName: joi.string().required().min(1).max(100),

  subject: joi.string().required().min(1).max(50),

  startTime: joi.date().required(),

  endTime: joi.date().required(),

  userId: joi.string().required().min(1).max(1024),
});

function scheduleValidation(req, res, next) {
  try {
    const newData = {
      roomName: req.body.roomName,
      subject: req.body.subject,
      startTime: new Date(req.body.date + "T" + req.body.startTime),
      endTime: new Date(req.body.date + "T" + req.body.endTime),
      userId: req.body.userId,
    };
    console.log(newData);
    const validate = scheduleschema.validate(newData);

    if (validate.error) {
      console.log("Error in validation");
      res.send(validate.error);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(validate.error);
  }
}

module.exports = { scheduleValidation };
