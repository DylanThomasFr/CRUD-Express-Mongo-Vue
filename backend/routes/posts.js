const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verify = require('./verifyToken')


// GET ALL THE POSTS
router.get('/', verify, async (request, response) => {
    try {
        const posts = await Post.find()
        response.json(posts)
    } catch (err) {
        response.json({message:err})
    }
})

// SUBMIT A POST
router.post('/', verify, async (request, response) => {
    const post = new Post({
        userId: request.user._id,
        title: request.body.title,
        content: request.body.content
    })

    try {
        const savedPost = await post.save()
        response.json(savedPost)
    } catch (err) {
        response.json({message:err})
    }
    
})

//SPECIFIC POST 
router.get('/:postId', verify, async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId)
        response.json(post)
    } catch (err) {
        response.json({message:err})
    }
})

//DELETE A POST
router.delete('/:postId', verify, async (request, response) => {
    try {
        const removedPost = await Post.remove({_id: request.params.postId})
        response.json(removedPost)
    } catch (err) {
        response.json({message:err})
    }
})

//UPDATE A POST
router.put('/:postId', verify, async (request, response) => {
    try {
        const updatedPost = await Post.updateOne({_id: request.params.postId}, {$set: {
            title: request.body.title,
            content: request.body.content
        }})
        response.json(updatedPost)
    } catch (err) {
        response.json({message:err})
    }
})

module.exports = router