const jwt = require('jsonwebtoken')
const { request } = require('express')

module.exports = function (request, response, next) {
    const token = request.headers.authorization.split(' ')[1]
    if(!token) return response.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        request.user = verified
        next()
    }catch(error){
        return response.status(401).send('Access Denied')
    }
}