const Joi = require('@hapi/joi')

// REGISTER VALIDATION
const registerValidation = data => {
    const skeleton = Joi.object({
        username : Joi.string().required(),
        password: Joi.string().required().min(6),
        readonly: Joi.boolean()
    })
    return skeleton.validate(data)
}

// LOGIN VALIDATION 
const loginValidation = data => {
    const skeleton = Joi.object({
        username : Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return skeleton.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
