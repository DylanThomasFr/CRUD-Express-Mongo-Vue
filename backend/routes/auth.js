const express = require('express')
const router = express.Router()
const verify = require('../verifyToken')
const {register, login, getRole} = require('../controllers/authController')

// Creating a new user
router.post('/register', register)

// Login 
router.post('/login', login)

// GET USER ROLE
router.get('/readonly', verify, getRole)

module.exports = router