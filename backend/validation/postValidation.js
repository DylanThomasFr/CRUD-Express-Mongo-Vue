const Joi = require('@hapi/joi')

// ADD POST VALIDATION
const addPostValidation = data => {
    const skeleton = Joi.object({
        title : Joi.string().min(1).required(),
        content: Joi.string().min(1).required(),
    })
    return skeleton.validate(data)
}

// UPDATE POST VALIDATION
const updatePostValidation = data => {
    const skeleton = Joi.object({
        title : Joi.string().min(1).required(),
        content: Joi.string().min(1).required(),
    })
    return skeleton.validate(data)
}




module.exports.addPostValidation = addPostValidation
module.exports.updatePostValidation = updatePostValidation