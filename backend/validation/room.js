//const { when } = require('@hapi/joi');
const joi = require('@hapi/joi');

const roomschema = joi.object({
    roomId: joi.string()
        .required()
        .min(1),

    controlUnitId: joi.string()
        .required(),

    isReserved: joi.boolean().required(),

    meetingOwnerId: joi.string()

});


function userValidation(req, res, next) {
    const validate = userschema.validate(req.body);

    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

function roomValidation(req, res, next) { 
    const validate = roomschema.validate(req.body);
    
    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

module.exports.roomValidation = roomValidation;