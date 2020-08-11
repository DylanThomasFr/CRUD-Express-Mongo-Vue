const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required: true,
        max: 1024,
        min:6
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Users', userSchema)