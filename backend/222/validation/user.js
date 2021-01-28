const joi = require('@hapi/joi');

const userschema = joi.object({
    username: joi.string()
        .required()
        .min(1)
        .max(1024),

    password: joi.string()
        .min(6)
        .max(1024)
        .required(),

    email: joi.string()
        .required()
        .email()
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

module.exports.userValidation = userValidation;