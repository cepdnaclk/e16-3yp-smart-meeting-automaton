//const { when } = require('@hapi/joi');
const joi = require('@hapi/joi');

const projectorschema = joi.object({

    // controlUnitId: joi.string()
    //     .required(),

    isWorking: joi.boolean(),

    

});

function projectorValidation(req, res, next) { 
    const validate = projectorchema.validate(req.body);
    
    if(validate.error){
        console.log('Error in validation');
        res.send(validate.error);
    }
    else{
        next();
    }
}

module.exports.projectorValidation = projectorValidation;