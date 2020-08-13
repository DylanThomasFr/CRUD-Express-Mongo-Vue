const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {registerValidation, loginValidation} = require('../validation/userValidation')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.register = async (request, response) => {

    // Validation of datas
    const {error} = registerValidation(request.body)
    if(error) return response.status(422).send(error.details[0].message)

    // Check if user is in database
    const usernameExist = await User.findOne({username: request.body.username})
    if(usernameExist) return response.status(409).send({message:'User already exists !'})

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, salt)

    const user = new User({
        username: request.body.username,
        password: hashedPassword,
        readonly: request.body.readonly ? request.body.readonly : false
    })

    try{
        const savedUsed = await user.save()
        response.send({user: user._id})
    } catch (err) {
        response.status(400).send({message:err})
    }
}

exports.login = async (request, response) => {
    // Validation of datas
    const {error} = loginValidation(request.body)
    if(error) return response.status(422).send(error.details[0].message)

    // Check if user is in database
    const user = await User.findOne({username: request.body.username})
    if(!user) return response.status(422).send({message:'Username doesn\'t exist'})

    // Check password
    const validPass = await bcrypt.compare(request.body.password, user.password)
    if(!validPass) return response.status(422).send({message : 'Wrong password'})

    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
    response.header('auth-token', token).status(201).send(token)
}

exports.getRole = async (request, response) => {
    try {
        const user = await User.findOne({_id: request.user._id})
        response.status(200).send({readonly:user.readonly})
    } catch (err) {
        response.status(400).json({ message: err })
    }
}