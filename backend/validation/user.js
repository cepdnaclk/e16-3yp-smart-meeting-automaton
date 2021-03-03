const joi = require('@hapi/joi');

const userLoginschema = joi.object({

    password: joi.string()
        .min(6)
        .max(1024)
        .required(),

    userId: joi.string()
        .min(1)
        .max(1024)
        .required(),
    
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

const newUserschema = joi.object({
    userId: joi.string()
        .min(1)
        .max(1024)
        .required(),

    userName: joi.string()
        .required()
        .min(1)
        .max(1024),

    email: joi.string()
        .required()
        .email(),
    
    OPT: joi.string()
        .required(),

});

function newUserValidation(req, res, next) {
    const validate = newUserschema.validate(req.body);

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

const userschema = joi.object({

    userId: joi.string()
        .min(1)
        .max(1024)
        .required(),

    userName: joi.string()
        .required()
        .min(1)
        .max(1024),

    password: joi.string()
        .min(6)
        .max(1024)
        .required(),


    email: joi.string()
        .required()
        .email(),
    
    phone: joi.number()
        .required()
        .min(9)
        .max(10),
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

module.exports = {userValidation, userLoginValidation, newUserValidation};