const Post = require('../models/Post')
const User = require('../models/User')
const { addPostValidation, updatePostValidation } = require('../validation/postValidation')

exports.allPost = async (request, response) => {
    try {
        const posts = await Post.find()
        response.status(200).json(posts)
    } catch (err) {
        response.status(400).json({ message: err })
    }
}

exports.addPost = async (request, response) => {

    // Validation of datas
    const { error } = addPostValidation(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        const post = new Post({
            title: request.body.title,
            content: request.body.content
        })

        try {
            const savedPost = await post.save()
            response.status(201).json(savedPost)
        } catch (err) {
            response.status(400).json({ message: err })
        }
    } else {
        response.status(401).send({ message: 'You can\'t post a new post' })
    }

}

exports.specificPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.postId)
        response.status(200).json(post)
    } catch (err) {
        response.status(400).json({ message: err })
    }
}

exports.deletePost = async (request, response) => {
    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        try {
            const removedPost = await Post.remove({ _id: request.params.postId })
            response.status(200).json({ message: 'Post removed successfully' })
        } catch (err) {
            response.status(400).json({ message: err })
        }
    } else {
        response.status(401).send({ message: 'You can\'t delete a post' })
    }
}

exports.updatePost = async (request, response) => {

    // Validation of datas
    const { error } = updatePostValidation(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    const user = await User.findOne({ _id: request.user._id })
    if (!user.readonly) {
        try {
            const updatedPost = await Post.updateOne({ _id: request.params.postId }, {
                $set: {
                    title: request.body.title,
                    content: request.body.content
                }
            })
            const post = await Post.findById(request.params.postId)
            response.status(200).json({ message: 'Post updated successfully', post })
        } catch (err) {
            response.status(400).json({ message: err })
        }
    } else {
        response.status(401).send({ message: 'You can\'t update a post' })
    }
}