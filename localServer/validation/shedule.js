//const { when } = require('@hapi/joi');
const joi = require("@hapi/joi");

const scheduleschema = joi.object({
  roomName: joi.string().required().min(1).max(100),

  subject: joi.string().required().min(1).max(50),

  startTime: joi.date().required(),

  endTime: joi.date().required(),

  userId: joi.string().required().min(1).max(1024),
});

function scheduleValidation(data) {
  try {
    const newData = {
      roomName: data.roomName,
      subject: data.subject,
      startTime: new Date(data.date + "T" + data.startTime),
      endTime: new Date(data.date + "T" + data.endTime),
      userId: data.userId,
    };
    // console.log(newData);
    const validate = scheduleschema.validate(newData);

    if (validate.error) {
      console.log("Error in validation", validate.error);
      return false;
      // res.send(validate.error);
    } else {
      return true;

    }
  } catch (error) {
    console.log('Error in validater... ',error);
    return false;
  }
}

module.exports = { scheduleValidation };
