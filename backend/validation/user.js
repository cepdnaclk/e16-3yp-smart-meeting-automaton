const joi = require('@hapi/joi');

const userLoginschema = joi.object({

    password: joi.string()
        .min(6)
        .max(1024)
        .required(),

    email: joi.string()
        .required()
        .email()
});

function userLoginValidation(req, res, next) {
    const validate = userLoginschema.validate(req.body);

    if(validate.error){
        console.log('Error in validation');
        res.status(400).json({
            'Error': validate.error
        });
    }
    else{
        next();
    }
}

const userschema = joi.object({
    username: joi.string()
        .required()
        .min(1)
        .max(1024),

    password: joi.string()
        .min(6)
        .max(1024)
        .required(),

    verified: joi.boolean,

    email: joi.string()
        .required()
        .email()
});

function userValidation(req, res, next) {
    const validate = userschema.validate(req.body);

    if(validate.error){
        console.log('Error in validation');
        res.status(400).json({
            'Error': validate.error
        });
    }
    else{
        console.log('No validation error');
        next();
    }
}

module.exports = {userValidation, userLoginValidation};