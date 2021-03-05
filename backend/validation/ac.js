//const { when } = require('@hapi/joi');
const joi = require('@hapi/joi');

const acschema = joi.object({

    controlUnitId: joi.string()
        .required(),

    isWorking: joi.boolean().required(),

});

function acValidation(req, res, next) { 
    const validate = acschema.validate(req.body);
    
    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

module.exports.acValidation = acValidation;