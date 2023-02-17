import express from 'express'
import userController from '../controllers/userController'
import postController from '../controllers/postController'
import followController from '../controllers/followController'
const router = express.Router()

//middlewares
import { addUser } from '../middlewares/addUser'
import { auth } from '../middlewares/auth'
import { questionController } from '../controllers/questionsController'

//controllers
const { registerOne, loginOne, getUser, deleteOneUser } = userController
const { createOnePost, getOnePost, getPosts } = postController
const { followOne, unfollowOne } = followController
const { newPage, deletePage } = questionController

//user routes
router.post('/register', registerOne)
router.post('/login', loginOne)
router.get('/:userId', getUser)
router.delete('/delete/:userId', auth, addUser, deleteOneUser)
//posts routes

router.post('/post', auth, addUser, createOnePost)
router.get('/posts', getPosts)
router.get('/posts/:postId', getOnePost)
router.delete('posts/:postId', auth, addUser)
//followers route
router.post('/follow/:userId', auth, addUser, followOne)
router.delete('/unfollow/:userId', auth, addUser, unfollowOne)

//page for questions
router.post('/questions/:questionLink', auth, addUser, newPage)
router.delete('/questions/deletePage', auth, addUser, deletePage)

export default router
