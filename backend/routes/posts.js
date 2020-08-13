const express = require('express')
const router = express.Router()
const verify = require('../verifyToken')
const {allPost, addPost, specificPost, deletePost, updatePost} = require('../controllers/postController')


// GET ALL THE POSTS
router.get('/', verify, allPost)

// SUBMIT A POST
router.post('/', verify, addPost)

//SPECIFIC POST 
router.get('/:postId', verify, specificPost)

//DELETE A POST
router.delete('/:postId', verify, deletePost)

//UPDATE A POST
router.put('/:postId', verify, updatePost)

module.exports = router