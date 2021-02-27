//const { when } = require('@hapi/joi');
const joi = require('@hapi/joi');

const scheduleschema = joi.object({

    roomName: joi.string()
        .required()
        .min(1)
        .max(100),

    subject: joi.string()
        .required()
        .min(1)
        .max(50),

    startTime: joi.date()
        .required(),

    endTime: joi.date()
        .required(),

    username: joi.string()
        .required()
        .min(1)
        .max(1024),
});

function scheduleValidation(req, res, next) { 
    const validate = scheduleschema.validate(req.body);
    
    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

module.exports.scheduleValidation = scheduleValidation;