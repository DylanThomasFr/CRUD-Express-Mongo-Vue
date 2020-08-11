const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/User')
const verify = require('./verifyToken')


// GET ALL THE POSTS
router.get('/', verify, async (request, response) => {
    try {
        const posts = await Post.find()
        response.json(posts)
    } catch (err) {
        response.json({ message: err })
    }
})

// SUBMIT A POST
router.post('/', verify, async (request, response) => {
    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        const post = new Post({
            userId: request.user._id,
            title: request.body.title,
            content: request.body.content
        })

        try {
            const savedPost = await post.save()
            response.json(savedPost)
        } catch (err) {
            response.json({ message: err })
        }
    }else{
        response.status(401).send({message:'You can\'t post a new post'})
    }

})

//SPECIFIC POST 
router.get('/:postId', verify, async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId)
        response.json(post)
    } catch (err) {
        response.status(400).json({ message: err })
    }
})

//DELETE A POST
router.delete('/:postId', verify, async (request, response) => {
    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        try {
            const removedPost = await Post.remove({ _id: request.params.postId })
            response.status(200).json({message: 'Post removed successfully'})
        } catch (err) {
            response.status(400).json({ message: err })
        }
    }else{
        response.status(401).send({message:'You can\'t delete a post'})
    }
})

//UPDATE A POST
router.put('/:postId', verify, async (request, response) => {
    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        try {
            const updatedPost = await Post.updateOne({ _id: request.params.postId }, {
                $set: {
                    title: request.body.title,
                    content: request.body.content
                }
            })
            response.status(200).json({message: 'Post removed successfully'})
        } catch (err) {
            response.status(400).json({ message: err })
        }
    }else{
        response.status(401).send({message:'You can\'t update a post'})
    }
})

module.exports = router