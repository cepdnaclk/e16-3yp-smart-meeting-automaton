//const { when } = require('@hapi/joi');
const joi = require('@hapi/joi');

const userTimeTableschema = joi.object({

    username: joi.string()
        .required()
        .min(1)
        .max(1024),

    timeTable: joi.object().pattern(
        joi.string(),
        joi.string()
    ),
});

function userTimeTableValidation(req, res, next) { 
    const validate = userTimeTableschema.validate(req.body);
    
    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

module.exports.userTimeTableValidation = userTimeTableValidation;