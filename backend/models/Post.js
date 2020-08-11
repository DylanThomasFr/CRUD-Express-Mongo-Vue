const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
    userId : {
        required: true,
        type: String
    },
    title : {
        required: true,
        type: String
    },
    content : {
        required: true,
        type: String
    },
    created_at : {
        default : Date.now,
        type: Date
    }
})

module.exports = mongoose.model('Posts', PostSchema)